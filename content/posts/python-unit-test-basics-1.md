---
title: 'Python Unit Test: Basics 1'
date: 2019-12-31T22:06:00.005-08:00
draft: false
url: /2020/09/what-i-found-on-python-basics-1.html
tags: 
- Python unit tests
- Python
- Factorial
---

 When comes to any programming language what i check first is how to write a unit test on it. 

   _"Coding is not difficult- Bill Gates"_ So what is difficult? I would say testing is difficult. Here is a basic example on how to test a small piece of python code.

  

                The above snippet is a basic recursive program which will return the factorial of a number. Lets see how we can write a basic test case for this. I have my directory structure as follows.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSuW4MWxkwZxWNHpl-IrVSSatiJBJHmmni_7xQWMjyt176mMeNx-tSr4E-daC7bBlMnUv2GEm2PLsDkLoqPTTPIkaqbhmFFpbTK2TX_A8SSNayfo38EeO_d-qRxQ-6bxCiw9KZSqiGzkte/)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSuW4MWxkwZxWNHpl-IrVSSatiJBJHmmni_7xQWMjyt176mMeNx-tSr4E-daC7bBlMnUv2GEm2PLsDkLoqPTTPIkaqbhmFFpbTK2TX_A8SSNayfo38EeO_d-qRxQ-6bxCiw9KZSqiGzkte/)

  
  

Lets see the contents of n\_factorial\_tests.py.

  

  

*   The first line is on importing the program to the test class. 
*   Next we are importing _unittest : T_his module provides a rich set of tools for constructing and  running tests.
*   While defining a function you can see we have used an object "_self_". This used to represent an instance of a class. Here it means accessing the contents of unittest.TestCase which is being inherited to this class.
*   Now we can access the functions defined unittest.TestCase  module. Because we have inherited that to our test class.
*   self.assertEqual(n\_factorial.factorial(5),120) : This is the statement where we assert for our expectation vs the actual value.
*   If you run this on PyCharm we can see the below.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpAkddv8OdNmNnXeXa0HajuadQ2ixTF3uvBknMECOJBu3sE2anoJm0bzJDv62tgjyGMgujdZMD5eKBjrWsG29gARKmLx9xxftpRXT7U0lTFY9f77dpQCrdFGNl1WhJD-ILjjxlVGJGJMHC/)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpAkddv8OdNmNnXeXa0HajuadQ2ixTF3uvBknMECOJBu3sE2anoJm0bzJDv62tgjyGMgujdZMD5eKBjrWsG29gARKmLx9xxftpRXT7U0lTFY9f77dpQCrdFGNl1WhJD-ILjjxlVGJGJMHC/)

  

Finally i wrote a python code and tested it ❤️