---
title: 'Solid Principles" 
date: 2025-11-06T11:23:00.002-07:00
draft: false
url: 
tags: 
- Clean code, SRP, SOLID Principles, Design Principles
---

# Solid Principles

> "Complexity is the enemy of execution." — Tony Robbins(From a youtube short)
 
<p>Most of the times complexity in code, or complex explanation of a simple problem leads to failure in the longterm. If you can't keep things simple, or explain things simply, either you have not understood it fully or you are trying to make an impression of being smart. At times I used to act like I know something which I dont have a clue about. This is may be a defense mechanism to hide my insecurities. But there comes a day when someone asks you a question which you cant answer and you feel embarrassed.
</p>

Why am I saying all these, we are just talking about solid principles. I have this stupid habbit of making things complex than it should be, may be that's why i should read SOLID principles again, and try to make the code little simple for humans and AI to understand. 


## Table of Contents

1. [Single Responsibility Principle (SRP)](#single-responsibility-principle)
2. [Open/Closed Principle (OCP)](#openclosed-principle)
3. [Liskov Substitution Principle (LSP)](#liskov-substitution-principle)
4. [Interface Segregation Principle (ISP)](#interface-segregation-principle)
5. [Dependency Inversion Principle (DIP)](#dependency-inversion-principle)

---

## Single Responsibility Principle

We all might have seen a person who can do many things at a time but not really good in any one thing. For example, I've been a mediocre fullstack developer for long time, there was a time i thought i fully understand how DOM works and how javascript manipulate DOM, at the same time i had this false impression that I can possibly find a memory leak in a legacy java application written 20 years ago. The truth is I was not really good at any one thing. 

This is somewhat happening in code as well. A big ass file which does way too many things. I am someone who believes that the name of a class or a file should reflect its responsibility. If a class or a file is doing too many things, it's a sign that it needs to be refactored into smaller, more focused components. 

As usually lets take an example. Unlike well defined examples which AI generates, i would like to make something my own. Lets take this example of an e-commerce appliaction. We all might have came across this class called Order.

```
class Order {
  constructor(id, items) {
    this.id = id;
    this.items = items;
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  save() {
    // Save order to database
  }

  sendConfirmationEmail() {
    // Send confirmation email to customer
  }
}
```
This class at a glance look really perfect. See another example, 

```
class OrderPostProcessor {
  constructor(order) {
    this.order = order;
  }

  process() {
    this.order.save();
    this.order.sendConfirmationEmail();
  }
}
```
At first glance this looks good, you have a class to control the order processing. If we look carefully and understand the reasoning behing SRP, it is to avoid motivation for change. If we need to change the way we save order, or send email, we will have to change the Order class. This is a violation of SRP. 

If there is a logic change in email sending, we should not have to touch the Order class. So we can refactor the code like this. 

```
class Order {
  constructor(id, items) {
    this.id = id;
    this.items = items;
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

class OrderRepository {
  save(order) {
    // Save to DB
  }
}

class EmailService {
  sendOrderConfirmation(order) {
    // Send email
  }
}

class OrderPostProcessor {
  constructor(orderRepo, emailService) {
    this.orderRepo = orderRepo;
    this.emailService = emailService;
  }

  process(order) {
    this.orderRepo.save(order);
    this.emailService.sendOrderConfirmation(order);
  }
}
```
Well what about the Order processing class? No it doen't violate SRP because its only responsible for post processing the order, not how to save or send email. Although it looks like more code, it avoids the need for changing the Order class when there is a problem in email sending or saving to DB.

We will visit the remaing in the coming days. For now this is enough to understand SRP.

## Open/Closed Principle

## Liskov Substitution Principle

## Interface Segregation Principle

## Dependency Inversion Principle

