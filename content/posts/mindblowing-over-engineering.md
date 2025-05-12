+++
date = '2025-04-27T20:39:00.000-08:00'
draft = false
title = 'Enterprise Over Engineering'
+++

# The Hidden Pitfalls of Overusing Design Patterns

This is my story of using the **Chain of Responsibility** pattern after reading about it in a book while preparing for an interview.  
Yes — I actually used it in a real job. And well, it didn’t turn out the way I had imagined.

Before we dive in, here's a quote from one of my favorite authors, Khaled Hosseini (*The Kite Runner*):

> **"There is only one sin, only one. And that is theft. Every other sin is a variation of theft."**

Just like sins are not separate but variations of one mistake,  
I now believe that **the root cause of most mistakes and vulnerabilities in an enterprise codebase is essentially the overuse of design patterns**.

As I mentioned, this is my story of using Chain of Responsibility — and getting totally screwed because of it.

---

It was during a phase when I was actively preparing for interviews —  
(of course, like every other engineer, preparing to find a new job).  
Right then, a requirement came up:

1. **You have an Excel sheet that gets uploaded to blob storage every day.**
2. **Each row contains some order details.**
3. **Each row’s information needs to be stored into multiple tables inside our beloved PostgreSQL database.**
4. **One row could result in inserts across N tables.**
5. **(Maybe in the future, they could send more fields, and we might have to map to extra tables.)**

*(Pro tip: "Maybe later" will almost **never** come back as a clear requirement in engineering.)* 😄

---

The code looked like the below. So clean I am a f*** great engineer now.

```
public interface RowHandler {
    void handle(OrderRow row, RowHandler next);
}

```

// Handler 1 - Validate format

```
public class ValidateFormatHandler implements RowHandler {
    @Override
    public void handle(OrderRow row, RowHandler next) {
        if (!row.isFormatValid()) {
            throw new RuntimeException("Invalid format in row: " + row.getRowNumber());
        }
        if (next != null) {
            next.handle(row, null);
        }
    }
}

```

// Handler 2 - Validate critical fields

```
public class ValidateCriticalFieldsHandler implements RowHandler {
    @Override
    public void handle(OrderRow row, RowHandler next) {
        if (row.getOrderAmount() == null) {
            throw new RuntimeException("Missing crucial field: Order Amount in row: " + row.getRowNumber());
        }
        if (next != null) {
            next.handle(row, null);
        }
    }
}
```

// Handler 3 - Save to database

```
public class SaveToDatabaseHandler implements RowHandler {
    @Override
    public void handle(OrderRow row, RowHandler next) {
        databaseService.save(row);
        // Final handler, no next
    }
}
```


**How chain was called:**

```
RowHandler handlerChain = new ValidateFormatHandler();
handlerChain.handle(row, 
    new ValidateCriticalFieldsHandler()
        .handle(row,
            new SaveToDatabaseHandler()
        )
);

```
---

It's now neat. It follows all the prnciples i studied. DRY? Yes dry as hell. SOLID? Of yes super SOLID. 

It's nice and cool, running without any problems what so ever. But now we our code is about to face a very common issue in software engineering, that is "new requiremets".

**First requirement**, if a non critical field is missing just throw an error and skip processing the entire row and update the status as failed with a reaon, on the status table

Initially it was a simple requirement validate and save the data. Now i am giong to handle some non critical errors. So the impact on the code?

* Each handler now needs a try catch.
* Somehow skip the processing of faulty rows
* Chain was originally designed to throw exceptions — now I had to catch and recover inside the chain.

Results. 

* I added messy try-catch inside handlers.
* Chain became confusing: Should I throw or should I pass silently?
  
  **Small cracks started appearing.**

```public class ValidateNonCriticalFieldsHandler implements RowHandler {
    @Override
    public void handle(OrderRow row, RowHandler next) {
        try {
            if (row.getCustomerName() == null) {
                throw new NonCriticalFieldMissingException("Customer Name is missing in row: " + row.getRowNumber());
            }
            if (row.getDeliveryInstructions() == null) {
                throw new NonCriticalFieldMissingException("Delivery Instructions is missing in row: " + row.getRowNumber());
            }
            // Validation passed
            if (next != null) {
                next.handle(row, null);
            }
        } catch (NonCriticalFieldMissingException e) {
            System.out.println("Skipping row " + row.getRowNumber() + ": " + e.getMessage());
            // update failure reason, clever and smart move 
        }
    }
}
```
---


## 🧹 What Changed in the Code: Phase 1

| Aspect | Before Phase 1 | After Phase 1 |
|:-------|:---------------|:--------------|
| **Error Handling** | Exception would stop processing immediately | Exceptions caught, skip faulty row, continue |
| **Handler Responsibilities** | Pure validation and passing to next handler | Validation + error handling + deciding whether to continue |
| **Code Clarity** | Very clean and focused | Slightly messy, handlers doing multiple things |
| **Risk** | Low (simple logic) | Higher — missing catch could cause wrong behavior |
| **Debugging** | Easy to understand flow | Hard to trace which row failed where |


