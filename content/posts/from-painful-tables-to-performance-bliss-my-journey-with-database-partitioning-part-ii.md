---
title: 'From Painful Tables to Performance Bliss: My Journey with Database Partitioning - Part II'
date: 2024-02-15T20:39:00.000-08:00
draft: false
url: /2024/02/from-painful-tables-to-performance_15.html
---

Skewed workloads and Relieving Hot Spots
----------------------------------------

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoJClAUTSTj0roZIBCR4_qM3sXJihaJLvPpviq5z25FrwP_N-Tv_SipKyDUAISzWKIb2gRY52GxbIx6uQ71HQaTjjW9UEhJuNiYc1X3fBfcCWRvjE7zTz-3l6YXKBxLFNDtTCb4GXpk2BxGLPc9IJAm_dRsWJpE4JWF2UiTR1WJF9TQFwW7wng8IikazsH/s320/DALL%C2%B7E%202024-02-16%2010.03.06%20-%20Create%20an%20abstract,%20visually%20engaging%20image%20that%20symbolizes%20the%20concept%20of%20database%20partitioning.%20Use%20geometric%20shapes,%20lines,%20and%20vibrant%20colors%20to%20d.webp)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoJClAUTSTj0roZIBCR4_qM3sXJihaJLvPpviq5z25FrwP_N-Tv_SipKyDUAISzWKIb2gRY52GxbIx6uQ71HQaTjjW9UEhJuNiYc1X3fBfcCWRvjE7zTz-3l6YXKBxLFNDtTCb4GXpk2BxGLPc9IJAm_dRsWJpE4JWF2UiTR1WJF9TQFwW7wng8IikazsH/s1024/DALL%C2%B7E%202024-02-16%2010.03.06%20-%20Create%20an%20abstract,%20visually%20engaging%20image%20that%20symbolizes%20the%20concept%20of%20database%20partitioning.%20Use%20geometric%20shapes,%20lines,%20and%20vibrant%20colors%20to%20d.webp)

  
  

Imagine you have a library with books categorized by their first letter (A-Z). This is like partitioning data based on a key (like the first letter of a book title).

Problem: One letter (say, "X") becomes super popular (a celebrity author!). Everyone wants to read "X" books, causing a "hot spot" (overcrowding) in the "X" section.

Hashing doesn't fix it: Even if you assign different "buckets" based on a hash of the title, all "X" books still end up in the "X" bucket.

Solution 1: Split the key: Add a random number to each "X" book title (e.g., "X123", "X456"). This spreads them across different buckets, reducing the crowd in "X".

Drawback: Now you need to check all buckets with "X" to find all the books (more work for reading).

Solution 2 (future): Imagine the library magically adjusts shelves based on popularity, automatically spreading out the "X" books.

Takeaway: Choose the solution that best fits your needs. Splitting keys helps with hot spots but adds complexity. Future systems might handle this automatically.

  

Partitioning and Secondary Indexes
----------------------------------

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjjw8WSRYh8WvgjzL47_0bctmItP9-2DcM9Ja3bmsqzZ0m9xprpk2tzJrO5usX4rmEE7vh8ns_4VriuStb7RN8xcdKKO0oP6GAass6KJGi2CAtXkB950lDnv6daiKxLe6rwZv5NJsf5CUNL_mvBCyysIrujmypukosGMBhWA8ctuLahtVGCksIE9SRxb66/s320/DALL%C2%B7E%202024-02-16%2010.08.31%20-%20Visualize%20the%20concept%20of%20partitioning%20and%20secondary%20indexes%20in%20a%20database,%20using%20an%20abstract%20and%20engaging%20illustration.%20Imagine%20a%20vast%20library%20or%20arch.webp)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjjw8WSRYh8WvgjzL47_0bctmItP9-2DcM9Ja3bmsqzZ0m9xprpk2tzJrO5usX4rmEE7vh8ns_4VriuStb7RN8xcdKKO0oP6GAass6KJGi2CAtXkB950lDnv6daiKxLe6rwZv5NJsf5CUNL_mvBCyysIrujmypukosGMBhWA8ctuLahtVGCksIE9SRxb66/s1024/DALL%C2%B7E%202024-02-16%2010.08.31%20-%20Visualize%20the%20concept%20of%20partitioning%20and%20secondary%20indexes%20in%20a%20database,%20using%20an%20abstract%20and%20engaging%20illustration.%20Imagine%20a%20vast%20library%20or%20arch.webp)

  

  

A secondary index usually doesn't identify a record uniquely but rather is a way of searching for occurences of a particular value; find all action by user 123, find all articles containing the word hogwash, find all cars whose color is red. In these statements you can see we use a secondary index for our query. 

This is essential for any database design. The issue with secondary indexes are they don't map neatly to partitions. This happens due to non uniqueness, for example find all action by user means find all actions| filter by user, so the find all will go search on all partition. This is a simple example for this problem.

There are two main approaches to partitioning a database with secondary indexes : document-based partitioning and term based partitioning. 

  

Partitioning Secondary Indexes by Document.
-------------------------------------------

  

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEir189cg0LVjCup5GUOczMX3tnzIqvV5loRrYn8rHBVJwEuQKmoKoJJvcg2h5TuplZLg3wMeSiPoXF32NFBeGovvN4gpSETYKnWDjmLjIB-mBi53ChCejO5uvdGH5G4Ehr_6_sySim0BGhgg8Ox99X_gAaqAV9IcJuH6n9oZjcPJKrCXM1U45gumA2pA2pc/s320/PartitioningSecIndexByDoc.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEir189cg0LVjCup5GUOczMX3tnzIqvV5loRrYn8rHBVJwEuQKmoKoJJvcg2h5TuplZLg3wMeSiPoXF32NFBeGovvN4gpSETYKnWDjmLjIB-mBi53ChCejO5uvdGH5G4Ehr_6_sySim0BGhgg8Ox99X_gAaqAV9IcJuH6n9oZjcPJKrCXM1U45gumA2pA2pc/s326/PartitioningSecIndexByDoc.png)

  

If you look at this image you can see within each partition there is another secondary index created.  So if you want to search for red cars, you need to send the query to all partitions, and combine all the results you get back.  In this approach you can notice each partition creates its own secondary index and when you are writing to it you only need to deal with the partition that contains the document ID that you are writing. For this exact reason a **Document-Partitioned index** is also known as _local index._

Querying this kind of partitioned database is known as _scatter/gather,_ and it can make read queries on secondary indexe quite expensive. Even if you query the partition in parallel _scatter/gather _ is prone to tail latency amplifications. Nevertheless it is a widely used approach. 

  

On the next blog we will learn more about partitioining from Martin Klepmann's "Designing Data intensive Applications