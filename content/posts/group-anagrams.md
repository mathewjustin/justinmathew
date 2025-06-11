---
date: '2025-06-11T23:04:00+05:30'
draft: false
title: 'Grouping anagrams'
description: 'A medium but easy one!'
---

# Problem

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]

## Solution or Intuition

This doesn't really deseve my excalidraw diagram. But I will try to explain the logic here.

Simply take out one string, sort them and use it as a key in a map. 

The map structure will be like this:

```java
Map<String, List<String>> map = new HashMap<>();
```

Then for each string in the input array, sort it and add it to the map. 

```java

/**
 * @author Justin Mathew @dev_io
 */
public class Anagram {
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

### Time complexity: 

 For each string:
 
	1.	Sorting the string: O(K log K) for each string (since average string length is K)
	2.	Building the key and inserting into a map: O(1) amortized (hash map insert)


#### Across all strings: Total = N * O(K log K) Time Complexity: O(N * K log K)

### Space complexity:

	•	Map storage: Stores up to N strings → O(N * K)
	•	Sorted key strings: You generate sorted strings as keys → up to O(N * K)
	•	Final list of grouped anagrams: again O(N * K)

#### Space Complexity: O(N * K)

Yeah this is kind of nice. I like this solution. We can actually implement this with pure lambda but i cant do without an LLM at my disposal.