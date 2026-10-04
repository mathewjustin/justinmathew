---
title: "One row, two views: PostgreSQL MVCC"
date: 2026-10-05T00:00:00+05:30
description: "Row versions make it possible to keep reading a consistent snapshot while someone else writes."
hiddenInHomeList: true
---

Your shopping app stores your address as **House 10**. While checkout reads it, another transaction changes it to **House 20** and commits.

PostgreSQL uses **Multi-Version Concurrency Control (MVCC)**: the update creates a new row version, while the old version can remain available to readers that need it. A **snapshot** determines which version a query sees; it is not a copy of the whole database.

{{< mvcc-diagram >}}

**Repeatable Read keeps the same snapshot** from the transaction’s first non-control statement. Checkout’s second ordinary query still sees House 10. A new transaction sees House 20. Your own writes remain visible within your transaction.

**Read Committed**, PostgreSQL’s default, takes a fresh snapshot for each statement. After the profile change commits, checkout’s next query sees House 20.

MVCC is the mechanism; the isolation level determines how long the snapshot lasts. This is about database transactions, not how long a screen stays open. Old row versions can be reclaimed by VACUUM once they are no longer needed.

[Read PostgreSQL’s transaction isolation documentation](https://www.postgresql.org/docs/current/transaction-iso.html).
