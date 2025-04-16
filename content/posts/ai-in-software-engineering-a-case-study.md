---
title: 'AI In software engineering a case study'
date: 2024-02-05T05:47:00.000-08:00
draft: true
url: 
---

**Understanding the Binomial Coefficient:**

  

Imagine you have a group of 5 friends (let's name them A, B, C, D, and E), and you want to select 3 of them to form a team for a game. The binomial coefficient (53)(35​) tells you how many different teams of 3 you can form from the 5 friends.

Breaking Down the Formula:

The formula for the binomial coefficient is (��)\=�!�!(�−�)!(kn​)\=k!(n−k)!n!​. Let's break it down using our example where �\=5n\=5 and �\=3k\=3:

1.  1\. Factorials: The "!" symbol stands for factorial. For any positive integer �x, �!x! (x factorial) is the product of all positive integers up to �x. For example, 5!\=5×4×3×2×1\=1205!\=5×4×3×2×1\=120.
    
2.  2\. Applying the Formula: To find (53)(35​), we plug our numbers into the formula:
    
    (53)\=5!3!(5−3)!\=5!3!2!(35​)\=3!(5−3)!5!​\=3!2!5!​
    
    Calculating each factorial:
    
      
    
    *   5!\=1205!\=120
    *   3!\=63!\=6
    *   2!\=22!\=2
    
    So, (53)\=1206×2\=12012\=10(35​)\=6×2120​\=12120​\=10.  
    
    This means there are 10 different ways to choose 3 friends out of 5.
    
3.  **Why Does the Formula Work?**
    
4.    
    
5.  1\. Starting with Permutations: Initially, if we were to line up 3 of your friends out of 5, not just choose them, we'd have to consider the permutations (different arrangements). For the first friend, you have 5 choices, for the second, you have 4 (since one friend is already chosen), and for the third, 3 choices left. So, for permutations, you multiply these:
    

1.  5×4×3\=605×4×3\=60.
    
2.  2\. Adjusting for Order Not Mattering: The 60 permutations include different orders of the same 3 friends (like ABC, ACB, BAC...). But in our case, the order doesn't matter; ABC is the same team as BAC. Each group of 3 friends can be arranged in 3!\=63!\=6 ways (3 options for the first position, 2 for the second, and 1 for the last), so we've counted each group 6 times in our 60 permutations.
    
3.    
    
4.  3\. Getting to Combinations: To correct for this and count each unique group once, we divide the number of permutations by the number of ways to arrange 3 friends:
    
5.  606\=10660​\=10. This matches our calculation using the binomial coefficient formula, showing that there are 10 unique ways to choose 3 friends out of 5.
    
6.  Conclusion:
    

 The binomial coefficient formula (��)(kn​) gives us a way to calculate the number of unique groups (combinations) of �k items we can choose from a larger set of �n items, without caring about the order of selection. It corrects for the overcounting of arrangements (permutations) by dividing by the factorial of the group size �!k!, ensuring each unique group is only counted once.

Now lets gets into the most interesting part. The pascals triangle and creating it with Binomial Coefficients. 

First lets start with writing a small program to print pascals matrix to the nth row.

Idea behind this program is pretty simple List<List>  basically represents Column<Rows> or a matrix.  

   Each rows first and last value will be one that we hard code. Then iterate over numRows and construct each rows. One small thing to notice here is the inner for loop it has to run from 1 to < less than rowNum. Basically it runs 1, 2, 3 times from the 2nd  row. So basically rowNum-1 times it runs, basically skipping for first two rows.

Lets move forward to  to understand the relation between binomial coefficient and the pascals triangle. If you look closely you can find something really interesting. Below is the representation of of pascals triangle 

  

If you did not catch this yet see the below which will unlock the hidden pattern of the relation between binomial coefficient and pascals triangle

with this we now understood the relation between pascals triangle and binomial coefficient. Great now for a very dumb person like me can easily understand what Striver is saying in his video. Now the below program makes a lot of sense. Check the below program which will show you how to calculate the value in a particular position of the pascals triangle.

  

  

If you reached this far of the blog then great you are upto something special in your life. Stay tuned for the next blog