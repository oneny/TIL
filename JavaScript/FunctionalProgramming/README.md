# 함수형 프로그래밍

> 함수형 프로그래밍은 애플리케이션, 함수의 구성요소, 더 나아가서 언어 자체를 함수처럼 여기도록 만들고, 이러한 함수 개념을 가장 우선순위에 놓는다.  
> 함수형 사고방식은 문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것  
> 마이클 포거스 [클로저 프로그래밍의 즐거움]에서...

### 성공적인 프로그래밍

- 모든 프로그래밍 패러타임은 성공적인 프로그래밍을 위해 존재한다.
- 성공적인 프로그래밍은 좋은 프로그램을 만드는 일이다.
- 좋은 프로그램은 사용성, 성능, 확장성, 기획 변경에 대한 대응력 등이 좋다.
- 이것들을 효율적이고 생산적으로 이루는 일이 성공적인 프로그래밍이다.

### 함수형 프로그래밍

함수형 프로그래밍은 성공적인 프로그래밍을 위해 부수 효과를 지양하고 조합성을 강조하는 프로그래밍 패러다임이다.

- 부수 효과를 지양한다. -> **순수 함수**를 만든다.
  - 순수 함수: 부수 효과가 없고, 들어온 인자가 같으면 항상 동일한 결과를 반환하고, 함수가 받은 인자 외에 외부 상태에 영향을 끼치지 않는 함수
- **조합성**을 강조한다. -> 모듈화 수준을 높인다.
- 순수 함수 -> 오류를 줄이고 안전성을 높인다.
- **모듈화 수준**이 높다. -> 생산성을 높인다.

#### 순수 함수

```js
// 순수 함수
// 평가 시점이 중요하지 않다. -> 외부에 영향을 받지 않음
function add(a, b) {
  return a + b;
}

var c = 10;

// c가 상수라면 add2도 순수 함수라고 할 수 있지만
// c가 변할 수 있기 때문에 순수 함수가 아니다.
// 인자는 동일한 인자를 넣었지만 c의 상태에 따라 결과가 달라진다.
function add2(a, b) {
  return a + b + c;
}

console.log(add2(10, 2)); // 22
console.log(add2(10, 2)); // 22
c = 20;
console.log(add2(10, 2)); // 32 -> 평가 시점이 중요하고 평가 시점에 따라서 로직이 정해진다.

// 외부 상태를 변화시킴, 영향을 미침 -> 부수 효과가 있음
function add3(a, b) {
  c = b;
  return a + b;
}

var obj1 = { val: 10 };
function add4(obj) {
  obj.val += b;
}

console.log(obj1.val);
add4(obj1, 20);
console.log(obj1.val); // obj1의 상태 변경됨 -> 부수 효과

// 원래 있던 값은 그대로 두고, 새로운 값을 만들면서 복사해서 새로운 값을 반환
// 순수 함수 -> obj1의 값을 직접 변경하는 것은 없음 -> 새로운 객체를 반환
function add5(obj, b) {
  return { val: obj.val + b };
}
```

#### 일급 함수

함수를 값으로 다룰 수 있다는 의미

```js
// 변수에 함수를 할당할 수 있다.
var f1 = function(a) { return a * a; };
console.log(f1);

function f3(f) {
  return f();
}

console.log(f3(function() { return 10; })); // 10
console.log(f3(function() { return 20; })); // 20

/* add_maker */
function add_maker(a) {
  return function(b) {
    return a + b;
  }
}

var add10 = add_maker(10);

console.log(add10(20)); // 30

function f4(f1, f2, f3) {
  return f3(f1() + f2());
}

// 순수 함수들을 사용해 조합하고 최종적으로 결과를 만들 수 있다.
console.log(f4(
  function() { return 2; },
  function() { return 1; },
  function(a) { return a * a }
));
```

