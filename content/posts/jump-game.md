---
title: 'Jump Game'
date: 2024-02-22T17:18:00.000-08:00
draft: false
url: /2024/02/jump-game.html
---

Jump Game Peak and Valley approach.
-----------------------------------

  

Jump game is a medium level leetcode problem which is very interesting yet brainy. Once you understand the problem correctly then the answer is obvious. The probelm goes like this according to leetcode. 

You are given an integer array `nums`. You are initially positioned at the array'sfirst index, and each element in the array represents your maximum jump length at that position.

Return `true`_ if you can reach the last index, or _`false`_ otherwise_.

  

For example consider this array

\[1,3,2,2,0,1\]

When I am at position 1 then i can jump to position 2, Once i am at postition 2 I can jump to 3,4 or 5. The max i can jump from Second position is to position 5 and the element at position 5 is 0 this essentialy means i cannot jump further. 

The way to solve this problem using peak and valley here I am representing this array as peaks and valleys.

  

  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhX0Pl9ZGJ32Xu6hwOU1rheta_uTWloON3fdBUKmRWC-JCtnp7L3aSWgj5blMz_klh-SMUcwzsCn-yKUO5ZTMgb5cp9G2yLEx2GuGPXEysc_6caYQcEYn4IssR9C6KDzHAGOk-YB04PTZMOYhROba3hY5wq8GK427GruvghfonXrUxfYflIY3idh9IpD_Xe/s320/peakvalley.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhX0Pl9ZGJ32Xu6hwOU1rheta_uTWloON3fdBUKmRWC-JCtnp7L3aSWgj5blMz_klh-SMUcwzsCn-yKUO5ZTMgb5cp9G2yLEx2GuGPXEysc_6caYQcEYn4IssR9C6KDzHAGOk-YB04PTZMOYhROba3hY5wq8GK427GruvghfonXrUxfYflIY3idh9IpD_Xe/s1387/peakvalley.png)

  

  

If you look at the above image you can see peak and valleys. Once you are on the valley that is 0 You don't really have a way out of it. But you can actually make a jump from position 3 to position 5 by skipping the valley. This is the basic intuition behind the solution. 

The basic steps are the following :

You create a variable called reachable which holds the maximum position you can reach.  So how do you calculate the value of reachable it is :

Max(reachable, currentPosition+input\[currentPosition\]).

So the max reachable index will be the maximum of reachable or currentPosition+input\[currentPosition\]. 

So our job is just to calculate this every position and if at any given point we realize that the currentPosition is greater than the reachable then we reuturn false, essentially means we are at the valley and no way to escape.

```
private boolean canJumpFromPosition(int i, int\[\] nums) {  
    int reachable=0;  
 int n=nums.length;  
 for(int j=0;j<n;j++){  
        if(j>reachable){  
            return false;  
  }else{  
            reachable=Math.max(reachable,j+nums\[j\]);  
  }  
  
    }  
    return true;  
}
```

  

In this we iterate over the arrray and each position we check are we at a reachable position or not. If we are not at a reachable position then we are at valley and if we are at a reachable position then we just recalculate the reachable index by adding currentIndex and the value in the current index.