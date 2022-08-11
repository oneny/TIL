# Plus One

> https://leetcode.com/problems/plus-one/

## 내 문제 풀이

>

```javascript
var plusOne = function (digits) {
  const total =
    digits
      .map((v, i) => v * Math.pow(10, digits.length - i - 1))
      .reduce((p, r) => p + r) + 1;
  const result = String(total).split("");

  return result;
};
```

- 엘리먼트 수가 5-6자리까지 검사만 해보고 제출했더니 제출 시 10자리 정도부터는 에러가 나기 시작했다.
- reduce를 사용하는 것보다는 다른 방법을 사용하는 것이 좋겠다고 생각했다.

## 다른 사람 문제 풀이

```javascript
var plusOne = function(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
      if (digits[i] !== 9) { // digits[i]가 9가 아니라면
          digits[i]++; // 1 증가
          break; // 루프 탈출
      } else { // 9인 경우
          digits[i] = 0; // 해당 엘리먼트 0으로 만들고, 루프 진행
      }
  }

    if (digits[0] === 0) digits.unshift(1); // 9999 라면 0번 인덱스가 0이므로 맨 앞에 1을 unshift 한다.
    return digits;
};
```
Runtime: 62 ms, faster than 94.22% of JavaScript online submissions for Plus One.
Memory Usage: 42.2 MB, less than 28.26% of JavaScript online submissions for Plus One.

```javascript
var plusOne = function (digits) {
  let co = true;
  for (let i = digits.length - 1; i >= 0 && co; i--) {
    digits[i]++; // 마지막 엘리먼트부터 1 증가시킨다.
    co = digits[i] >= 10; // 해당 엘리먼트가 10이 되면 true, 아니면 false로 루프는 끝
    co && (digits[i] = 0); // true면 해당 엘리먼트를 0으로 만들고 뒤에서 다음 엘리먼트 수행
  }
  co && digits.unshift(1); // 만약 99999 라면 0번 인덱스가 0이 co는 true로 빠져나오기 때문에 맨 앞에 1을 unshift 해준다.
  return digits;
};
```
Runtime: 89 ms, faster than 50.73% of JavaScript online submissions for Plus One.
Memory Usage: 42.1 MB, less than 39.64% of JavaScript online submissions for Plus One.