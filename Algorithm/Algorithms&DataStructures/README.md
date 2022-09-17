# Algorithms & Data Structures

## 목차

- [문제 해결 패턴](#문제-해결-패턴)

## 문제 해결 패턴

### 빈도수 세기(Frequency Counters)

* This pattern uses objects or sets to collect values/frequencies of values. THis can often avoid the need for nested loops or O(n^2) operations with arrays/strings.

#### Example
Write a function called same, which accepts two arrays. The function sholud return true if every value in the array has it's corresponding value squared in the second array. The frequency of values must be the same.

```js
same([1, 2, 3], [4, 1, 9]); // true
same([1, 2, 3], [1, 9]); // false
same([1, 2, 1], [4, 4, 9]); // false (must be same frequency)
```
```js
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const frequencyCounter1 = {};
  const frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) return false;
    if (frequencyCounter1[key] !== frequencyCounter2[key ** 2]) return false;
  }

  return true;
}
```

### 빈도수 세기: 애너그램(Anagram) 도전 과제

Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.

```js
validAnagram("", ""); // true
validAnagram("aaz", "zza"); // false
validAnagram("anagram", "nagaram"); // true
validAnagram("rat", "car"); // false
validAnagram("awesome", "awesom"); // false
validAnagram("qwerty", "qeywrt"); // true
validAnagram("texttwisttime", "timetwisttext"); // true
```
```js
function validAnagram(first, second) {
  if (first.length !== second.length) return false;

  const lookup = {};
  let letter;
  for (let i = 0; i < first.length; i++) {
    letter = first[i];
    lookup[letter] = (lookup[letter] || 0) + 1;
  }
  for (let j = 0; j < second.length; j++) {
    letter = second[j];
    if (!lookup[letter]) return false; // lookup에 없으면 false;
    else lookup[letter] -= 1;
  }

  return true;
}
```

### 다중 포인터 패턴(Multiple Pointers)

Creating pointers or values that correspond to an index or position and move towards the beginning, end or middle based on a certain condition.  
Very efficient for solving problems with minimal space complexity as well

```js
sumZero([-3, -2, -1, 0, 1, 2, 3]); // [-3, 3]
sumZero([-2, 0, 1, 3]); // undefined
sumZero([1, 2, 3]); // undefined
```
```js
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  let sum;

  while (left < right) {
    sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--; // arr[right]의 값이 더 크니
    } else {
      left++; // arr[left]의 값이 더 크니
    }
  }
}
```

### 다중 포인터: 고유값 세는 도전(countUniqueValues)

Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array.   
There can be negative numbers in the array, but it will always be sorted.

```js
countUniqueValues([1, 1, 1, 1, 1, 2]); // 2
countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]); // 7
countUniqueValues([-2, -1, -1, 0, 1]); // 4
```
```js
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[counter]) arr[++counter] = arr[i];
  }

  return counter + 1;
}
```

### 기준점 간 이동 배열 패턴

#### Sliding Window

This pattern involves creating a window which can either e an array or nuber from one position to another. Depending on a certain confition, the window either increases or closes (and a new window is created).   
Very useful for keeping track of a subset of data in an array/string etc.

#### Example

Write a function called maxSubaaraySum which accepts an array of integers and a number called n.  
The function sould calculate the maximum sum of n consecutive elements in the array.

```
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2); // 10
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4); // 17
maxSubarraySum([4, 2, 1, 6], 1); // 6
maxSubarraySum([4, 2, 1, 6, 2], 4); // 13
maxSubarraySum([], 4); // null
```
```js
function maxSubarraySum(arr, num) {
  if (arr.length === 0) return null;

  let maxSum = 0;
  let tempSum = 0;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(tempSum, maxSum);
  }

  return maxSum;
}
```

### Example2

Write a functino called. minSubArrayLen which accepts two parameters - an array of positive integers and a positive interger.  
This function should return the minimal length of a **contiguous** subarray of which the sum if greater than or equal to the integer passed to the function . if there isn't one, return 0 instead.

```js
minSubArrayLen([2, 3, 1, 2, 4, 3], 7); // 2 -> because [4,3] is the smallest subarray
minSubArrayLen([2, 1, 6, 5, 4], 9); // 2 -> because [5,4] is the smallest subarray
minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52); // 1 -> because [62] is greater than 52
minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39); // 3
minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55); // 5
minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11); // 2
minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95); // 0
```
```js
function minSubArrayLen(arr, num) {
  let total = 0;
  let start = 0;
  let end = 0;
  let minLen = Infinity;

}
```

### 분할 정복 패턴(Divide and Conquer)

This pattern involves dividing a data set into smaller chucks and then repeating a process with a subset of data.  
This pattern can tremendously decrease time complexity.

#### Example

a function called search, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1

```js
search([1, 2, 3, 4, 5, 6], 4); // 3
search([1, 2, 3, 4, 5, 6], 6); // 5
search([1, 2, 3, 4, 5, 6], 11); // -1
```
```js
// 이진 탐색(Binary Search) - Time Complexity: O(log n)
function search(arr, val) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    middle = Math.floor((left + right) / 2);

    // 정렬된 배열에서 val이 더 크다는 것은 arr[middle] 기준 오른쪽에 있다는 것!
    if (arr[middle] < val) left = middle + 1;
    // 정렬된 배열에서 val이 더 작다는 것은 arr[middle] 기준 왼쪽에 있다는 것!
    else if (arr[middle] > val) right = middle - 1;
    // 값이 같다면 -> 인덱스 반환
    else return middle;
  }

  return -1;
}
```