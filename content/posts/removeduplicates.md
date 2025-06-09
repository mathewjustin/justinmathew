---
date: '2025-06-10T23:02:39+05:30'
draft: false
title: 'removing duplicates from sorted array'
description: 'This is a medium level problem.'
---

# Problem

Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.


So if we look at this problem its almost same as the in place element removal. Almost all the logic is same. The only difference is that we need to keep track of the number of duplicates and remove them accordingly.

Refer: https://justinmathew.com/posts/inplace-element-removal/

I don't understand why this is a medium level problem. I think it should be easy. But anyway, lets get to the code.

### Examples

````
Example 1:

Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

Example 2:

Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
````
Now this is almost the same sh**. 

I am taking the same code copy pasting from our old one. Use a read and write pointer. 

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

Here read pointer will move through the array and write pointer will write the elements which are not equal to val. We also need to keep track of the number of duplicates, and essentially do the same thing with only difference that we will not write the element if it is already written twice. 

```java
public int removeElement(int[] nums, int val) {
        int w=0;
        for(int r=0;r < nums.length;r++) {
            if (w < 2 || nums[r] != nums[w - 2]) {
                nums[w] = nums[r];
                w++;
            }
        }
        return w;
}
````
 
The logic of this problem is simple. At every location check if the value on that location is same as 2 elements before it. If its not same, then write it there. If it is same, then skip it.

This is the best solution I could come up with. The only reason I thought of this solution is because I have alread solved the in place element removal problem. 