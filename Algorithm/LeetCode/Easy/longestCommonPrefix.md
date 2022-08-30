## longestCommonPrefix

> https://leetcode.com/problems/longest-common-prefix/submissions/  
> 22. 8.30.(화)

### 내 풀이

```js
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0]; // 1번 인덱스를 접두사로
  for (let i = 1; i < strs.length; i++) {
    // 1번 인덱스부터 시작

    while (strs[i].indexOf(prefix) !== 0) {
      // 0이 나오면 공통된 문자가 있다는 것 -> 다음 요소로 루프
      prefix = prefix.substring(0, prefix.length - 1); // 맨 뒤 문자를 뺀 나머지
      if (prefix.length === 0) return ""; // length가 0이 되면 결과는 ""
    }
  }

  return prefix;
};
```

Runtime: 145 ms, faster than 5.18% of JavaScript online submissions for Longest Common Prefix.
Memory Usage: 44.9 MB, less than 8.03% of JavaScript online submissions for Longest Common Prefix.

- O(n^2)이다보니 확실히 좋지 못한 결과가 나왔다.

### 다른 사람 풀이

```js
var longestCommonPrefix = function(strs) {
  if(strs.length === 0) return "";
  if(strs.length === 1) return strs[0];
  let str = "";

  for (let i = 0; i < strs[0].length; i++) { // To iterate over characters in a string
    let flag = true;
    let char;

    for (let j = 0; j < strs.length - 1; j++) {
      char = strs[j][i];
      if (char !== strs[j+1][i]) {
        flag = false;
        break;
      }
    }

    if (flag === true) str += char;
    else break;
  }

  return str;
}
```

Runtime: 112 ms, faster than 25.35% of JavaScript online submissions for Longest Common Prefix.
Memory Usage: 42.8 MB, less than 40.80% of JavaScript online submissions for Longest Common Prefix.
