---
title: 'Event Sourcing - Moving out of traditions | Simplified version'
date: 2024-02-06T17:59:00.000-08:00
draft: false
url: /2024/02/event-sourcing-moving-out-of-traditions.html
---

 Introduction
-------------

A colleague recommended Martin Kleppmann's "Designing Data-Intensive Applications" to me. Initially, I found the beginning somewhat tedious and opted for a non-linear approach, selecting topics of interest at random rather than reading from start to finish as one might with a novel. This strategy seemed fitting given the book's comprehensive coverage of software system design, akin to an engineering bible. Today, I've chosen to delve into the concept of Event Sourcing. Let's explore this topic together.

  

**Why Event Sourcing?**

*   **Relevance**: It's a critical concept in building scalable, resilient distributed systems and is widely applicable in modern software architectures, including microservices.
*   **Foundational Knowledge**: Understanding event sourcing will deepen your knowledge of how large-scale systems manage state and handle data changes over time.
*   **Practical Application**: It's highly relevant to real-world systems, particularly in scenarios requiring audit trails, historical data analysis, or complex business transactions.

  

Lets see an Order table schema below which is written on the traditional approach.

  

**Traditional Approach schema**

  
  {{< gist mathewjustin 14c282682fb6eea56e415955b8151570 >}}


  

Here :

*   order\_id is a unique identifier for each order.
*   customer\_id links to a customers table (not shown) that contains customer details.
*   order\_date is the date and time the order was placed.
*   total\_amount is the total cost of the order.
*   status could be values like 'Placed', 'Paid', 'Shipped', 'Delivered', etc.

  

Simple right..?

  

Obviously you have seen this kind of schema in your career. 100% , All of us seen this.

  

**Event Sourcing Approach Schema**

{{< gist mathewjustin 548a35e644b568fa75a5689d7619a0af >}}



And a simplified orders table to store order IDs

  
{{< gist mathewjustin 05649484096754bd465aad10cfc2a93a >}}

  

You are starting to get what is event sourcing is now. But still doubtfull right, well everyone is will be doubtful until you see some real data. So lets insert some dummy data into the traditional table and to the event sourcing table. 

  
{{< gist mathewjustin 0bf407076c9382bea669363ff052e160 >}}

  

This will create four orders with different statuses in the orders table.

  

Now the event sourcing data.

{{< gist mathewjustin 0a859d645316fd15a64e2cccbb8a4911 >}}
  
  

In this example 

*   Order 1 goes through the full lifecycle from being placed to delivery.
*   Order 2 is placed and paid for but hasn't been shipped yet.
*   Order 3 is placed, paid for, and shipped, but not yet delivered.
*   Order 4 is only placed.

  

Event sourcing is much more descriptive when it comes to the historical events that have happened to an order. Imagine a bug occurred during the order placing flow; we can always replay this particular event and debug the system, instead of permanently losing that flow and saying "not reproducible," then waiting for the next order placement to occur. You know, the infamous "not reproducible" bug.

  

  

The ideal places to apply this?

  

Considering the earlier discussion about the "not reproducible" bug, let's contemplate its implications in more critical scenarios. Would a bank ever be content with labeling a transactional glitch as "not reproducible" and leaving it at that? 

  

Or imagine placing an order on Amazon, only to encounter an error during packaging that erroneously signals a payment problem. Would such explanations be satisfactory?

  

  

Event sourcing is well-suited for systems that undergo a series of discrete events, each affecting the system's state.

  

This is just an introducton : 

  

Please watch/read the following videos to understand more

  

https://www.youtube.com/watch?v=MA\_3fPBFBtg. About linkedins uses of kafka

  

Event sourcing from martin kleppmann designing data-intensive applications

  

  

So that's 10 Minutes in the morning!