**After Phase 1**, my neat Chain of Responsibility started leaking.

Each handler was no longer just responsible for validation — it also had to handle skipping, catching exceptions, and deciding whether the next handler should even be called.

What started as a clean “pass responsibility forward” model became a fragile, try-catch-infested mess.

# ☠️ Phase 2: The Beginning of the End

Just when I thought my patched-up Chain of Responsibility could survive a few more release cycles,
the universe (read: product owner) had other plans.

The next requirement dropped like a nuke:

## 📜 New Requirement: Stop Everything on Critical Error

- **"If a critical field like 'Order Amount' is missing, stop processing the entire file immediately."**
- **"Update the file status as FAILED with the error message."**
- **"No skipping. No partial saving. Just die. Immediately."**

---

### What This Meant for the Code

- Now each handler needed the **power to kill** the entire processing flow.
- No more just skipping rows like earlier.
- Somehow, one row’s validation failure should **abort everything** — like pulling the emergency brake on a moving train. 🚂💥

---

### 😵 My Reaction

At this point, my reaction was:  
> *"I am not going to throw away my precious Chain of Responsibility. No way."*

So I did what every engineer does when trying to cling onto a broken architecture:

### 🛠 I invented a new Exception class.

```java
public class CrucialFailureException extends RuntimeException {
    public CrucialFailureException(String message) {
        super(message);
    }
}

```


This was my emergency eject button

So the handler will look like :

```
public class ValidateCriticalFieldsHandler implements RowHandler {
    @Override
    public void handle(OrderRow row, RowHandler next) {
        if (row.getOrderAmount() == null) {
            throw new CrucialFailureException("Critical field 'Order Amount' missing in row: " + row.getRowNumber());
        }
        if (next != null) {
            next.handle(row, null);
        }
    }
}
```


Now the main loop will be:

RowHandler handlerChain = new ValidateNonCriticalFieldsHandler();

```
try {
    for (OrderRow row : uploadedRows) {
        handlerChain.handle(row, new ValidateCriticalFieldsHandler());
    }
    updateFileStatusAsSuccess(fileId);
} catch (CrucialFailureException e) {
    updateFileStatusAsFailed(fileId, e.getMessage());
    System.out.println("Critical error occurred. Aborting file processing: " + e.getMessage());
}
```

...

## 🧹 What Changed in the Code: Phase 2

| Aspect | Before Phase 2 | After Phase 2 |
|:-------|:---------------|:--------------|
| **Error Handling** | One exception type for all validation issues | Two exception types: normal vs crucial failure |
| **Control Flow** | Handlers passed forward normally | Handlers could throw CrucialFailureException to abort everything |
| **Code Clarity** | Getting slightly messy | Now two paths: "normal continue" and "critical death" |
| **Debugging** | Traceable with some effort | Needed to track who threw which exception at what point |
| **Mental State** | Managing somehow | "Okay, it's working... but I'm scared to touch it now." 😅 |


# 💀 Phase 3: The Final Requirement That Broke Everything

## 📜 Partial Success Requirement

- **We cannot afford to lose all the good rows just because one bad row exists.**
- **If some rows have critical errors:**
  - Process whatever rows are valid.
  - Store bad rows into an error table.
  - Allow reprocessing of those rows after corrections.
- **The file overall should still be marked partially successful.**
- **Also track how many rows were successful vs failed for reporting.**

---

# My Final Realization

After the "**Partial Success with Reprocessing**" requirement hit me like a truck,  
I finally sat back and truly understood:

> **I should have just followed simple classes and a simple for-loop.**

That’s it.  
No fancy patterns.  
No hero architecture.  
Just plain, boring, beautiful code.

---

## 🎯 What I Would Do Today

- I would use plain Java classes — a simple `ValidatorService`, a `DatabaseSaverService`, and a `StatusUpdater`.
- I would use a straightforward `for-loop`:
  - Validate each row.
  - Capture errors.
  - Save valid rows.
  - Record partial success/failure cleanly.
- I would keep each responsibility **small and dumb**.
- No complicated object chains.
- No custom exception magic.
- No god-like context objects.

Just small functions working together quietly like a simple assembly line. 🏭

---

# Real Wisdom I Learned

- **Elegant design is not what looks good in interviews.**  
  It’s what survives requirement changes without becoming a monster.
- **Simple code is not "junior code."**  
  It’s senior code pretending to be junior so that it can survive.
- **If your design needs a special exception just to keep working, it’s already dying.**

---

# 🧹 Final Thought

> **"When the problem is a simple Excel sheet, you don’t need the Avengers.  
> You just need a broomstick and a dustpan."** 🧹