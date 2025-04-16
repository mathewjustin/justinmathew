---
title: 'Python linked List implementation'
date: 2021-01-04T08:21:00.003-08:00
draft: false
url: /2021/01/python-linked-list-implementation.html
---

```
  
class Node:  
     def \_\_init\_\_(self, data):  
         self.data=data  
         self.nextNode=None  
  
  
  
class LinkedLIst:  
  
    def \_\_init\_\_(self):  
        self.head = None  
  self.numberOFNodes=0  
  \# Here we get o(1) constant running time complexity for insertion.  
  def insert\_start(self,data):  
  
        self.numberOFNodes=self.numberOFNodes+1  
  new\_node = Node(data)  
  
        if not self.head:  
            self.head=new\_node  
        else:  
            new\_node.nextNode=self.head  
            self.head = new\_node  
 #Linear running time o(n)  
  def insert\_end(self,data):  
        self.numberOFNodes=self.numberOFNodes+1  
  new\_node=Node(data)  
  
        actual\_node=self.head  
  
        while actual\_node.nextNode is not None:  
            actual\_node=actual\_node.nextNode  
  
        actual\_node.nextNode=new\_node  
  
    def size\_of\_list(self):  
  
        actual\_node = self.head  
  
        while actual\_node is not None:  
            print(actual\_node)  
            actual\_node=actual\_node.nextNode  
  
    def traverse(self):  
        actual\_node=self.head  
  
        while actual\_node is not None:  
            print(actual\_node.data)  
            actual\_node=actual\_node.nextNode  
  
    def deleteAtHead(self):  
  
        self.head=self.head.nextNode  
        self.numberOFNodes=self.numberOFNodes-1  
  
  def deleteAtTail(self):  
  
        actual\_node = self.head  
  
        while actual\_node.nextNode.nextNode is not None:  
            actual\_node=actual\_node.nextNode  
  
        actual\_node.nextNode=None  
  self.numberOFNodes=self.numberOFNodes-1  
  
  
  
linked\_list=LinkedLIst()  
linked\_list.insert\_start(4)  
linked\_list.insert\_start(3)  
linked\_list.insert\_start('A String type')  
linked\_list.insert\_start(1.232)  
linked\_list.insert\_end(12.232)  
linked\_list.traverse()  
  
print('Deleting at the front')  
linked\_list.deleteAtHead()  
linked\_list.traverse()  
  
print('Delete at the last position')  
linked\_list.deleteAtTail()  
linked\_list.traverse()
```