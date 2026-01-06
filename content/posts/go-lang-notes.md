---
title: 'Go Lang Notes'
date: 2026-01-06T10:00:00.000-08:00
draft: false
url: /2026/01/go-lang-notes.html
---


# Go Lang Notes

I've started learning Go lang very recently. For a long time java develoeper, introduction to various tricky concepts of Go lang is fun. When ever I learn something new, I will try to dig into some philosophical aspects of the language and write them down here.

1. For example, why go lang doesnt have inheritance, why its somehow forces you to choose composition over inheritance. 
2. Why go lang has interfaces but no classes. 
3. Why go lang has goroutines and channels instead of traditional threads and locks.
4. And most importantly, structs and how they are different from classes. Importance of order of fields in structs.
5. Debugging stories of go applications, memory issues, profiling etc.

### 1. Composition over Inheritance

Composition over Inheritance is a design principle that promotes the use of composition to achieve code reuse and flexibility, rather than relying on class inheritance. In SOLID principle terms, Dependency Inverstion Principle is achieved using composition. If you look at the overall design of a Spring boot application you will see that it heavily relies on composition using interfaces and dependency injection rather than inheritance. When a spring boot developer says we can just "Autowire" this dependency, it means unknowingly they are ending up using composition over inheritance.

But in Java world inheritance is a concept which comes with the language itself. As the project grows the same language feature will end up being misused in many places. For example, you have a base class called Animal and Dog and Cat classes inherit from it. Now you want to add a new class called RobotDog which is not really an animal but behaves like a dog. Inheritance will not help here. You will end up creating a complex hierarchy of classes which will be hard to maintain.

If a language just prevents inheritance, developers will be forced to think in terms of composition. Go lang does exactly that. It provides interfaces and structs which can be composed together to achieve the desired functionality. This leads to more flexible and maintainable code.

```go
type Dog struct {}

func (d Dog) Speak() string {
    return "Woof!"
}

type RobotDog struct {
    Dog // Embedding - this is composition!
}

func (rd RobotDog) Speak() string {
    return "Beep Boop! " + rd.Dog.Speak()
}
```

Well this is same as doing something like below in java with inheritance. But in go lang its composition.

```java
class Dog {
    String speak() {
        return "Woof!";
    }
}
class RobotDog extends Dog {
    @Override
    String speak() {
        return "Beep Boop! " + super.speak();
    }
}
```

btw you can achieve composition in java using interfaces and delegation as well. Like the below, which every SOLID java developer should know.

```java

interface Speakable {
    String speak();
}       

class Dog implements Speakable {
    public String speak() {
        return "Woof!";
    }
}

class RobotDog implements Speakable {
    private Speakable dog;
    public RobotDog(Speakable dog) {
        this.dog = dog;
    }
    public String speak() {
        return "Beep Boop! " + dog.speak();
    }
}
```
Being a java developer, I am kind of pro Go lang after understanding just this concept. Look at how many lines of code we saved in go lang by avoiding all the boilerplate code of interfaces and delegation.


---To be continued...---