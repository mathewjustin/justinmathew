---
date: '2026-04-04T09:00:00+05:30'
draft: false
title: 'CAS Deep Dive — What Actually Happens at the CPU Level'
description: 'I just learned about Compare-And-Swap and it completely changed how I read JVM internals.'
---

## The Problem

So I was reading about concurrent programming and stumbled into this thing called CAS — Compare-And-Swap. And once you understand it, you start seeing it *everywhere* in the Java ecosystem. Let me walk through it the way it clicked for me.

The classic race condition looks like this:

```
Thread A reads x = 5
Thread B reads x = 5
Thread A writes x = 6
Thread B writes x = 6   ← A's update is lost
```

Both threads read the same value, both compute a new value, both write back. One update silently disappears. This is the read-modify-write problem and it's the root of a huge class of concurrency bugs.

---

## What CAS Actually Does

CAS stands for Compare-And-Swap. The idea is simple: "only update this value if it's still what I expect it to be."

```
Thread A: CAS(x, expected=5, new=6) → CPU locks the cache line → succeeds → x=6
Thread B: CAS(x, expected=5, new=6) → expected=5 but x=6 now   → FAILS
Thread B retries:      CAS(x, expected=6, new=7) → succeeds
```

The CPU instruction (`LOCK CMPXCHG` on x86) is *indivisible* — no other core can touch that memory location while it executes. That's the entire guarantee. One atomic check-and-write, no locks needed.

---

## The Retry Loop Pattern (Optimistic Locking)

CAS failures are not errors — they're expected. The standard pattern is spin-retry:

```java
AtomicLong counter = new AtomicLong(0);

void increment() {
    while (true) {
        long current = counter.get();       // read
        long next = current + 1;            // compute
        if (counter.compareAndSet(current, next)) {
            return;                         // won the race → done
        }
        // lost the race → retry with fresh value
    }
}
```

This is called **optimistic locking** — assume no contention, retry if wrong. Under low contention this is dramatically faster than `synchronized`. Under very high contention it can spin, which is why you pick the right tool for the right situation.

---

## The ABA Problem — The Trap

CAS has one subtle bug that I found really interesting:

```
Thread A reads x = "A"
Thread B changes x: "A" → "B" → "A"   (back to A)
Thread A does CAS(expected="A", new="C") → SUCCEEDS
                                            ↑ but the value changed twice!
                                            Thread A has no idea
```

The value *looks* the same but it's not the same state. The fix is to stamp the value with a version number:

```java
// Stamp the value with a version number
AtomicStampedReference<String> ref = new AtomicStampedReference<>("A", 0);

// CAS now checks BOTH value AND stamp
ref.compareAndSet("A", "C", stamp=0, newStamp=1);
// Thread B's double-flip would have incremented stamp to 2
// So Thread A's CAS fails — correct behaviour
```

Most real-world code ignores ABA because they use primitives (`long`, `int`) where it doesn't matter. It only bites you with object references.

---

## Where CAS Lives in Java

### java.util.concurrent — built on top of it

The whole package is essentially thin wrappers over `Unsafe.compareAndSwapX()`:

```java
AtomicInteger i = new AtomicInteger(0);
i.incrementAndGet();       // CAS loop internally
i.getAndAdd(5);            // CAS loop
i.updateAndGet(x -> x*2); // CAS loop
```

### ConcurrentLinkedQueue — lock-free queue

The Michael-Scott queue algorithm, pure CAS. Enqueue claims a slot with CAS on the tail pointer. Dequeue advances head with CAS. No locks anywhere.

### LongAdder — smarter than AtomicLong under contention

```java
// AtomicLong under heavy contention → threads spinning on same memory location
// LongAdder → each thread updates its OWN cell, sum() adds them all up

LongAdder adder = new LongAdder();
adder.increment();  // updates thread-local cell, no contention
adder.sum();        // merges all cells
```

Prometheus's Java metrics client uses this internally. That's how it handles millions of metric increments without falling over.

---

## Open Source Projects Built on CAS

### Netty

The entire I/O pipeline is lock-free via CAS. Channel state transitions use `AtomicIntegerFieldUpdater` — a clever trick that does CAS on a *plain int field* without boxing it into `AtomicInteger`, saving allocation overhead on the hot path:

```java
private static final AtomicIntegerFieldUpdater<AbstractChannel> REGISTERED_UPDATER =
    AtomicIntegerFieldUpdater.newUpdater(AbstractChannel.class, "registered");
// State: OPEN → REGISTERED → ACTIVE → INACTIVE → CLOSED
```

### Disruptor (LMAX)

The most extreme CAS usage in the Java ecosystem. Powers financial trading systems doing 25 million messages/second:

- Ring buffer with fixed size (power of 2)
- Producer: CAS on sequence number to claim a slot
- Consumer: spin-wait on sequence — no locks, no queues

The numbers are wild: ~25M ops/sec vs ~5M for `ArrayBlockingQueue`. Latency ~52ns vs ~500ns for synchronized queues. Log4j2's async loggers run on this.

### RxJava / Project Reactor

Operator fusion and subscription state managed entirely via CAS. There's a pattern called the "wip counter" that I found fascinating:

```java
static final AtomicIntegerFieldUpdater<FluxFlatMap> WIP =
    AtomicIntegerFieldUpdater.newUpdater(FluxFlatMap.class, "wip");

void drain() {
    if (WIP.getAndIncrement(this) == 0) {
        // I'm the only one draining — proceed
    }
    // otherwise someone else is already draining — exit
}
```

Only one thread drains the operator at a time, enforced entirely by CAS. No lock, no `synchronized`.

### HikariCP

The fastest JDBC pool uses CAS for connection bag management. Connection state transitions (`NOT_IN_USE → IN_USE → REMOVED`) happen via CAS on the hot path. No synchronized blocks. That's a big part of why it benchmarks faster than every other pool.

### Caffeine

Uses a ring buffer per thread with CAS to track read/write operations for its eviction policy. Cache hits never contend with each other.

---

## Pattern Summary

| Pattern | What CAS Does | Example |
|---|---|---|
| Optimistic counter | Increment without lock | `AtomicLong.incrementAndGet()` |
| State machine | Transition state atomically | Netty channel states |
| Claim a slot | One winner among many threads | Disruptor sequence |
| Drain guard | Only one thread drains at a time | Reactor wip counter |
| Lock-free queue | Enqueue/dequeue without mutex | `ConcurrentLinkedQueue` |

---

## The Mental Model

**CAS is optimistic locking** — assume the world hasn't changed, act, verify. If wrong, retry or skip.

**`synchronized` is pessimistic locking** — assume contention, lock first, act, release.

CAS wins when contention is low to medium, operations are short (no I/O inside the retry loop), and you can afford to retry or drop.

`synchronized` wins when contention is very high (CAS would spin endlessly) or the protected section is complex — multiple steps that must all succeed together.

Once you internalize this, reading through Netty, Reactor, or HikariCP source code starts making a lot more sense. You see the `AtomicIntegerFieldUpdater` and immediately know: lock-free state machine. You see `getAndIncrement() == 0` and immediately know: drain guard. It's a small vocabulary that unlocks a lot of JVM internals.