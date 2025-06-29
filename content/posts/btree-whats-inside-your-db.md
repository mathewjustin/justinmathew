---
date: '2025-06-29T23:02:39+05:30'
draft: false
title: 'B-Tree a data structures -  Postgres Internals rabbit hole..'
description: 'Another sunday night, another rabbit hole.'
---
## Introduction

 B-Trees are a facinating inventions in computing. They are some special kind of binary tree. But with very concrete rules. I have watched small video and now i am in the b-tree rabbit hole. I'ts nice last time i've been in a rabbit hole like this was when i was learning about prime numbers and how they used in cryptography, well thats a blog post for another day.

 So The btree data structure in simple terms is a tree which has multiple values in single node, and children nodes can be more than 2. In binary tree we have only 2 children nodes, but in btree we can have more than 2 children nodes. 

 In binary tree the rule is to the left of the root node we have smaller values and to the right of the root node we have larger values compared to the root node, but in the btree the childrens are on a range of values and the range is defined by the parent node.

 The most interesting part of btree is the rules which it has, why the rules? Because we wanted a datastructure which can do fast search, insert and delete operations. And the btree is designed to do that. To achieve this there are certain rules which is present in btree. 

 ### Lets start with the below binary tree.

                           19
                        /    \
                      7       37
                    /   \     /   \
                  3     13  29    43
                 / \   / \  / \   /  \
                2   5 11 17 23 31 41  47    

Just think about the searching in this tree, at any given point we always search on half of this tree. Either left side or right side. So the time complexity is logermic. So at this point we may feel this is really good, but think about this you have a massive amout of indexes and page poiters to eb stored in case of postgresql or mysql. And if it was binary tree then the depth of the tree will be more and more. So the search will take more time, becase even if we are searching on half of the tree, the depth of the tree is more.

So B trees will help us to reduce the depth of the tree, and it helps to reach the index faster. Lets see the above tree how is it represented as a btree.  

So imagine this - Instead of spliting into half, like left child and right child, can we split into 3 and reduce the search space into 1/3, what if we split into 4 we reduce the search space to 1/4..so on. Something like below:

```
                    [13, 29]
                  /     |     \
        [5, 7]     [17, 23]     [37, 43]
       /     \       |       /    |     \
   [2, 3]   [11]    [19]   [31]  [41]   [47]    
```

1. Values less than the first key of the root node will be to the left
2. Values greater than the second key of the root node will be to the right.
3. And, the values which are between first and second key will be on the middle. 

This is how it is represented. Now we need to look at less number of nodes to get to the answer. Now we may think there are way too many comparisons than binary tree, but imagine this. The most time spent is not on comparing but while fetching the data to be compared. In case of databases it is completely true. 


## Rules:

Certain rules which needs to keep in mind are. 

1. B-Tree is a balanced tree, which means all leaf nodes are at the same level.
2. Each node can have a variable number of keys and children.
3. The keys in each node are sorted in ascending order.
4. The number of keys in a node is between a predefined minimum and maximum.
5. The root node must have at least one key.

So the Primary logic of B-Tree is to keep this rules intact while performing insert and delete operations. 

## Insert?

For example while inserting a new key if the node is full then we need to split the node into two nodes and promote the middle key to the parent node. This will keep the tree balanced and maintain the properties of B-Tree. Look at the below.

In our case,

Maximum number of keys are going to be 4.
And minimum number of keys are going to be 2.

We insert, 7, 23, 59 and 97. Now the first node is creted as below.

```
[7, 23, 59, 97]
```
Now the node is full, so what happens when we add the 5th key?

Say we are adding 73. Now the node will be splitted into two . 

```
        [59]
       /     \
[7, 23]     [73, 97]
```
Now we splitted the node into two, also we promoted 59 to the parent node. Now this started looking like a simple tree. 

Now we can add more keys to the tree. 

```
        [59]
       /     \
[7, 19, 23]     [61, 67, 73, 79, 97]
```
The insertion is very smooth only problem we have is when we reach the maximum number of keys in a node. We have to split the node and promote the middle key to the parent node.
So after inserting 61 it will look like this.

```
        [59, 73]
       /     |     \
[7, 19, 23] [61,67] [79, 97]
```

