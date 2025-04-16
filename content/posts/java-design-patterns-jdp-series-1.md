---
title: 'Java Design Patterns - JDP Series #1'
date: 2024-03-07T17:23:00.000-08:00
draft: false
url: /2024/03/java-design-patterns-jdp.html
---

Design patterns are general reusable solutions to common problems that occur in software design. They are not code, but rather guidelines on how to solve a particular problem in a particular context. They are not a finished design that can be transformed directly into code. They are a description or template for how to solve a problem that can be used in many different situations.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```
  
  

Types of design patterns in Java
--------------------------------

  
There are three types of design patterns in Java:  
  

``````
\* Creational  
\* Structural  
\* Behavioral  
  
  

``````


### Creational design patterns

  

Creational design patterns are related to the way of creating objects. 

These patterns provide various object creation mechanisms, 

which increase flexibility and reuse of existing code. These patterns provide various object creation mechanisms, 

which increase flexibility and reuse of existing code.

  
There are five types of creational design patterns:  
  
\* Singleton Method  
\* Factory Method  
\* Abstract Factory Method  
\* Builder Method  
\* Prototype Method  
  

### Singleton Method

  

Consider a scenario where you need to manage  
a configuration file. You need to read the configuration file only 

once and then keep it in memory.

For this, you need to create a class that will read the configuration 

file and keep it in memory.

  
The below is a PUML diagram for a simple Configuration manager class.
``````


[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnCcwBmjYlXuEyC6Ge7xqzjI2TJ4uhFVbsYxieBZZpSFXaDI0DUjXvoHdQt_pAiUHN6i7ol6aSckPMW1t-IelUiSA9Lap9d9uO-c7BVUK_ziJJEFGxBhu9KTRAsBkpwbuQe0SD7F_RYzUN9gp9BMop6TJxgNB5XCTDpotJ6zlxHthBjYkoAFv8KNqYg3xG/s320/singletom-puml.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnCcwBmjYlXuEyC6Ge7xqzjI2TJ4uhFVbsYxieBZZpSFXaDI0DUjXvoHdQt_pAiUHN6i7ol6aSckPMW1t-IelUiSA9Lap9d9uO-c7BVUK_ziJJEFGxBhu9KTRAsBkpwbuQe0SD7F_RYzUN9gp9BMop6TJxgNB5XCTDpotJ6zlxHthBjYkoAFv8KNqYg3xG/s441/singletom-puml.png)

  
  

  
  
Example: Java Runtime, Logger, Spring Beans, and many more.  
  
Different flavours from JDK.  
  
Runtime.getRuntime();  
Desktop.getDesktop();

{{< gist mathewjustin 29a61f1dde5517ab37409304110ae9b7 >}}

