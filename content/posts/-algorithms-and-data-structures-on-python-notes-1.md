---
title: ' Algorithms and Data Structures on Python  -   Notes 1'
date: 2020-09-20T11:23:00.002-07:00
draft: true
url: 
tags: 
- Data Structures in Python
---

** Data Structures Overview  **

          Bad programmers worry about code , good programmers worry about data structures and their relationships! 

       Data structures provide efficient ways to store data. A proper data structure can boost an Algorithm. If we need to make a app performs good then we must care about selecting proper data structure.

     There is a tradeoff between running time complexity and memory time complexity. Eg. Dijktras algorithm with priority queue performs better but it will take more memory. If we need to minimize the memory then the application will be slow.

**          Abstract data types  -  Data Structures **

Abstract data type is basically the logical implementation. We can use data structures like array or linked list to implement it. So Abstract data types are logical definition  and data structures are concrete implementations. This is the difference between abstract data types and data structures.

  

**Arrays - Basics**

         It can be N dimensional according to the needs. Arrays are good because it has O(1) time complexity to get by index. 

  Disadvantages are 

1.  It is compile-time : it is no so dynamic data structures.
2.  If it is full we need to create a bigger array to copy the contents. That operation is going to take O(N) time complexity
3.  It is not able to store items with different type

**Arrays - Operations**

Add : We can do it in **O(1)** constant time complexity because we are going to insert the element at the end of the array. And we certainly we should know the location where we are inserting.

If we insert to middle of of the array, then we have to shift entire array and we ends up **O(N)** linear time complexity. 

Remove : If we remove the last item then we will be able to do it on **O(1)**. But to remove an item with a particular index then shifting is involved so we will end up with **O(N). **

      **Arrays are good data structures? It depends on the application it uses**

  

Examples : [pylearn\_personal\_git](https://github.com/mathewjustin/pylearn/tree/master/basics/ds-algos)