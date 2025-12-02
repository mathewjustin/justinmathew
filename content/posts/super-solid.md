---
title: "Solid Principles" 
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

Just like we read about the SRP, I've collected some qoutes on open closed principles. You know why I collected them? because those one liners has then entire point of OCP. Our aim in the coming years to make sure our code is being understood by AI and AI will make only minimal changes to the code. We might have seen AI regenerating the entire code base with just one slight prompt. Well that's something which we should be avoiding. Our code should be written in a way that it is open for extension and closed for modification. Just like SRP the goal is to avoid motivation for change.

So the quotes again:

> "If adding a feature means touching stable code, you’re probably violating OCP" — I stole it from somewhere.

This is so true in case of legacy applications. I've worked on some very old projects where adding a small change is considered to be risky and bring in regressions. This mostly happens when the code is closed for extensions. There were cases where we put hundreds of if else conditions, run time flags to enable or disable a features. Run-time flags were the crazy ones we start with one flag then we end up having this flag for every small feature. Imagine there is an extension feature for feature A. What do we do? We add another flag. This leads to a combinatorial explosion of flags and conditions, making the codebase even more complex and harder to maintain. On legacy software products the first thing to identify before adding a new feature is to find out how to make a runtime flag for it. This is a clear sign of OCP violation. 

I know I should't be preaching something which i practice less, But I am trying to get better at it.

Side note: I am oversimplifying OCP here, we don't write this in production grade code. When we write code in production if its just an email sending service, it will incluide retries, proper logging, metrics, outbox pattern..etc and etc. But this is just an evening read, and enough to crack the idea of OCP.

So lets take an example of the emailService we created in the previous section. 

```class EmailService {
  sendOrderConfirmation(order) {
    // Send email
    }
}
```
So now this is just about sending an email. What if we have multiple email providers? For example, SendGrid, Amazon SES, SMTP etc. If we need to add support for multiple email providers, we should not be modifying the EmailService class. Instead we can create an interface for EmailProvider and implement different providers. 

```
interface EmailProvider {
  send(email) {
    throw new Error("Method 'send()' must be implemented.");
  }
}
class SendGridProvider implements EmailProvider {
  send(email) {
    // Send email using SendGrid
  }
}
class AmazonSESProvider implements EmailProvider {
    send(email) {
    // Send email using Amazon SES
    }
}
class EmailService {
    constructor(provider) {
    this.provider = provider;
    }
    sendOrderConfirmation(order) {
    const email = this.createEmail(order);
    this.provider.send(email);
    }
    createEmail(order) {
    // Create email content
    }
}
```
For example in Spring boot we can have multiple implementations for email service, and based on lets say which IaaS we are deploying the application we can choose the implementation at runtime using dependency injection. This is very usual for example the same app we deploy on AWS might use Amazon SES provider, while the one on Azure might use SendGrid provider.

Usually it happens for applications which are deployed on multiple cloud providers, like SaaS products. I am fortunate to have worked on such products. Where the same code will be implemented differently based on the cloud provider. 

Now the above code is open for extension, we can add more providers without modifying the EmailService class. This is the essence of OCP.


## Liskov Substitution Principle

You know what, this name Liskov substitution principle is sometimes intemidating. Such a facncy name. But the idea is simple. Look at this image which i stole from the globalnerdy.

![alt text](image.png)

Well if i put this into words. In mathematics Square "is a" Rectangle. You are getting the point..? "is a". So based on this you can make square from rectangle, what could go wrong in this? Let's just write it down..

``
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }

  setWidth(width) {
    this.width = width;
    this.height = width; // Square must have equal sides
  }

  setHeight(height) {
    this.width = height;
    this.height = height; // Square must have equal sides
  }
}
```
So now Mathematically yes square is a rectangle, But this code? hmmm...
It has a problem. This violates Liskoves substitution principle. Why?

The moment you replace Square at the place you want to use Rectangle, you will mess up the code. Liskov substitution says you should be substitutable from the classes it derived. Can i substiture Rectangle with Square in this case? No we cant. 

The moral of the story is : model your classes based on behaviours not on properties; model your data based on properties and not on behaviours. If it behaves like a duck, it's certainly a bird.


## Interface Segregation Principle

## Dependency Inversion Principle

