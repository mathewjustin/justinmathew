---
title: 'An early morning adventure'
date: 2024-01-31T17:41:00.000-08:00
draft: false
url: /2024/01/an-early-morning-adventure.html
---

On the early morning of February 1st, I decided to tackle a problem from the Striver's SDE sheet.

  

I came across an intriguing challenge titled "Set Matrix Zeroes".

  

Here's how I approached it:

  

Initially, I attempted a brute force method. The usual strategy of iterating through a matrix and setting rows and columns to zero has a drawback: it can lead to the loss of the matrix's original state, potentially zeroing out the entire matrix, which isn't the desired outcome. To avoid this, my approach involved marking the rows and columns that intersect at a zero element with a temporary value of -1. This way, the matrix's original elements remain unchanged until the final step, where a second pass converts all -1 values back to zeros.

  

The main drawback of this method is its inefficiency, with a time complexity that could be roughly estimated as (O((m times n)^2)), due to the need for multiple iterations over the matrix.

  

Seeking improvement, I explored an optimal solution that builds upon the brute force idea but introduces two marker arrays, one for rows and another for columns. As we scan the original matrix, we use these arrays to mark any row or column containing a zero. A subsequent iteration through the matrix then uses these markers to set the corresponding elements to zero. This refined approach reduces the number of iterations, achieving a time complexity of (O(2 times m times n)).

  

Despite the improvement, I wondered if there was an even better solution. Recalling that I had previously solved this problem on LeetCode under the title "Set Matrix Zeroes" (you can find the problem \[here\](https://leetcode.com/problems/set-matrix-zeroes/)), I revisited my submission. To my surprise, I had employed a different, more efficient strategy in my past solution, which can be viewed \[here\](https://leetcode.com/problems/set-matrix-zeroes/submissions/1004912402/).

  

The best solution I found leverages the first row and first column of the matrix as marker arrays, eliminating the need for additional space. A special variable is used to determine whether the first row or column should be entirely zeroed. This approach requires careful iteration from the second row and column onwards, with a final pass to address the first row and column as needed.

  

For those interested in the solutions, they are available on my GitHub repository at \[this link\](https://github.com/mathewjustin/2024-DsAndAlgo/tree/main/src/main/java/com/codepower/striver/arrays).

  

Thank you for taking the time to read this if you've made it this far.

  

Justin