---
title: 'Algorithms and Data Structures on Python - Notes 2'
date: 2020-09-30T10:57:00.000-07:00
draft: true
url: 
tags: 
- Data Structures
- LinkedList
- Data Structures in Python
---

** Linked list**

  

It needs a node class

It should have 2 basic characteristic

\* Data

\* Reference to the next node

It can be used to implement stack or queues. It does not allow random access as like in Array.

Obtaining a last node, locating a particular node requires an iteration over all or most of the items in the linked list. 

**_Advantage_**

\* It is dynamic data structures(No need to specify size)

\* It can allocate memory on run time

\* It take _O(1)_ constant time complexity to insert an item at the beggining or removing at the beggining, unlike array where as its _O(n)_

\* Linked list can grow organically, unlike in array where we need o(n) for re-sizing here its just about updating the reference 

  

**_Disadvantages._**

\* Waste of memory due to references

\* Nodes in the linked list must be read in order from the beginning as linked list have sequential access

\* Difficult to do reverse travel , but we can enable this with back pointer. But this takes a memory

**_Inserting a references_**

\* Inserting to the beginning takes _O(1)_ constant time complexity. Because its just about adding a node

updating its next reference to the start of the linked list

\* Inserting to the last node _O(n)_ time complexity because we need to traverse throughout the linked list

to get to the last node, where last node will be pointing to a NULL reference. NULL reference is very much 

important in terms of linked list because that will be the last node of the linked list

  

**Remove**

Removing at the beginning is always fast because we don't need to search for item. Its 

only about removing, eg. In java assign to null.

Removing at a given point is O_(n)_ linear time complexity.