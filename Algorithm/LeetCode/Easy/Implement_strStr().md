## Implement strStr()

> https://leetcode.com/problems/implement-strstr/  
> 2022. 8.30.(화)

Implement strStr().

Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Clarification:

What should we return when needle is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().

Constraints:

- 1 <= haystack.length, needle.length <= 104
- haystack and needle consist of only lowercase English characters.

```
Input: haystack = "hello", needle = "ll"
Output: 2

Input: haystack = "aaaaa", needle = "bba"
Output: -1
```

### 내가 푼 풀이

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (haystack.length === 1 && needle === haystack) return 0;

  for (let i = 0; i < haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      console.log(i, j, needle[j], haystack[j]);
      if (needle[j] !== haystack[i + j]) break;
      if (j === needle.length - 1) {
        return i;
      }
    }
  }  

  return -1;
};

strStr("hello", "ll");
```
Runtime: 67 ms, faster than 87.86% of JavaScript online submissions for Implement strStr().
Memory Usage: 41.9 MB, less than 61.81% of JavaScript online submissions for Implement strStr().
Next challenges:
이게 87.86%,,?

### 다른 분 솔루션