So what happens the parent is full? The algorithm is recursive so it splits the parent as well and promotes and cretes a new parent node. 


# Delete?

Do a search as usual, find the node and delete.. So simple Not really. Becase we need to keep the properties of B-Tree intact. So we need to do some extra work while deleting a node.

It is possible we ended up having a node with less than minimum number of keys. So we need to merge the node with its sibling or borrow a key from its sibling. So lets delete 61

```
        [59, 73]
       /     |     \
[7, 19, 23] [61,67] [79, 97]
```

What happens in this case, we detect violation of the rules. What to do now, borrow one from sibling.  
Left sibling: [7, 19, 23] (has 3 keys)
Borrow 23 from left sibling
Promote 59 (from root) into current node
Replace 59 in root with 23

```
           [23, 73]
         /     |     \
[7, 19] [59, 67] [79, 97]
```

So we promoted and swapped the keys to maintain the properties of B-Tree. And this happens recursively until we reach the root node.

So next time somthing screed up in your database index and the writes are slow, just remember the btree and how it works. It is a very simple data structure but it has a lot of rules to maintain the properties of the tree.  

In postgres the btree is implemented as a balanced tree with a variable number of keys and children. The implementation is done in C and it is highly optimized for performance.  

# Some postgres insights. 

TBH I am not a great engineer, but as far as i digged.

https://github.com/postgres/postgres/blob/master/src/backend/access/nbtree/README

Postgres uses a slightly different implementation of B-Tree called "B-Tree with variable-length keys".  And it is optimized for high concurrency and performance. If you look at the read me they say B-Tree managment algorith. But on a high level this is how it works. This is what i understood from chatgpt. 

What is stored in the B-tree is a set of key-value pairs, where the keys are the indexed columns and the values are the corresponding row identifiers (TIDs). The B-tree is used to quickly locate the rows that match a given key value. 

So the node will look like this.

```
Node (Page 10):
[
  (42, child_page=105),
  (85, child_page=109)
]
```

Where ctid is the tuple identifier which is used to locate the row in the table. So when you do a select query with a primary key, postgres will use the btree index to quickly locate the row in the table. So if the key is less than 42 go to the left child page, if greater than 85 go to the right child page, and if it is between 42 and 85 go to the middle child page. 


So the next big question can i actually see this btree in action? The answer is yes. So lets start:

```bash
docker run --name pg-btree \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_USER=justin \
  -e POSTGRES_DB=btree_demo \
  -p 5432:5432 \
  -d postgres:15
  ```

  Pull it down and run it. :p 

Now connecto to it and run the below commands.

```sql
CREATE TABLE demo (id INT PRIMARY KEY);
INSERT INTO demo VALUES (10), (42), (85);
```  

Once you do this you can see the btree index created for the primary key. 

```sql
btree_demo=# SELECT * FROM bt_page_items(get_raw_page('demo_pkey', 1));
````
``` 
 itemoffset | ctid  | itemlen | nulls | vars |          data           | dead | htid  | tids
------------+-------+---------+-------+------+-------------------------+------+-------+------
          1 | (0,1) |      16 | f     | f    | 0a 00 00 00 00 00 00 00 | f    | (0,1) |
          2 | (0,2) |      16 | f     | f    | 2a 00 00 00 00 00 00 00 | f    | (0,2) |
          3 | (0,3) |      16 | f     | f    | 55 00 00 00 00 00 00 00 | f    | (0,3) |

````

So the data is stored as hex values, if you convert it to decimal its basically the id values. So the first item is 10, second item is 42 and third item is 85.

So our node will be like this.

```
Leaf Node (Page 1):
[
  (10 → TID(0,1)),
  (42 → TID(0,2)),
  (85 → TID(0,3))
]
```

So if i do a select query with id 42, postgres will use the btree index to quickly locate the row in the table. 

```sql
SELECT * FROM demo WHERE id = 42;
```
It essentially does a binary search and finds outs its htid, htid means heap tuple identifier which is used to locate the row in the table.
In our case our tupe is on page 0 and tuple 2. So it will go to the page 0 and fetch the tuple 2.(that is our row with id 42)

The end! I will try to dig more into its source code and to try to undestand how it works for sure. This is just a high level overviiew. 