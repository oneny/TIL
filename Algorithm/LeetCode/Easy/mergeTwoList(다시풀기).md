## 21. Merge Two Sorted Lists

> https://leetcode.com/problems/merge-two-sorted-lists/
> 2022.8.30.(화)

### 내가 푼 솔루션
```js
var mergeTwoLists = function(list1, list2) {
  const result = [];
  let i = 0; // list1 인덱스 전용
  let j = 0; // list2 인덱스 전용

  // 둘 중 하나가 모두 result에 들어가면 루프 종료
  while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) {
      result.push(list1[i]);
      i++;
    } else {
      result.push(list2[j]);
      j++;
    }
  }

  // result에 모두 안들어간 나머지 배열 작업
  while (i < list1.length) { // 나머지 배열이 list1인 경우
    result.push(list1[i]);
    i++
  }
  while (j < list2.length) { // 나머지 배열이 list2인 경우
    result.push(list2[j]);
    j++;
  }

  return result;
}


```