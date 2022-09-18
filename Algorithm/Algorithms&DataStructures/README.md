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
  - [Selection Sort Pseudocode](#selection-sort-pseudocode )
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
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    let j;

    for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j];
    }

    arr[j + 1] = currentVal;
  }

  return arr;
}
```

### Big O of Insertion Sort
* 거의 정렬된 상태에서는 효과가 좋지만 [4, 3, 2, 1] 같은 경우느 최악의 경우이다.
* 온라이넹서 실시간으로 번호를 제출하는 코드가 있고 이를 받아서 정렬한다고 가정할 때,
  * 삽입 정렬은 한 부분을 정렬된 배열로 유지하고,
  * 한 번씩 항목을 삽입하여 작동하기 때문에 어떤 숫자가 입력되더라도 필요한 위치에 놓으면 효율성이 좋다.

## 합병 정렬(Merge Sort)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%983.md#13-%ED%95%A9%EB%B3%91-%EC%A0%95%EB%A0%AC)

* It's a combination of two things - merging and sorting!
* Exploits the fact that arrays of 0 or 1 element are always sorted
* Works by decomposing an array into smaller arrays of 0 or 1 elements, then building up a newly sorted array

### Merging Arrays

* Create an empty array, take a look at the smallest values in each input array
* While there are still values we haven't looked at...
  * If the value in the first array is smaller than the value in the second array, push the value in the first array our results and move on to the next value in the first array
  * If the value in the first array is larger than the value in the second array, push the value in the second array into our results and move on to the next avlue in the second array
  * Once we exhaust one array, push in all remaing values from the other array

```js
function mergeArrays(arr1, arr2) {
  
}
```