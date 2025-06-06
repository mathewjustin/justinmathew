---
date: '2025-06-06T23:02:39+05:30'
draft: false
title: 'The nicest way to merge two sorted arrays'
description: 'This is one of the easy but tricky problems. To be really honest I also struggled with tihs one. I am writing this down, and the pitfalls of this problem, so that I can refer to this later.'
---

You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

 

```Example 1:

Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
```
```Example 2:

Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
```
```Example 3:

Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
```

The solution is actually simple. Look at the below. 

The first intuition is we can use the empty positions in nums1 to fill the elements from nums2. Which is a harmless approach, because we are not overwriting any elements in nums1. The approach is based on this principle:


Step 1:

We will have 3 pointers, p1 pointing to m-1
p pointing to m+n-1
p2 pointing to n-1
 
![alt text](image.png)


We continue this for next element. 

![alt text](image-1.png)

Now on the next step we will have p1 pointing to 3, p2 pointing to 3, and p pointing to nums[3]. Look at the below image.

![alt text](image-2.png)

On the final iteration, 

![alt text](image-3.png)

The last part is a bit tricky. If you look at the original array what we do in our mind is shifting of elements. But what we are doing is dupicating the element and replacing it. This same approach we have seen in a problem where i wanted to remove a particular element from an array with o(1) time complexity. 

From this Problem , Leetcode: https://leetcode.com/problems/insert-delete-getrandom-o1/ 

Both of this probelms are similar in nature.

Don’t shift data. Overwrite it smartly.


## Now the pitfalls.

This is the crazy part of this problem. 

 
```java  
public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1;
        int p2 = n - 1;
        int p = m + n - 1;
        while(p>=0)
        {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1--];
            } else {
                nums1[p] = nums2[p2--];
            }
            p--;
        }

  }
```
So elegant right? But there is a pitfall.

Pitfall No 1:

Input: nums1 = [0], m = 0, nums2 = [1], n = 1

What happens here is p1 will be -1, and nums1[p1] will throw an exception. So we need to handle this case.

In this case when p1 is -1 i need to go to else part. so we need to check if p1 is greater than or equal to 0.

```java  
public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1;
        int p2 = n - 1;
        int p = m + n - 1;
        while(p>=0)
        {
            if (p1>=0&&nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1--];
            } else {
                nums1[p] = nums2[p2--];
            }
            p--;
        }

  }
```

Pitfall No 2:

The while loop condition is p>=0. But what if nums2 is empty? In that case p2 will be -1, and we will try to access nums2[-1] which will throw an exception. So we need to handle this case as well.

So instead of checking p>=0, we need to check if p2 is greater than or equal to 0.


```java
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1;
        int p2 = n - 1;
        int p = m + n - 1;
        while(p2>=0)
        {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1--];
            } else {
                nums1[p] = nums2[p2--];
            }
            p--;
        }

    }
```

For the pitfall 2 as per leetcode solution it is to break if p2 is less than 0. But i think it is better to check the condition in the while loop itself. It just guarantees that you need to copy all the elements from nums2 to nums1. until p2 is less than 0.
