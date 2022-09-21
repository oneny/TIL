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
  - [Merging Arrays](#merging-arrays)
  - [mergeSort](#mergesort)
  - [Big O of MergeSort](#big-o-of-mergesort)
- [퀵 정렬(Quick Sort)](#퀵-정렬quick-sort)
- [Pivot Helper](#pivot-helper)
- [Picking a pivot](#picking-a-pivot)
- [Pivot](#pivot)
- [QuickSort](#quicksort)
- [Big O of QuickSort](#big-o-of-quicksort)
- [기수 정렬(Radix Sort)](#기수-정렬radix-sort)
  - [Radix Sort Helpers](#radix-sort-helpers)
  - [Radix Sort Pseudocoe](#radix-sort-pseudocoe)
  - [Radix Sort Implement](#radix-sort-implement)
- [단방향 연결 리스트(Singly Linked Lists)](#단방향-연결-리스트singly-linked-lists)
  - [Comparisons With Arrays](#comparisons-with-arrays)
  - [Singly Linked Lists Implement](#singly-linked-lists-implement)
  - [Big O of Singly Linked Lists](#big-o-of-singly-linked-lists)
- [이중 연결 리스트(Doubly Linked Lists)](#이중-연결-리스트doubly-linked-lists)
  - [Big O of Doubly Linked Lists](#big-o-of-doubly-linked-lists)
- [스택(Stack)과 큐(Queues)](#스택stack과-큐queues)
  - [Stack](#stack)
  - [Big O of Stacks](#big-o-of-stacks)
  - [Queue](#queue)
  - [Big O of Queues](#big-o-of-queues)
- [이진 검색 트리(Binary Search Tree)](#이진-검색-트리binary-search-tree)
  - [What is a Tree?](#what-is-a-tree)
  - [Kinds of Trees](#kinds-of-trees)
  - [Binary Search Tree](#binary-search-tree)
  - [Big O of Binary Search Trees](#big-o-of-binary-search-trees)
- [트리 순회(Traversing a Tree)](#트리-순회traversing-a-tree)
  - [Two Ways of Traversing a Tree](#two-ways-of-traversing-a-tree)
  - [Breath-first Search(너비 우선 탐색)](#breath-first-search너비-우선-탐색)
  - [Depth-first Search(깊이 우선 탐색)](#depth-first-search깊이-우선-탐색)
  - [BFS? DFS? Which is better?](#bfs-dfs-which-is-better)
- [이진 힙(Binary Heaps)](#이진-힙binary-heaps)
  - [Max Binary Heap](#max-binary-heap)
  - [Priority Queue](#priority-queue)
  - [Big O of Binary Heap](#big-o-of-binary-heap)
- [해시 테이블(Hash Table)](#해시-테이블hash-table)
  - [Big O of Hash Tables](#big-o-of-hash-tables)
- [그래프(Graph)](#그래프graph)
  - [Essential Graph Terms](#essential-graph-terms)
  - [Differences between Adjacency List and Adjancency Matrix](#differences-between-adjacency-list-and-adjancency-matrix)
  - [Graph](#graph)
- [그래프 순회(Traversing a Graph)](#트리-순회traversing-a-tree)
  - [DFS & BFS](#dfs--bfs)
- [다익스트라 알고리즘(Dijkstra's Algorithm)](#다익스트라-알고리즘dijkstras-algorithm)
  - [Write a Weighted Graph](#write-a-weighted-graph)
  - [The Approach](#the-approach)
  - [Dijkstra's Pseudocode](#dijkstras-pseudocode)
  - [Dijkstra's Algorithm Implement](#dijkstras-algorithm-implement)
  - [Upgrade PriorityQueue](#upgrade-priorityqueue)
- [동적 프로그래밍(Dynamic Programming)](#동적-프로그래밍dynamic-programming)
  - [Overlapping SubProblems(중복되는 하위문제)](#overlapping-subproblems중복되는-하위문제)
  - [Optimal SubStructure(최적 부분 구조)](#optimal-substructure최적-부분-구조)
  - [Enter Dynamic Programming](#enter-dynamic-programming)
  - [Memorization](#memorization)
  - [타뷸레이션(Tabulation): 상향식 접근](#타뷸레이션tabulation-상향식-접근)
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

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%983.md#18-%EC%9D%B4%EC%A4%91-%EC%97%B0%EA%B2%B0-%EB%A6%AC%EC%8A%A4%ED%8A%B8doubly-linked-lists)

- Singly Linked Lists에서 뒤를 가리키는 포인터도 있다!
  - But, **More memory === More Flexibility**

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedLists {
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
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;

    return this;
  }

  pop() {
    if (!this.head) return undefined;

    const poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;

    return poppedNode;
  }

  shift() {
    if (!this.length === 0) return undefined;

    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;

    return oldHead;
  }

  unshift(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;

    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;

    // this.length / 2가 index보다 크면 왼쪽부터, 아니면 오른쪽부터
    let count, current;
    if (index <= this.length / 2) {
      count = 0;
      current = this.head;
      while (count !== index) {
        current = current.next;
        count++;
      }
    } else {
      count = this.length - 1;
      current = this.tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
    }

    return current;
  }

  set(index, value) {
    const foundNode = this.get(index);
    if (foundNode) {
      foundNode.value = value;
      return true;
    }

    return false; // get(index)에서 null 반환하면 false 반환
  }

  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const newNode = new Node(value);
    const beforeNode = this.get(index - 1); // 중간에 넣어야하기 때문에 index - 1
    const afterNode = beforeNode.next;
    // beforeNode와 newNode 관계
    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    // afterNode와 newNode 관계
    afterNode.prev = newNode;
    newNode.next = afterNode;
    this.length++;

    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const removedNode = this.get(index);
    const beforeNode = removedNode.prev;
    const afterNode = removedNode.next;
    // beforeNode와 afterNode 관계
    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;

    return removedNode;
  }
}
```

### Big O of Doubly Linked Lists

- Insertion - O(1)
- Removal - O(1)
- Searching - O(n)
- Access - O(n)
- Technically Searching is `O(n/2)`, but that's still `O(n)`

## 스택(Stack)과 큐(Queues)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms%26DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%26%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%984.md#19-%EC%8A%A4%ED%83%9Dstack%EA%B3%BC-%ED%81%90queues)

### Stack

- A **LIFO** Data Structure
  - The last element added to the stack will be the first element removed from the stack

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const temp = this.first;
      this.first = newNode;
      newNode.next = temp;
    }

    return ++this.size;
  }

  pop() {
    if (!this.first) return null;

    const poppedNode = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;

    return poppedNode.value;
  }
}
```

### Big O of Stacks

- Insertion - O(1)
- Removal - O(1)
- Searching - O(n)
- Access - O(n)

### Queue

- A **FIFO** Data Structure
  - Queues are useful for processing tasks and are foundational for complex data structures

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;

    const dequeuedNode = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;

    return dequeuedNode.value;
  }
}
```

### Big O of Queues

- Insertion - O(1)
- Removal - O(1)
- Searching - O(n)
- Access - O(n)
- Insertion and Removal can done in **O(1)**

## 이진 검색 트리(Binary Search Tree)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%984.md#20-%EC%9D%B4%EC%A7%84-%EA%B2%80%EC%83%89-%ED%8A%B8%EB%A6%ACtrees)

### What is a Tree?

- A data structure that consists of nodes in a **parent / child** relationship
  - **Lists** - linear(선형 구조)
  - **Trees** - nonlinear(비선형 구조)
- Tree Terminology
  - **Root** - The top node in a tree
  - **Child** - A node directly connected to another node when moving away from the Root
  - **Parent** - The converse notion of a child
  - **Siblings** - A group of nodes with the same parent
  - **Leaf** - A node with no children
  - **Edge** - The connection between one node and another

### Kinds of Trees

- Trees - 자식이 몇 개든 상관X
- Binary Trees - 각 노드가 최대 두 개의 자식을 가져야 하는 특별한 조건이 있다.
- Binary Search Trees - 특별한 방식으로 데이터가 순서대로 정렬된 이진 트리의 종류 중 하나
  - Every parent node has at most **two** children
  - Every node to the left of a parent node is **always less** than the parent
  - Every node to the right of a parent node is **always greater** than the parent

### Binary Search Tree

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (value === current.value) return undefined;
        if (value < current.value) {
          // 현재 위치한 노드의 왼쪽 자식에 노드가 없는 경우
          if (!current.left) {
            current.left = newNode;
            return this;
          }
          // 현재 위치한 노드의 왼쪽 자식에 노드가 있는 경우
          current = current.left;
        } else {
          // 현재 위치한 노드의 오른쪽 자식에 노드가 없는 경우
          if (!current.right) {
            current.right = newNode;
            return this;
          }
          // 현재 위치한 노드의 오른쪽 자식에 노드가 있는 경우
          current = current.right;
        }
      }
    }
  }

  find(value) {
    if (this.root === null) return false;
    let current = this.root;
    let found = false;

    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return false;

    return current;
  }

  // true, false 값만 반환하는 메서드
  contains(value) {
    if (this.root === null) return false;
    let current = this.root;
    let found = false;

    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true;
      }
    }

    return false;
  }
}
```

### Big O of Binary Search Trees

- Insertion - **O(log n)**
- Searching - **O(log n)**
- 이미 데이터를 insert할 때 O(log n)으로 위치를 찾아 정렬하기 때문에 Search할 때도 O(log n) 시간 복잡도로 데이터를 찾는다.
- **But, NOT guaranteed**
  - 이진 탐색 트리는 평균적인 경우와 최고의 경우에 트리가 가지는 시간 복잡도는 O(log n)이다.
  - 최악의 경우
    - 3 -> 17 -> 19 -> 32 -> 34 -> 86 -> 91 -> ...로 리스트처럼 한쪽으로 가지가 치우진 경우
    - 그러면 완전히 한 쪽으로 쏠린 트리에 대해서 **O(n)**의 값을 가지게 된다.

## 트리 순회(Traversing a Tree)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%984.md#21-%ED%8A%B8%EB%A6%AC-%EC%88%9C%ED%9A%8C)

### Two Ways of Traversing a Tree

- Breath-first Search(너비 우선 탐색)
- Depth-first Search(깊이 우선 탐색)
  - InOrder(중위 순회)
  - PreOrder(전위 순회)
  - PostOrder(후위 순회)

### Breath-first Search(너비 우선 탐색)

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  BFS() {
    let node = this.root;
    const data = [];
    const queue = [];
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }
}
const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
tree.BFS(); // [10, 6, 15, 3, 8, 20]
```

### Depth-first Search(깊이 우선 탐색)

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (value === current.value) return undefined;
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            return this;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            return this;
          }
          current = current.right;
        }
      }
    }
  }

  DFSPreOrder() {
    const data = [];

    let current = this.root; // 사용자가 시작하기를 원하는 노드가 있는 경우 current 변수 사용
    function traverse(node) {
      data.push(node);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(current);

    return data;
  }

  DFSPostOrder() {
    const data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value); // 노드의 값만 가져오고 싶으면 node.value
    }
    traverse(this.root);

    return data;
  }

  DFSInorder() {
    const data = [];

    function traverse(node) {
      node.left && traverse(node.left); // if문 다르게 표현
      data.push(node);
      node.right && traverse(node.right);
    }
    traverse(this.root);

    return data;
  }
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
tree.DFSPreOrder(); // [10, 6, 3, 8, 15, 20]
tree.DFSPostOrder(); // [3, 8, 6, 20, 15, 10]
tree.DFSInOrder(); // [3, 6, 8, 10, 15, 20]
```

### BFS? DFS? Which is better?

#### **BFS**

- 100 레벨 정도 깊이 내려가야 하는 경우나 트리가 BFS에서 큐에 엄청난게 많은 데이터가 저장되기 떄문에 무리일 수 있다.
- 만약, 리스트처럼 한 쪽으로 치우진 경우면 한 레벨에 한 노드만 큐에 있게 돼서 DFS보다 낫다.
  - 한 줄로 치우지면 DFS 경우 스택이 많이 쌓여 좋지 않다.

#### **DFS**

- **InOrder** - 트리에 있는 모든 노드들을 오름차순으로 구할 수 있다.
- **PreOrder** - 트리를 복사하거나 Linear시켜 저장하는 경우(파일이나 DB에 저장하기 위해) 다시 연쇄 구조로 만들어 낼 때 도움이 된다.

## 이진 힙(Binary Heaps)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%984.md#22-%EC%9D%B4%EC%A7%84-%ED%9E%99binary-heaps)

**Very** similar to a binary search tree, but with some different rules!  
In a **MaxBinaryHeap**, parent nodes are always larger than child nodes.  
In a **MinBinaryHeap**, parent nodes are always smaller than child nodes

- For any index of an array `n`...
  - The left child is stored at `2n + 1`
  - The right child is at `2n + 2`
- For any child node at index `n`...
  - Its parent is at index `(n - 1) / 2`

### Max Binary Heap

- Each parent has at most two child nodes
- The value of each parent node is **always** greater than its child nodes
- In a max Binary Heap, the parent is greater than the children, but there are no guarantees between sibling nodes
  - **No Implied Ordering Between Slibings**
- A binary heap is as compact as possible. All the children of each node are as full as they can be an left children are filled out first

```js
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    let element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element <= parent) break;

      // 자식이 더 큰 경우 Swap!
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      // 하나 남으면 pop해도 this.values[0] = end; 때문에 제거되지 않아 조건문 설정
      this.values[0] = end;
      this.sinkDown();
    }

    return max;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[idx];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

const heap = new MaxBinaryHeap();
// ex) [41, 39, 33, 18, 27, 12]에 heap.insert(55) 실행
// 결과: [55, 39, 41, 18, 27, 12, 33] -> extraMax()하면 원래대로 돌아옴
```

### Priority Queue

A data structure where each element has a priority.  
Elements with high priorities are served before elements with lower priorities.

- Write a Min Binary Heap - lower number meas higher priority
- Each Node has a value and a priority. Use the priority to build the heap
  - Value doesn't matter. Heap is constructed **using Priority!**
- `Enqueue` method accepts a value and priority, makes a new node, and puts it in the right spot based off of its priority
- `Dequeue` method removes root element, returns it, and rearranges heap using priority

```js
class Node {
  constructor(value, priority) {
    this.values = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (element.priority >= parent.priority) break;

      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];

        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];

        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

const ER = new PriorityQueue();
ER.enqueue("common cold", 5);
ER.enqueue("gunshot wound", 1);
ER.enqueue("hight fever", 4);
ER.enqueue("broken arm", 2);
ER.enqueue("glass in foot", 3);
```

### Big O of Binary Heap

- 이진 힙은 최대 힙이든 최소 힙이든 삽입과 삭제에 있어서 아주 성능이 좋다!
  - Insertion - **O(log n)**
  - Removal - **O(log n)**
  - Search - **O(n)**

#### Why log(n)?

- 삽입할 때 16개 요소나 노드가 있으면 최대 4번의 비교로 새로 들어온 요소나 노드를 위치시킬 수 있기 때문이다!
  - 깊이는 4레벨까지 있고, 루트까지 비교하는데 최대 4번!

#### What about worst case?

- Binary Heap은 Binary Search Tree와 달리 왼쪽부터 채워지기 때문에 최악의 경우도 **O(log n)**이다!
  - 이진 힙은 탐색을 위한 것이 아니다!

## 해시 테이블(Hash Table)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%984.md#23-%ED%95%B4%EC%8B%9C-%ED%85%8C%EC%9D%B4%EB%B8%94hash-tables)

Hash tables are used to store _key-value_ pairs. They are like arrays, but the keys are not ordered/
Unlike arrays, hash tables are _fast_ for all of the following operations: finding values, adding new values, and removing values!

```js
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96; // a -> 1, b -> 2, ...
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }

    return total;
  }

  set(key, value) {
    let index = this._hash(key);

    // 해당 위치에 key-value pair가 없는 경우(처음으로 해당 위치에 key-value가 들어가는 경우)
    if (!this.keyMap[index]) {
      this.keyMap[index] = []; // separate chaining을 위해 이차원 배열로 만들기
    }
    this.keyMap[index].push([key, value]);

    return this;
  }

  get(key) {
    let index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) return this.keyMap[index][i][1];
      }
    }

    return undefined;
  }

  values() {
    let valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          // 중복 처리
          if (!valuesArr.includes(this.keyMap[i][j][1]))
            valuesArr.push(this.keyMap[i][j][1]);
        }
      }
    }

    return valuesArr;
  }

  keys() {
    let keysArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!keysArr.includes(this.keyMap[i][j][0]))
            keysArr.push(this.keyMap[i][j][0]);
        }
      }
    }

    return keysArr;
  }
}

let ht = new HashTable();
ht.set("maroon", "#800000");
ht.set("yellow", "#FFFF00");
ht.set("olive", "#808000");
ht.set("salmon", "#FA8072");
ht.set("lightcoral", "#F08080");
ht.set("mediumvioletred", "#C71585");
ht.set("plum", "#DDA0DD");
```

### Big O of Hash Tables

- Average Case
  - Insertion: O(1)
  - Deletion: O(1)
  - Access: O(1)
  - 위 빅오는 해시 함수가 얼마나 빠른지, 그리고 얼마나 고르게 데이터를 분배해서 충돌의 횟수를 줄이는지에 달려있다.
- Worst Case
  - 한 인덱스에 모든 것을 넣는 경우 -> O(n)
  - 이런 상황이 온다면 무언가를 가져오거나, 삽입하거나, 맨 뒤에서 제거를 하는 경우에는 n의 시간이 걸린다.
  - 해시 함수 자체가 상수의 시간을 가진다고 리스트와 다름없기 때문이다.

## 그래프(Graph)

A **graph data structure** consists of a finite (and possibly mutable) set of vertices or nodes or points, together with a set of unordered pairs of these vertices for an **undirected graph** or a set of ordered pairs for a **directed graph**

### Essential Graph Terms

- **Vertex(정점)** - a node
- **Edge(간선)** - connection between nodes
- **Weighted/Unweighted(가중/비가중)** - values assigned to dstances between vertices
- **Directed/Undirected(방향/무방향)** - directions assigned to distanced between vertices

### Differences between Adjacency List and Adjancency Matrix

- V - number of vertices(정점의 개수)
- E - number of edges(간선의 개수)

| OPERTAION     | ADJACENCY LIST | ADJACENCY MATRIX |
| ------------- | -------------- | ---------------- |
| Add Vertex    | O(1)           | O(V^2)           |
| Add Edge      | O(1)           | O(1)             |
| Remove Vertex | O(V + E)       | O(V^2)           |
| Remove Edge   | O(E)           | O(1)             |
| Query         | O(V + E)       | O(1)             |
| Storage       | O(V + E)       | O(V^2)           |

#### Adjacency List

- Can take up less space (in sparse graphs)
- Faster to iterate over all edges
- Can be slower to loopup specific edge
- Most data in the real-world tends to lend itself to sparser and/or larger graphs

#### Adjacency Matrix

- Takes up more space (in sparse graphs)
- Slower to iterate over all edges
- Faster to lookup specific edge

### Graph

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    // 정점으로 추가하면서 값으로 노드들간의 관계를 연결할 새로운 배열을 설정
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacencyVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacencyVertex);
    }

    delete this.adjacencyList[vertex];
  }
}

const g = new Graph();
g.addVertex("Dallas");
g.addVertex("Tokyo");
g.addVertex("Aspen");
g.addVertex("Los Angeles");
g.addVertex("Hong Kong");
g.addEdge("Dallas", "Tokyo");
g.addEdge("Dallas", "Aspen");
g.addEdge("Hong Kong", "Tokyo");
g.addEdge("Hong Kong", "Dallas");
g.addEdge("Los Angeles", "Hong Kong");
g.addEdge("Los Angeles", "Aspen");
```

## 그래프 순회(Traversing a Graph)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%984.md#25-%EA%B7%B8%EB%9E%98%ED%94%84-%EC%88%9C%ED%9A%8Cgraph-traversal)

- 그래프를 순회하는 코드를 짤 때는 트리와는 다르게 this.root라는 것이 없기 때문에 시작점을 정해줘야 한다.
  - 그래프의 한 노드에서 다른 노드로 갈 때에는 유일한 하나의 길만이 있다는 보장이 없다는 것!

### DFS & BFS

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // DFS - Recursive
  depthFirstRecursive(start) {
    const result = []; // 마지막에 반환할 배열
    const visited = {}; // 방문한 정점에 대한 객체
    // helper 함수 안에서 this가 달라지므로 실제 그래프 자체인 this.adjacencyList를 변수에 할당
    const adjacencyList = this.adjacencyList;

    // result와 visited에 데이터를 추가하고 맨 뒤에 작업을 마치면 result를 돌려주는 helper함수 작서
    (function DFS(vertex) {
      if (!vertex) return null;

      visited[vertex] = true; // 방문하면 true 값으로 visited 객체에 넣어주기
      result.push(vertex);

      // 막 다른길(다음 가지로 넘어가려는데 이미 방문했거나 없는 경우) -> forEach 루프 끝!
      // 여기 예시에서는 F 정점이 콜스택의 제일 위로 올라오고 그 뒤로 forEach들이 끝나기 시작한다.
      adjacencyList[vertex].forEach((neighbor) => {
        // 방문하지 않았다면 해당 정점에 대해 헬퍼 함수를 호출
        if (!visited[neighbor]) {
          return DFS(neighbor);
        }
      });
    })(start);

    return result;
  }

  // DFS - Iterative
  depthFirstIterative(start) {
    const result = [];
    const visited = {};
    const stack = [start];
    let currentVertex; // 루프 안에서 매번 다시 정의하지 않고 위로 정의(사소한 차이임)
    visited[start] = true;

    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }

    return result;
  }

  breathFirst(start) {
    const result = [];
    const queue = [start];
    const visited = {};
    let currentVertex;
    visited[start] = true;

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}
const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");
g.depthFirstRecursive("A"); // ["A", "B", "D", "E", "C", "F"]
g.depthFirstIterative("A"); // ["A", "C", "E", "F", "D", "B"]
g.breathFirst("A"); // ["A", "B", "C", "D", "E", "F"]
```

## 다익스트라 알고리즘(Dijkstra's Algorithm)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%984.md#26-%EB%8B%A4%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%9D%BC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98dijkstras-algorithm)

- One of the most famous and widely used algorithms around!
- Find the shortest path between two vertices on a graph
  - like "What's the fastest way to get from point A to point B?"
- 다익스트라 알고리즘을 작성하기 위해서는 두 가지 데이터 구조를 알고있어야 한다.
  - 그래프 - 다익스트라 알고리즘은 그래프에 대해 작동한다. 그래프를 가로지르며 탐색한다.
  - 우선순위 큐 - 이진힙을 이용해서 우선순위 큐를 만들고 이를 사용해 다익스트라 알고리즘을 작성한다.

### Write a Weighted Graph

```js
// 간선에 가중치를 저장하기 위해 가중치 그래프 작성
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  // 간선을 제거하는 것과 정점을 제거하는 것은 생략
  // 가중치를 재고해야 한다는 것만 제외하면 앞에서 제거하는 것과 유사하다.
}
```

### The Approach

- Every time we look to visit a new node, we pick te node with the smallest known distance to visit first.
- Once we've moved to the node we're going to visit, we look at each of its neighbors
- For each neighboring node, **we calculate the distance by summing the total edges that lead to that node we're checking _from the starting_ node**
- If the new total distance to a node is less than the previous total, we store tha new shorter distance for that node
  - 즉, 시작점으로부터 두 단계 떨어져있어도 떨어진 노드의 인접한 간선이 아닌 시작점으로부터의 거리를 비교한다.
  - 그리고, 더 짧은 거리로 업데이트! 아니면 그대로 유지!

### Dijkstra's Pseudocode

- This function should accept a starting and ending vertex
- Create an object(\* we'll it distances) and set each key to be every vertex in **the adjacency List** with a value of **Infinity**, except for the starting vertex which should have a value of 0.(시작점으로부터 현재 노드까지의 거리를 비교하기 위해 사용)
- After setting a value in the distances object, add each vertex with a priority of **Infinity** to the priority queue, except the starting vertex, which shoud have a priority of 0 because that's where we begin
- Create another object called previous and set each key to be every vertex in the adjacency List with a value of null(나중에 경로로 사용)
- Start looping as long as there is anything in the priority queue
  - dequeue a vertex from the priority queue
  - If that vertex is the same as the ending vertex - we are done!
  - Otherwise loop through each value in the adjacency List at that vertex
    - Calculate the distance to that vertex from the starting vertex
    - If the distance is less than what is currently stored in our distances object
      - Update the distance object with new lower distance(같은 정점을 새로운 더 짧은 거리로 업데이트)
      - Update the previous object to contain that vertex
      - enqueue the vertex with the total distance from the start node

### Dijkstra's Algorithm Implement

```js
class SimplePQ {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    this.values.push({ value, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority); // priority가 낮은 순으로
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  dijkstra(start, finish) {
    const node = new SimplePQ();
    const distances = {}; // 거리 비교용
    const previous = {}; // 최단 거리를 알기 위해 사용할 object
    const path = []; // to return at end
    let smallest;

    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        node.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        node.enqueue(vertex, Infinity);
      }

      previous[vertex] = null;
    }

    // previous = { A: null, B: null, C: null, D: null, ... }
    // distances =  { A: 0, B: Infinity, C: Infinity , ... }
    // node.values = [{ value: "A", priority: 0 }, { value: "B", priority: Infinity }, ... ]
    
    // as long as there is something to visit
    while (node.values.length) {
      smallest = node.dequeue().value; // 현재 위치한 노드

      // If that vertex is the same as the ending vertex - we are done!
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest]; // smallest가 스타트 정점이 되면 루프 종료(* 스타트 정점은 push안된 상태)
        }
        break;
      }

      // Otherwise loop through each value in the adjacency list at that vertex
      if (smallest || distance[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor]; // 현재 위치의 인접한 노드들
          let candidate = distances[smallest] + nextNode.weight; // 시작점으로부터 현재노드까지 거리
          let nextNeighbor = nextNode.node;
          // 시작점부터 현재위치에서 인접한 노드까지의 거리가 distances[nextNeighbor] 보다 작으면 업데이트!
          if (candidate < distances[nextNeighbor]) {
            // updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            // enqueue in priority queue with new priority
            node.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }

    // 마지막 스타트 정점만 push하지 못하고 루프를 나왔으므로 concat 후 reverse!
    return path.concat(smallest).reverse();
  }
}

const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);
graph.dijkstra("A", "E"); // ["A", "C", "D", "E", "F"] -> previous["F"]의 값이 6으로 제일 짧은 경로
```

### Upgrade PriorityQueue

> [PriorityQueue 부분으로 가기](#priority-queue)

```js
class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parnetIdx];

      if (element.priority >= parent.priority) break; // 자식이 우선순위 값이 더 크면 루프 종료!
      
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  }

  sinkDown() {
    let idx = 0;
    const element = this.values[idx];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < this.values.length) {
        leftChild = this,values[leftChildIdx];
        if (leftChild.priority < element.priority) swap = leftChildIdx;
      }

      if (rightChildIdx < this.values.length) {
        rightChild = this.values[rightChildIdx];
        if ((
          swap === null || righitChild.priority < element.priority
        ) || (
          swap !== null || rightChild.priority < leftChild.priority
        )) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}
```

## 동적 프로그래밍(Dynamic Programming)

> [자세히 보기](https://github.com/oneny/TIL/blob/main/Algorithm/Algorithms&DataStructures/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0&%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%984.md#27-%EB%8F%99%EC%A0%81-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8Ddynamic-programming)

A method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions

### Overlapping SubProblems(중복되는 하위문제)

A problem is said to have **overlapping subproblems** if it can be broken down into subproblems which are reused several times

### Optimal Substructure(최적 부분 구조)

A problem is said to have **optimal substructure** if an optimal solution can be constructed from optimal solutions of its subproblems

### Enter Dynamic Programming

Using past knowledge to make solving a future problem eaier

#### The Fibonacci Sequence

피보나치 수열은 `Overlapping Subproblems`와 `Optimal Substructure` 두 가지 특성을 다 가지고 있다.

```js
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 1) * fibonacci(n - 2);
}
```

* Big O of Fibonacci Sequence
  * 실제 수학공식으로 정확한 빅오 표기법은 아니지만 위 피보나치 수열 함수의 빅오는 `O(2^n)`이다.
  * n은 지수로 매우 좋지 않은 빅오 중 하나. 그리고 실제로는 대략 1.6의 n제곱.
* **How can we improve?**
  * 핵심은 `What if we could "remember" old value?`이다!
  * 계산했던 값을 기억할 수 있또록 만드는 것이 동적 프로그램의 핵심!

### Memorization

Storing the results of expensive function calls and returning the cached result when the same inputs occur again

```js
function fib(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;
  let res = fib(n - 1, memo) + fib(n - 2, memo); // memo를 지닌 함수로 호출해야 한다.
  memo[n] = res;
  return res;
}
```

* **Big O of Memorized Solution**
  * fib(7)의 경우 fib(6), fib(5), fib(4), fib(3)의 값만 구하면 된다.
  * fib(2), fib(1)은 상수값의 시간을 가지기 때문에 고려할 필요 X.
  * 그리고 다시 fib(5)에 접근할 필요가 있을 때 memo에 저장했기 때문에 상수값의 시간을 가진다.
  * 따라서, n이 커짐에 알고리즘을 실행하는데 걸리는 시간은 O(n)이다.

### 타뷸레이션(Tabulation): 상향식 접근

* Storing the result of a previous result in a "table" (usually an array)
  * Usually done using **iteraion**
  * Better **space complexity** can be achieved using tabulation

```js
function fib(n) {
  if (n <= 2) return 1;

  const fibNums = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
  }

  return fibNums[n];
}
```

* `TOP-DOWN` 방식으로 해결한 `Memorized Solution`은 재귀를 사용했기 때문에 fib(10000)처럼 큰 수를 실행하는 경우 스택에서 대기하고 있는 해결되지 않은 재귀 호출들이 있을 수 있게 돼서 `Maximum call stack size exceeded` 에러가 발생하게 된다.
* 하지만 `BOTTOM-UP` 방식인 `Tabulation`은 공간을 많이 차지하지 않기 때문에 같은 오류가 발생하지 않는 장점이 있다.
  * 물론 fib(10000) 하게 되면 Infinity 값을 얻게 된다.