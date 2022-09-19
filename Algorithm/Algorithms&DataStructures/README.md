# My Algorithms & Data Structures Cheat Sheet

## 목차

- [문제 해결 패턴](#문제-해결-패턴)
  - [빈도수 세기(Frequency Counters)](#빈도수-세기frequency-counters)
  - [빈도수 세기: 애너그램(Anagram) 도전 과제](#빈도수-세기-애너그램anagram-도전-과제)
  - [다중 포인터 패턴(Multiple Pointers)](#다중-포인터-패턴multiple-pointers)
  - [다중 포인터: 고유값 세는 도전(countUniqueValues)](#다중-포인터-고유값-세는-도전countuniquevalues)
  - [Sliding Window(기준점 간 이동 배열 패턴)](#sliding-window기준점-간-이동-배열-패턴)
  - [분할 정복 패턴(Divide and Conquer)](#분할-정복-패턴divide-and-conquer)
- [재귀(Recursion)](#재귀recursion)
  - [순수 재귀](#순수-재귀)
  - [Helper 메서드 재귀](#helper-메서드-재귀)
  - [Pure Recursion Tips](#pure-recursion-tips)
- [검색 알고리즘(Search Algorithm)](#검색-알고리즘search-algorithm)
  - [선형 검색(Linear Search)](#선형-검색linear-search)
  - [이진 검색(Binary Search)](#이진-검색binary-search)
- [버블 정렬(Bubble Sort)](#버블-정렬bubble-sort)
  - [Befor we sort, we must swap!](#befor-we-sort-we-must-swap)
  - [Bubble Sort Pseudocode](#bubblesort-pseudocode)
  - [BubbleSort 최적화](#bubblesort-최적화)
  - [Big O of BubbleSort](#big-o-of-bubblesort)
- [선택 정렬(Selection Sort)](#선택-정렬selection-sort)
  - [Selection Sort Pseudocode](#selection-sort-pseudocode)
  - [Big O of Selection Sort](#big-o-of-selection-sort)
- [삽입 정렬(Insertion Sort)](#삽입-정렬insertion-sort)
  - [Insertion Sort Pseudocode](#insertion-sort-pseudocode)
  - [Big O of Insertion Sort](#big-o-of-insertion-sort)
- [합병 정렬(Merge Sort)](#합병-정렬merge-sort)

## 문제 해결 패턴

### 빈도수 세기(Frequency Counters)

- This pattern uses objects or sets to collect values/frequencies of values. THis can often avoid the need for nested loops or O(n^2) operations with arrays/strings.

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

### Sliding Window(기준점 간 이동 배열 패턴)

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

## 재귀(Recursion)

- A process(a function in our case) that **calls itself**

### 순수 재귀

- 참고해야 할 사항
  - Can you spot the base case?(종료 조건이 보이는지)
  - Do you notice the different input?(다른 입력값이 있는지)
  - what would happen if we didnt' return?(return되지 않는다면 어떤 일이 일어나는지)

> [순수 재귀 문제 풀이](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%982.md#%EC%88%9C%EC%88%98-%EC%9E%AC%EA%B7%80)

```js
// Let's try to collect all of the odd values in array
function collectOddValues(arr) {
  let newArr = [];

  if (arr.length === 0) return newArr;
  if (arr[0] % 2 !== 0) newArr.push(arr[0]);

  newArr = newArr.concat(collectOddValues(arr.slice(1)));

  return newArr;
}
```

### Helper 메서드 재귀

재귀적이지 않은 외부 함수가 호출되면 재귀적인 내부 함수를 호출하는 패턴

```js
// Let's try to collect all of the odd values in array with helper function
function collectOddValues(arr) {
  let result = [];

  function helper(helperInput) {
    if (helperInput.length === 0) return;

    if (helperInput[0] % 2 !== 0) result.push(helperInput[0]);

    return helper(helperInput.slice(1));
  }
  helper(arr);

  return result;
}
```

### Pure Recursion Tips

- For arrays, use methods like `slice`, `the spread operator`, and `concat` that make copies of arrays so you do not mutate them
  - `slice`, `spread 연산자`, `concat` 같은 메서드를 사용하면 배열을 변경할 필요없이 일종의 결과를 축적할 수 있다.
- Remember that strings are immutable so you will need to use methods like `slice`, `substr` or `substring` to make copies of strings
  - 문자열은 변경할 수 없으므로 `slice`나 `substring`을 사용해서 사본을 만들어야 한다.
- To make copies of objects use `Object.assign`, or `the spread operator`
  - 객체의 경우, `Object.assign`이나 `spread 연산자`를 사용하는 것이 유용하다.

#### 배열 재귀 문제

> [flatten](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%982.md#flatten)

```js
// flatten([1, 2, 3, [4, 5]]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]

function flatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) result = result.concat(flatten(arr[i]));
    else result.push(arr[i]);
  }

  return result;
}
```

## 검색 알고리즘(Search Algorithm)

### 선형 검색(Linear Search)

- There are many different serach methods on arrays in JavaScript!
  - indexOf, includes, find, findIndex, ...

#### Big O of Linear Search

- Best Case - O(1)
  - 찾고자하는 단어가 0번 인덱스에 있는 경우
- Average Case - O(n)
  - 전체를 엘리먼트 하나씩 돌면서 찾아야 하므로 **광범위한 경향**을 살펴보면 O(n)이다.
- Worst Case - O(n)
  - 항목에 100만 개 있으면 찾고자하는 단어가 (100만 - 1)번째 인덱스 있는 경우 100만번 검색할 수도 있다.
  - 즉, n이 증가할수록 배열의 길이나 문자열 등 우리가 사용하는 데이터의 길이, 평균 소요 시간도 길어진다.
  - 이 방법은 데이터가 분류되지 않았을 때 사용할 수 있는 가장 좋은 방법이다.

### 이진 검색(Binary Search)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%982.md#%EC%9D%B4%EC%A7%84-%EA%B2%80%EC%83%89-%EC%86%8C%EA%B0%9C)

- Binary search is a much faster form of search
- Rather than eliminating one element at a time, you can eliminate **half** of the remaining elements at a time
- Binary search only works on `sorted arrays`!

#### Binary Search Pseudocode

- This function accepts a sorted array and a value
- Create a left pointer at the start of the array, and a right pointer at the end of the array
- While the left pointer comes before the right pointer
- Create a pointer in the middle
- If you never find the value, return -1

```js
function binarySearch(arr, value) {
  let start = 0;
  let end = arr.length - 1;
  let middle;

  while (start <= end) {
    middle = Math.floor((start + end) / 2);

    if (arr[middle] < value) start = middle + 1; // 찾을 value가 오른쪽에 있음
    else if (arr[middle] > value) end = middle - 1; // 찾을 value가 왼쪽에 있음
    else return middle; // 찾음
  }

  return -1;
}
```

## 버블 정렬(Bubble Sort)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%982.md#10-%EB%B2%84%EB%B8%94-%EC%A0%95%EB%A0%AC)

A sorting algorithm where the largest values bubble up to the top!

### Befor we sort, we must swap!

Many sorting algorithms involve some type of swapping function

```js
// ES5
function swap(arr, idx1, idx2) {
  var temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

// ES6
const swap = (arr, idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2]. arr[idx1]];
}
```

### BubbleSort Pseudocode

- Start looping from with a variable called `i` the end of the array towards the beginning
- Start an inner loop with a variable called `j` from the beginning util `i - 1`
- If arr[j] is greater than arr[j + 1], swap those two values!
- Return the sorted array

```js
function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}
```

### BubbleSort 최적화

```js
function bubbleSort(arr) {
  let noSwaps;

  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;

    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }

    if (noSwaps) break;
  }

  return arr;
}
```

- 배열이 모두 정렬된 상태인데도 루프를 돌아야 하는 경우가 발생하기 때문에 `noSwaps` 변수를 사용해서 코드 실행을 줄일 수 있다.

### Big O of BubbleSort

- 중첩 루프가 있으므로 일반적으로 `O(n^2)`이다.
- 그러나 데이터가 거의 정렬됐거나 이미 정렬이 끝난 상태에서 `noSwaps` 변수가 있는 신규버전을 사용할 때는 `선형 시간(linear time)`가 최고의 경우고, 일반적으로는 `O(n^2)`이다.

## 선택 정렬(Selection Sort)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%982.md#11-%EC%84%A0%ED%83%9D-%EC%A0%95%EB%A0%AC)

Similar to bubble sort, but instead of first placing large values into sorted position, it places small values into sorted position

### Selection Sort Pseudocode

- Store the first element as the smallest value you've seen so far
- Compare this item to the next item in the array until you find a smaller number
- If a smaller number is found, designate that smaller number to be the new **minimum** and continue until the end of the array
- If the **minimum** is not the value (index) you initially began with, swap the two values
- Repeat this with the next element until the array is sorted

```js
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) lowest = j;
    }

    if (i !== lowest) {
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;
    }
  }

  return arr;
}
```

### Big O of Selection Sort

- 모든 요소를 배열 속 다른 요소 모두와 비교해야 하므로 배열의 길이가 길어질 때 비교 횟수도 n제곱 비율로 늘어나매우 효율적이지 않다.
- 선택 정렬이 버블 정렬보다 더 나은 시나리오는 딱 하나이다.
  - 어떤 이유나 상황으로 스왑 수를 최소화하는 경우

## 삽입 정렬(Insertion Sort)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%982.md#insertion-sort)

Builds up the sort by gradually creating a larger left half which always sorted.  
한 번에 하나의 항목을 올바른 위치에 삽입해서 배열의 정렬된 부분을 점진적으로 구축해 나간다.

### Insertion Sort Pseudocode

- Start by picking the second element in the array
- Now compare the second element with the one before it and swap if neccessary
- Continue to the next element and if it is the incorrect order, iterate through the sorted portion (i.e. the left side) to place the element in the correct place
- Repeat until the array is sorted

```js
function insertSort(arr) {
  // 두 번째 요소부터 시작
  for (let i = 1; i < arr.length; i++) {
    // 앞에 있는 요소보다 작으면 swap하고 또 그 앞에 있는 요소와 비교, 아니면 그대로 두고 끝
    let currentVal = arr[i];
    let j;
    // arr[j]가 currentVal보다 작은 시점에서 루프가 종료되도록 조건문 설정
    for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j]; // swap
    }
    arr[j + 1] = currentVal; // j-- 이후 루프를 빠져나오기 때문에 j + 1을 해줘야 한다.
  }
}
```

### Big O of Insertion Sort

- 거의 정렬된 상태에서는 효과가 좋지만 [4, 3, 2, 1] 같은 경우느 최악의 경우이다.
- 온라이넹서 실시간으로 번호를 제출하는 코드가 있고 이를 받아서 정렬한다고 가정할 때,
  - 삽입 정렬은 한 부분을 정렬된 배열로 유지하고,
  - 한 번씩 항목을 삽입하여 작동하기 때문에 어떤 숫자가 입력되더라도 필요한 위치에 놓으면 효율성이 좋다.

## 합병 정렬(Merge Sort)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%983.md#13-%ED%95%A9%EB%B3%91-%EC%A0%95%EB%A0%AC)

- It's a combination of two things - merging and sorting!
- Exploits the fact that arrays of 0 or 1 element are always sorted
- Works by decomposing an array into smaller arrays of 0 or 1 elements, then building up a newly sorted array

### Merging Arrays

- Create an empty array, take a look at the smallest values in each input array
- While there are still values we haven't looked at...
  - If the value in the first array is smaller than the value in the second array, push the value in the first array our results and move on to the next value in the first array
  - If the value in the first array is larger than the value in the second array, push the value in the second array into our results and move on to the next avlue in the second array
  - Once we exhaust one array, push in all remaing values from the other array

```js
function merge(arr1, arr2) {
  let results = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

  return results;
}
```

### mergeSort

- Break up the array into halves until you have arrays that are empty or have one element
- Once you have smaller sorted arrays, merge those arrays with other sorted arrays until you are back at the full length of the array
- Once the array has been merged back together, return the merged (and sorted) array

```js
function merge(arr1, arr2) {
  let results = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

  return results;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}
```

### Big O of MergeSort

- 입력값이 무엇이든 이미 정렬되어 있든, 거꾸로 되어 있든, 모두 무작위든 상관없이 계속 나누고 나눈 다음에 합치고 또 합친다.
- Time Complexity
  - Best Case - O(n log n)
  - Average Case - O(n log n)
  - Worst Case - O(n log n)
- Space Complexity - O(n)
- O(log n) decompositions \* O(n) comparsions per decomposition

## 퀵 정렬(Quick Sort)

- Like merge sort, exploits the fact that arrays of 0 or 1 element are always sorted
- Works by selecting one element (called the `pivot`) and finding the index where the pivot should end up in the sorted array
- Once the pivot is positioned approprivately, quick sort can be applied on either side ot the pivot

### Pivot Helper

- In order to implement merge sort, it's useful to first implement a function responsible arranging elements in an array on either side of a pivot
- Given an array, this helper function should deginate an element as the pivot
- It should then rearrange elements in the array so that all values less than the pivot are moved to the left of the pivot, and all values greater than the pivot are moved to the right of the pivot
- The order of elements on either side if the pivot doesn't matter!
- The helper should do this **in place**, that is, it should not create a new array
- When complete, the helper should return the index of the pivot

#### Picking a pivot

- the runtime of quick sort depends in part on how one selects the pivot
- Ideally, the pivot should be chosen so that it's roughly the median value in the data set you're sorting
- For simplicity, we'll always choose the pivot to be the first element (we'll talk about consequences of this later)

### Pivot

- It will help to accept three arguments: an array, a start index, and an end index (these can default to 0 and the array length minus 1, respectively)
- Grab the pivot from the start of the array
- Store the current pivot index in a variable (this will keep track of where the pivot should end up)
- Loop through the array from the start until the end
- Swap the starting element (i.e. the pivot) with the pivot index
- Return the pivot index

```js
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function pivot(arr, start = 0, end = arr.length - 1) {
  let pivot = arr[start];
  let swapIdx = start; // 스왑 인덱스는 피벗이 맨 마지막에 어디로 옮길지 추적

  // 첫 번째 항목 뺴고 루프 수행
  for (let i = start + 1; i < arr.length; i++) {
    // 피벗 비교 (피벗이 해당 요소보다 클 경우 스왑!)
    if (pivot > arr[i]) {
      swapIdx++;
    }
  }
  swap(arr, start, swapIdx);

  return swapIdx;
}
```

### QuickSort

- Call the pivot helper on the array
- When the helper returns to you the updated pivot index, recursively call the pivot helper on the subarray to the left of that index, and the subarray to the right of that index
- Your base case occurs when you consider a subarray with less than 2 elements

```js
function quickSort(arr, left = 0, right = arr.length - 1) {
  console.log(arr);
  // if문 조건에 base case 설정
  if (left < right) {
    let pivotIndex = pivot(arr, left, right);

    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }

  return arr;
}
```

### Big O of QuickSort

- O(log n) decompositions \* O(n) comparisions per decomposition
  - 합병 정렬처럼 log n의 비율로 분할할 개수가 늘어나고, 각 분해하는 단계마다 O(n)번의 비교 수행을 해야 한다.
- Worst Case - O(n^2)
  - 데이터가 이미 정렬되어 있는 경우 가장 안좋다.

## 기수 정렬(Radix Sort)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%983.md#15-%EA%B8%B0%EC%88%98-%EC%A0%95%EB%A0%ACradix-sort)

- Radix Sort is a special sorting algorithm that works on lists of numbers
- It never makes comparisons between elements!
- It exploits the fact that information about the size of a number is encoded in the number of digits
- More digits means a bigger number!
- 비교 정렬에 비해 아주 빠르게 정렬할 수 있다.

### Radix Sort Helpers

- In order to implement radix sort, it's helpful to build a few helper functions first:

  - getDigit(num, place) - returns the digit in num at the given place value
    ```js
    function getDigit(num, i) {
      return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
    }
    ```
  - digitCount(num) - returns the number of digits in num
    ```js
    function digitCount(num) {
      if (num === 1) return 1; // 0에 로그 계산(log10)을 수행하면 -Infinity를 얻는다.
      return Math.floor(Math.log10(Math.abs(num))) + 1;
    }
    ```
  - mostDigits(nums) Given an array of numbers, returns the number of digits in the largest numbers in the list

    ```js
    function mostDigits(arr) {
      let maxDigits = 0;
      for (let i = 0; i < arr.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(arr[i]));
      }

      return maxDigits;
    }
    ```

    - 재귀나 복잡한 로직을 짤 필요없이 해당 함수를 사용해서 루프를 수행해 나눈 다음 버킷에 집어넣고 다시 묶은다음 n번 반복하면 된다.
      - n은 이 때 최대 자릿수!

### Radix Sort Pseudocoe

- Define a function that accepts list of numbers
- Figure out how many digits the largest number has
- Loop from k = 0 up to this largest number of digits
- For each iteration of the loop:
  - Create buckets for each digit (0 to 9)
  - Place each number in the corresponding bucket based on its _kth_ digit

### Radix Sort Implement

```js
function getDigits(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
  // i가 0일 때 1의 자릿수를 반환한다. 따라서 자릿수 개수 이상되면 0 반환.
}

function digitCount(num) {
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []); // 2차원 배열(Bucket 만들기)

    for (let i = 0; i < nums.length; i++) {
      let digit = getDigits(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    console.log(digitBuckets);
    nums = [].concat(...digitBuckets);
  }

  return nums;
}
```

## 단방향 연결 리스트(Singly Linked Lists)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%983.md#17-%EB%8B%A8%EB%B0%A9%ED%96%A5-%EC%97%B0%EA%B2%B0-%EB%A6%AC%EC%8A%A4%ED%8A%B8singly-linked-lists)

- A data structure that contains a head, tail and length property.
- Linked Lists consist of nodes, and each node has a value and a pointer to another node or null.

### Comparisons with Arrays

- **Lists**
  - Do not have indexes!
  - Connected via `nodes` with **a next pointer**
  - Random access is not allowed(열 번째 항목이 필요한 경우 바로 그 값을 얻을 수 없다는 의미)
- **Arrays**
  - Indexed in order!
  - Insertion and deletion can be expensive
  - Can quickly be accessed at a specific index(인덱스 접근이 빠름)

### Singly Linked Lists Implement

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 두 번째부터 새 노드를 tail의 next를 가리키게 하고, tail을 새 노드로 업데이트
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;

    return this;
  }

  pop() {
    if (!this.head) return undefined; // 노드가 없는 경우
    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current; // current가 마지막 노드가 될 때 newTail은
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current; // 마지막 노드 반환
  }

  shift() {
    if (!this.head) return undefined;

    let currentHead = this.head;
    this.head = currentHead.next;
    currentHead.next = null;
    this.length--;
    if (this.length === 0) this.tail = null;

    return currentHead;
  }

  unshift(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;

    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;

    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }

    return current;
  }

  set(index, value) {
    const foundNode = this.get(index);

    if (foundNode) {
      foundNode.value = value;
      return true;
    }
    // null 반환하면
    return false;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(value);
    if (index === 0) return !!this.unshift(value); // true로 치환하기 위해 !! 사용

    const newNode = new Node(value);
    let prevNode = this.get(index - 1); // index - 1 해줘야 원하는 index에 노드가 삽입된다.
    let nextNode = prevNode.next;
    prevNode.next = newNode;
    newNode.next = nextNode;
    this.length++;

    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.get(index - 1);
    const removed = prevNode.next;
    prevNode.next = removed.next;
    removed.next = null;
    this.length--;

    return removed;
  }

  reverse() {
    // head와 tail swap!
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return this;
  }
}

const list = new SinglyLinkedList();
list.push("a");
list.push("b");
list.push("c");
list.push("d");
```

### Big O of Singly Linked Lists

- Insertion - O(1)
- Removal - It depends on... O(1) or O(n)
- Searching - O(n)
- Access - O(n)
- 단방향 연결 리스트가 삽입과 삭제의 경우 배열에 비해 우수하기 때문에 그러한 작업을 주로 해야 한다거나, 임의 접근 작업이 필요없다거나, 주어진 순서대로 데이터를 관리할 필요가 있는 경우, 배열 보다는 단방향 연결 리스트가 적절하다고 할 수 있다.

## 이중 연결 리스트(Doubly Linked Lists)
