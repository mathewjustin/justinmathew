---
date: '2025-06-07T11:54:39+05:30'
draft: false
title: 'Inplace element removal an easy one'
description: 'Its an easy problem. But every problem has a trick. This one is no different. I will try to explain the trick in this post.'
---

## Problem

Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
Return k.

So here as well we just need to find a way to adjust the elements in the array such that the first k elements are not equal to val. But there should be a smart way to do this.



## Examples

```Example 1:
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

```Example 2:
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

So now lets get back to my excalidraw diagram. To be honest we don't need all these for this simple problem, but i am surrounded by distractions and i am trying to make this post a bit longer. So here we go.

![alt text](image.png)


![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

Very intuitively the code will look something like this with a simple loop:

```java
public int removeElement(int[] nums, int val) {
        int w=0;
        for(int r=0;r < nums.length;r++) {

            if(nums[r]!=val){
                nums[w]=nums[r];
                w++;
            }
        }
        return w;
}
```
Notice we used a for loop because read pointer is always moving forward. This for loop will be the right choice, because always the read pointer will move forward.

## Conclusion

This problem is very interesting for me because it will teach you how to think about the problem in a different way. The trick is to use two pointers, one for reading and one for writing. This is a common pattern in many problems, and it can help you solve problems more efficiently.

