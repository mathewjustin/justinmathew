---
date: '2026-01-20T23:02:39+05:30'
draft: false
title: 'Postgres Internals: Columnar and Row Store, choosing the right storage not DB'
description: 'Some thoughts on PG Internals [https://www.percona.com/blog/postgresql-internals-for-newbies-a-guide-to-data-storage-part-one/] a good read for everyone.'
---

# Introduction

Got a chance to read this post from percona last night, it's very basic thing if you worked on postgres for long [https://www.percona.com/blog/postgresql-internals-for-newbies-a-guide-to-data-storage-part-one/] it sparked some curiosity. The idea of how Postgres stores data in row store and some other dbs stores in columnar store is really interesting. This makes me think that we should always think in the perspective of choosing the right data storage rather than choosing the right database for a particular use case.

If you read the above blog the primary understanding we get it not just where postgres stores its data but also how it does and how it impacts the performance of your queries. 

# Row Store

The majic is essentially the fancy name called row store. It simply means your data is stored in a file which represents a row in a table. So if you have the following table 

```csv  
id | name  | age | city
1  | Alice | 30  | NY
2  | Bob   | 25  | LA
3  | Carol | 28  | SF
```
In a row store the data is stored in a file as 

```csv
row            |    pg_relation_file_path

1,Alice,30,NY  |    /base/12345/67890

2,Bob,25,LA    |    /base/12345/67891

3,Carol,28,SF  |    /base/12345/67892
``` 

Encryption mechanisms which will encrypt data at rest essentially encrypts the entire row. If you try pg_tde(Perconas extension for TDE) it encrypts the entire row. That's essentially what is meant by encryption at rest.


## Good side of Row Store

1. When postgres reads a row it reads the entire row in one go. So if your query is such that it needs all the columns of a row its very efficient to read the entire row in one go. Imagine a query like 

```sql
SELECT * FROM users WHERE id = 1;
``` 
In this case postgres will read the entire row for id 1 in one go. So simple. Just one seek and one read.
How it seeks and reaches this right place , you can read my blog on Postgres Indexes [https://justinmathew.com/posts/btree-whats-inside-your-db/]. Here I mentioned how posstgres uses btree indexes to reach the right page and read the data. But the idea is once it reaches the right page it reads the entire row in one go.

2. Row store is very efficient for OLTP (Online Transaction Processing) workloads where you have a lot of insert, update, delete operations. Because in row store all the columns of a row are stored together, so when you need to update a row, you can do it in one go. Imagine updating the age of a user. In row store you can read the entire row, update the age and write it back in one go. 

```sql
UPDATE users SET age = 31 WHERE id = 1;
```

## Ugly side of Row Store

1. When you have a query that needs only a few columns of a row, row store is not very efficient. Imagine a query like 

```sql
SELECT name, city FROM users WHERE id = 1;
```
In this case postgres will read the entire row for id 1, even though it only needs the name and city columns. This is a waste of I/O and CPU resources.

1. Another crazy issue? Well I want to calculate the average age of all users. In row store postgres will read the entire row for all users, even though it only needs the age column. This is again a waste of I/O and CPU resources.

```sql
SELECT AVG(age) FROM users;
```

If you have a lot of such queries, row store is not very efficient. Probably you should consider columnar store for such use cases. Or you can use some extensions like cstore_fdw which provides columnar storage for postgres. PG is not truely a columnar store but with extensions it can behave like one.

# Columnar Store

As mentioned earlier, postgres is not a truly columnar database. But there are couple of truely columnar databases in the market. The below representation is to understand how a columnar store stores data in a file.

```csv
column         |    pg_relation_file_path
id            |    /base/12345/67890
name          |    /base/12345/67891
age           |    /base/12345/67892
city          |    /base/12345/67893
```
Yes it stores age of all employees in a table in a single file. Similarly for name, city etc.

Just by looking at this we can understand **"May be, Just May be its easy to build a column level encryption mechanism much easier here than row store"**. Because each column is stored in a separate file. So encrypting a column means encrypting a file. Encrypting data at rest in columnar store can be more efficient and flexible.

## Good side of Columnar Store

Exact oppoisite of row store, all ugly sides of row store are good sides of columnar store.

But here's the key distinction: **Columnar storage is specifically designed for OLAP (Online Analytical Processing) workloads** - think summarization, aggregation, and analytics. While row store excels at OLTP (interactions - inserts, updates, deletes), columnar store shines when you need to analyze data.

1. Same example from the ugly side of row store. When you have a query that needs only a few columns of a row, columnar store is very efficient. Imagine a query like 

```sql
SELECT name, city FROM users WHERE id = 1;
```
In this case postgres will read heronly the name and city columns for id 1, so its very efficient in terms of I/O and CPU resources.

2. What happens to the crazy issue of calculating average age of all users? This is a classic **analytical query (OLAP workload)** where columnar storage truly shines. In columnar store postgres will read only the age column for all users, so its very efficient in terms of I/O and CPU resources.

```sql
SELECT AVG(age) FROM users;
```
Why is it efficient? Because all the age values are stored together in one file, so reading them is very efficient. 

The above query will simply read the age column file and calculate the average. No need to read the entire row for all users. This is exactly what columnar storage was designed for - **analytical summarization** rather than transactional interactions.

## Ugly side of Columnar Store

1. Now this is interesting all good sides of row store are ugly sides of columnar store. We don't really need to write them again do we? Go to the good side of row store and read them again, they are the exact opposite here. :) 
