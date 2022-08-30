## 20. Valid Parentheses

> https://leetcode.com/problems/valid-parentheses/  
> 2022. 8.30.(화)

```
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
```

### 내가 푼 풀이

```js
var isValid = function (s) {
  // (), [](), ()[]{}, {[]}, {[]}(), ([)] -> false
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      if (s.indexOf(")", i + 1) === -1) return false;
    }
    if (s[i] === "[") {
      if (s.indexOf("]", i + 1) === -1) return false;
    }
    if (s[i] === "{") {
      if (s.indexOf("}", i + 1) === -1) return false;
    }
  }

  return isValid(s);
};
```

- (), [](), ()[]{}, {[]}, {[]}()인 경우에는 true가 잘나오고,
- ([)]인 경우에는 false가 나와야 하는데 true가 나온다...

### 다른 사람 풀이

```js
var isValid = function (s) {
  const brackets = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    // (, [, { 중 하나가 스택에 쌓이고 가장 마지막에 삽입된 문자의 인덱스
    const lastStackElement = stack[stack.length - 1];

    // First In Last Out 구조로 작업
    if (brackets[lastStackElement] === s[i]) {
      // 마지막 인덱스와 s[i]가 같다면 stack에서 제거
      stack.pop();
    } else if (brackets[s[i]]) {
      // (, [, { 중 하나라면
      stack.push(s[i]); // (, [, {을 스택에 삽입
    } else {
      return false;
    }
  }

  return !stack.length;
};
```

```
([)]인 경우 stack 상태
i = 0: stack에 ( 삽입
i = 1: stack에 [ 삽입
i = 2: 2번 인덱스는 )(s[2])인데 brackets[1]은 ] 이므로 첫 번째 조건문 false
-> brackets[")"]는 undefined이므로 false
-> 마지막 else로 인해 false 반환


({})인 경우 stack 상태
i = 0: stack에 ( 삽입
i = 1: stack에 { 삽입
i = 2: 2번 인덱스 s[2]는 "}"이고 brackests[1]은 "}"이므로 첫 번째 조건문 true -> stack에서 1번 인덱스 "{" 제거
i = 3: 3번 인덱스 s[3]는 ")"이고 brackests[0]은 ")"이므로 첫 번째 조건문 true -> stack에서 0번 인덱스 ")" 제거 -> 루프 종료

return !0 -> true 반환
```

- 다른 분들이 푼 솔루션을 보는데 `스택`을 사용하여 풀었다.
  - 아직 스택, 큐에 대해 공부해보지 않았지만 좋은 경험인듯하다.

Runtime: 94 ms, faster than 54.95% of JavaScript online submissions for Valid Parentheses.
Memory Usage: 42.7 MB, less than 40.13% of JavaScript online submissions for Valid Parentheses.
Next challenges:
