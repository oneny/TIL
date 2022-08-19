# JS 기본

> 출철: [자바스크립트 비기너:튼튼한 기본 만들기](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EA%B8%B0%EB%84%88)

## 1. 기본 문법

### 데이터 타입

- 데이터(Data)의 사전적 의미: 자료
- 데이터 타입의 형태
  - 숫자 타입: var value = 123;
  - 문자 타입: var value = "sports";

* 데이터 타입을 **_자료형_** 이라고도 부름

- typeof 연산자

  - 데이터(값) 타입 반환

  ```javascript
  var point = 123;
  console.log(typeof point); // 123

  var book = "책";
  console.log(typeof book); // 책
  ```

  - JS는 이처럼 데이터(값)에 따라 데이터 타입이 결정된다!
  - 따라서 타입을 알기 위해서는 할당된 값을 봐야하고, 데이터 타입 변경이 자유롭다.
  - 가감승제 등 연산을 할 때 데이터 타입에 따라서 처리하는 방법 또는 데이터 타입에 따라서 에러가 발생할 수도 있기 때문에 데이터 타입을 잘 알아야 한다!

### 데이터 타입 분류

- 언어 타입
  - Undefined, Null, Boolean, String, Number, Object
  * 기본적 데이터 타입을 **_Primitive 타입_** 이라고 한다.
- 스펙(언어) 타입
  - 언어 알고리즘을 위한 타입으로 JS 프로그램에서 사용 불가
  - Reference, List, Completion, Property Descriptor, Data Block, Lexical Environment, Lexical Record 등

### Number 타입

- 부호(+, -)를 가진 값
- Number 타입의 특수한 3개 값
  - Infinity: 양수 무한대
    - 무한대가 발생하면 그 값으로 Infinity를 할당
  - -Infinity: 음수 무한대
    - 음수 무한대가 발생하면 그 값으로 -Infinity를 할당
  - NaN: Not-a-number
    - **_숫자가 아니라는 시맨틱_** 을갖고 있으면서 값으로 역할을 함
    - JS는 숫자가 아닌 것을 연산할 때 프로그램이 죽지 않고 연산 결과가 숫자가 아니라는 의미를 가진 NaN 값을 할당한다.

#### 숫자 처리

- 정수와 실수를 구분하지 않음
  - IEEE 754 표준으로 64비트 부동 소수점 처리
- 부동 소수점 처리란?
  - 123을 123.0으로 처리
  - 즉, 정수 -> 실수로 처리하기 때문에 정수와 실수를 구분하지 않는다.
  - ES6에 정수, 실수 구분하는 기능 추가

### String 타입

- 값을 "" 또는 '' 사이에 작성
  - 최대 문자수: 2의 53승 - 1
  ```javascript
  var point = "책, '123'"; // 큰 따옴표 안에 작은 따옴표 작성
  console.log(point); // 책, '123'
  ```

### undefined

- 값: undefined
- 변수를 선언만 한 것으로 undefined가 초깃값으로 설정된다.
- 변수에 값을 할당하지 않은 것을 나타내는 시맨틱

### null

- 값이 없음을 명시하는 시맨틱

#### undefined와 null 차이

- `undefined`는 변수를 선언하고 값을 할ㄷ아하지 않은 상태로 자료형이 없는 상태이다.
- `null`은 변수를 선언하고 빈 값을 할당한 상태 즉, 빈 객체이다.
- 따라서 typeof를 통해 자료형을 확인해보면 `null`은 object로, `undefined`는 undefined로 출력되는 것을 확인할 수 있다.

### Boolean

- true, false 값

### Object 타입

- { name: value } 형태 (\* JS의 기본적 형태)
  - 0개 이상의 프로퍼티를 작성한 형태를 Object 타입이라고 한다.
- 프로퍼티(Property)
  - name과 value 하나의 pair를 지칭한다.
  - 콤마(,)로 구분하여 여러 프로퍼티를 설정할 수 있다.
