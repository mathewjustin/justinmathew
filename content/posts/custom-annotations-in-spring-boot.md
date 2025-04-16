---
title: 'Custom annotations in Spring Boot'
date: 2020-10-01T13:21:00.000-07:00
draft: false
url: /2020/10/custom-annotations-in-spring-boot.html
tags: 
- Spring boot
- Custom annotation
- Microservices
---

           I had worked on spring framework extensively throughout my career. The one thing which I am always try to implement in any Spring project I work on is Custom annotation. Its a fancy stuff but useful in many ways. 

         Say you have numerous micro services (Duplicate code bases which will f\*\*\* you up) running on your cluster, the best and first thing you do is - Build a common library to push all your model classes, so called util package of your organization :p and the fancy stuffs  . I am fortunate that I get to do all these experiments early on my career. So lets start with the problem.

  

1.  We have many micro services which are built on top of spring framework. We want to use a  common service bean in all our boot apps.  
2.  This bean should be enabled with @EnableMyBean annotation.
3.  Once the spring boot app loads it should intercept this annotation and inject our MyBean service to our Spring boot application.

  

So the first step to do is create the annotation itself

  

  

  

  

The @Import is from org.springframework.context.annotation package  You can find the documentation over [here](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Import.html)

  

  

  

  

  

  

  

  

  

Next is the implementation of MyBeanSelector class. We can define it as follows.

  

  

 Lets look at each components. First the importSelector interface. As the definition on the Spring document "_[Interface to be implemented by types that determine which @`Configuration`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/ImportSelector.html)__[ class(es) should be imported based on a given selection criteria, usually one or more annotation attributes](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/ImportSelector.html)._" 

  

This class is accountable for which Bean should be injected  to the spring context. It has many other cool features as well. Say you want to read some property from the environment in which the common library is used. Ie, from the Yaml file of the spring boot app which is using your common library. Then you can implement [EnvironmentAware](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/EnvironmentAware.html) Interface. 

    Once we do the above, next we can define the actual service class inside "com.commons.service". 

  

  

  

  

So now You can use @EnableMyBean on your main method of the spring boot application. And you can Autowire MyService class anywhere inside your application. At the time of start up spring would automatically detect the @EnableMyBean annotation and push the Service Bean to the app's context.