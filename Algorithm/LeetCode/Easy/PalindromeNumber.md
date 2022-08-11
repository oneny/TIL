# Palindrome Number
> https://leetcode.com/problems/palindrome-number/
> 22.08.11.(목)

## 내 풀이

```javascript
var isPalindrome = function(x) {
    if (x < 0) return false;
    
    let result = true;
    const xToString = x.toString();
    
    for (let i = 0; i < xToString.length / 2; i++) {
        if (xToString[i] !== xToString[xToString.length - i - 1]) {
            result = false;
            break;
        }
    }
    
    return result;
};
```
Runtime: 272 ms, faster than 55.60% of JavaScript online submissions for Palindrome Number.
Memory Usage: 51.3 MB, less than 43.68% of JavaScript online submissions for Palindrome Number.

### 다른 사람 풀이
```javascript
var isPalindrome = function(x) {
    if (x < 0) return false;
    if (x < 10) return true;
    if (x % 10 === 0) return false;
    
    let rev = 0;
    while (rev < x) { // if x = 12321 / 1221
        rev *= 10; // rev = 0 -> 10 -> 120 / rev = 0 -> 10
        rev += x%10; // rev = 1 -> 12 -> 123 / rev = 1 -> 12
        x = Math.trunc(x/10); // x = 1232 -> 123 -> 12 / x = 122 -> 12
    }

    return rev === x || Math.trunc(rev/10) === x; // 자릿수가 짝수 || 홀수 
};
```
Runtime: 226 ms, faster than 78.06% of JavaScript online submissions for Palindrome Number.
Memory Usage: 49.6 MB, less than 99.24% of JavaScript online submissions for Palindrome Number.

#### Recursion을 활용한 풀이
```javascript
var isPalindrome = function(x) {
    const s = x.toString();
    if (s.length === 1) return true; // 한 자릿수인 경우
    
    let start = s[0];
    let end = s[s.length - 1];
    if (start !== end) return false; // 양끝이 다르면 false 반환
    
    if (s.length === 2) return true // 양끝이 같은데 2자리만 남았으면 true 반환
    
    const subStr = s.substring(1, s.length - 1);
    
    return isPalindrome(subStr);  
};
```
Runtime: 170 ms, faster than 96.28% of JavaScript online submissions for Palindrome Number.
Memory Usage: 51.5 MB, less than 29.42% of JavaScript online submissions for Palindrome Number.
##### 알고리즘 문제 풀이 이틀차이지만 정말 다양한 방식으로 문제 해결을 할 수 있다는 점이 흥미롭다.