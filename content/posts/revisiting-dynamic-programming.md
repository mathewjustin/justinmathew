---
title: 'Revisiting Dynamic Programming'
date: 2024-03-19T13:11:00.000-07:00
draft: false
url: /2024/03/httpswww.justinmathew.com202403dynamic-programming-revisiting.html.html
tags: 
- DynamicProgramming
- Data Structures
---

```


The main problem with me w.r.t DP problem is forgetting it if i don't 

practice. So I decided to revisit all the DP problems i solved once again 

just to refresh my memory.

  
So first Lets start with a simple one. Here we go!!!  
  
Climbing stairs from Leetcode.  
  

Explanation : You are climbing a staircase. 

It takes n steps to reach the top.  
Each time you can either climb 1 or 2 steps. In how many 

distinct ways can you climb to the top?

Example 1:  
  
Input: n = 2  
Output: 2  
Explanation: There are two ways to climb to the top.  
1\. 1 step + 1 step  
2\. 2 steps  
  
Example 2:  
Input: n = 3  
Output: 3  
Explanation: There are three ways to climb to the top.  
  
1\. 1 step + 1 step + 1 step  
2\. 1 step + 2 steps  
3\. 2 steps + 1 step  
  
So how can we solve this simple problem?  
  
As usual we can solve this problem using recursion.   
But the problem with recursion is it will have exponential time complexity.   
In recursive way the following is the solution     \`\`\`java  
 public int climbStairs(int n) { if(n == 1) return 1; if(n == 2) return 2; return climbStairs(n-1) + climbStairs(n-2); } \`\`\`  
The logic of the above is : 

 \* If n is 1 then there is only one way to climb the stair. \* If n is 2 then there are two ways to climb the stair. \* If n is greater than 2 then the number of ways to climb the stair is  the sum of the number of ways to climb the stair when n-1 and n-2.


``````
So we recursively call climbStairs(n-1) and climbStairs(n-2) and 
``````
add them to get the result.  
What is the problem with this approach?  
  
The problem with this approach is it has exponential time complexity.  
For example if n = 5 then the number of ways to climb the stair is 8.  
So the number of recursive calls will be 8.  
If n = 6 then the number of ways to climb the stair is 13.  
So the number of recursive calls will be 13.  
if n=7 then the number of ways to climb the stair is 21.  
So the number of recursive calls will be 21.  
So the time complexity of this approach is O(2^n). 
``````
Where n is the number of stairs. and 2 is the number of ways to 
``````
climb the stair.  
  
If we construct a recursion tree for n=5 it will look like below.  
  
!\[\](img\_1.png)  
  
Space complexity of this approach is O(n) where n is the number of stairs.  
Or in other words the depth of the recursion tree is n.  
  
So lets get into the basic dynamic programming approach.  
  
\`\`\`java  
class Solution {  
 // A function that represents the answer to the problem for a given state private int dp(int i) { if (i <= 2) return i; // Base cases return dp(i - 1) + dp(i - 2); // Recurrence relation }     public int climbStairs(int n) {  
 return dp(n); }}  
\`\`\`  
  
The above approach is a top-down approach. Means we are solving the problem 
``````
from the top to the bottom. The time complexity of the above approach is 
``````
O(2^n) and the space complexity is O(n). 
``````
  

``````
**_So this is not really dynamic programming._** 
``````
  

``````
This is just a recursive approach. So lets get into the bottom-up approach.
``````
\`\`\`java  
class Solution {  
 public int climbStairs(int n) { if (n <= 2) return n; // Base cases int\[\] dp = new int\[n + 1\]; // Create an array to store 
``````
// the subproblems  
 dp\[1\] = 1; // Base case dp\[2\] = 2; // Base case for (int i = 3; i <= n; i++) { dp\[i\] = dp\[i - 1\] + dp\[i - 2\]; // The recurrence relation } return dp\[n\]; // The answer to the problem for n steps }}  
\`\`\`  
  
The above approach is a bottom-up approach. Means we are solving the problem 
``````
from the bottom to the top. Also the above approach is a tabulation approach. 
``````
Means we are solving the problem using an array to store the subproblems. 
``````
The time complexity of the above approach is O(n) and the space 
``````
complexity is O(n). The flow goes like this : 
``````


  
\* dp\[1\] \= 1 // Base case Means if there is only one stair then 

there is only one way to climb the stair.  
\* dp\[2\] \=  2 // Base case Means if there are two stairs then 

 there are two ways to climb the stair.

  
from 3 to n we calculate the number of ways to climb the stair

 using the following formula.


``````
\* dp\[i\] \=  dp\[i - 1\] \+ dp\[i - 2\] // The recurrence relation  
\* dp\[n\] // The answer to the problem for n steps  
  
So if you look at the first example of recursive approach the number 
``````
of recursive calls for n=5 is 8. But if you look at the bottom-up 
``````
approach the number of steps to calculate the number of ways to climb the 
``````
stair for n=5 is 5. So the time complexity of the bottom-up approach is O(n) 
``````
and the space complexity is O(n).
``````
  
So lets get into another problem. This is a Medium one.   
And this is a classic one.  
  
The problem is House Robber from Leetcode.  
  

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that 

adjacent houses have security systems connected and it will 

automatically contact the police if two adjacent houses were broken into on 

the same night.


``````
  

Base case : If there is 4 houses then the maximum amount of money you can rob is the maximum of the amount of money in the first house and   
the amount of money in the second house. plus the maximum amount of money you can rob from the remaining houses.


``````
  
  
The intuition behind the problem is the following.  
  

maxRobbedAmount\[0\]\=nums\[0\]  
maxRobbedAmount\[1\]\=max(maxRobbedAmount\[0\],nums\[1\])  
maxRobbedAmount\[2\]\=max(maxRobbedAmount\[0\]+nums\[2\],maxRobbedAmount\[1\])  
maxRobbedAmount\[3\]\=max(maxRobbedAmount\[1\]+nums\[3\],maxRobbedAmount\[2\])  
maxRobbedAmount\[4\]\=max(maxRobbedAmount\[2\]+nums\[4\],maxRobbedAmount\[3\])

  
Equation : maxRobbedAmount\[i\]\=max(maxRobbedAmount\[i-2\]+nums\[i\],
``````
 maxRobbedAmount\[i-1\])  
  
So the solution is the following.  
  
\`\`\`java  

class Solution {  
 public int rob(int\[\] nums) { if (nums.length == 0) return 0; if (nums.length == 1) return nums\[0\]; if (nums.length == 2) return Math.max(nums\[0\], nums\[1\]); int\[\] maxRobbedAmount = new int\[nums.length\]; maxRobbedAmount\[0\] = nums\[0\]; maxRobbedAmount\[1\] = Math.max(nums\[0\], nums\[1\]); for (int i = 2; i < nums.length; i++) { maxRobbedAmount\[i\] = Math.max(maxRobbedAmount\[i - 2\] + nums\[i\], maxRobbedAmount\[i - 1\]);  
 } return maxRobbedAmount\[nums.length - 1\]; }}


``````
\`\`\`  

The above approach is a bottom-up approach. Means we are solving the 

problem from the bottom to the top. Also the above approach is a 

tabulation approach. Means we are solving the problem using an array to 

store the subproblems.So the time complexity of the above approach is O(n) 

and the space complexity is O(n). Because we are using an array to store 

the subproblems.


``````
  

```