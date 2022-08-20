# JS 기본

> 출철: [자바스크립트 비기너:튼튼한 기본 만들기](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EA%B8%B0%EB%84%88)

## 목차

- [1. 기본 문법](#1-기본-문법)

  - [데이터 타입](#데이터-타입)
  - [데이터 타입 분류](#데이터-타입-분류)
  - [Number 타입](#number-타입)
  - [String 타입](#string-타입)
  - [undefined](#undefined)
  - [null](#null)
    - [undefined와 null 차이](#undefined와-null-차이)
  - [Boolean](#boolean)
  - [Object 타입](#object-타입)

- [2. Built-in](#2-built-in)

  - [빌트인 오브젝트 유형](#빌트인-오브젝트-유형)

- [3. Number 오브젝트](#3-number-오브젝트)
  - [프로퍼티 리스트](#number-오브젝트-프로퍼티-리스트)
  - [Number()](#number)
  - [Number 상수](#number-상수)
  - [toString()](#tostring)
  - [toLocaleString()](#tolocalestring)
  - [toExponential()](#toexponential)
  - [toFixed()](#tofixed)
- [4. String 오브젝트](#4-string-오브젝트es5-기준)

  - [프로퍼티 리스트](#string-오브젝트-프로퍼티-리스트)
  - [new String()](#new-string)
  - [length 프로퍼티](#length-프로퍼티)
  - [slice()](#slice)

- [5. Object 오브젝트(ES3 기준)](#5-object-오브젝트es3-기준)

  - [오브젝트 구분](#오브젝트-구분)
    - [빌트인 오브젝트](#빌트인-오브젝트)
    - [네이티브 오브젝트](#네이티브-오브젝트)
    - [호스트 오브젝트](#호스트-오브젝트)
  - [Object 오브젝트 프로퍼티 리스트](#object-오브젝트-프로퍼티-리스트)
  - [new Object()](#new-object)
  - [hasOwnProperty()](#hasownproperty)
  - [propertyIsEnumaerable()](#propertyisenumaerable)
  - [isPrototypeOf()](#isprototypeof)

- [6. Function 오브젝트](#6-function-오브젝트)

  - [Function 오브젝트 프로퍼티 리스트](#function-오브젝트-프로퍼티-리스트)
  - [new Function()](#new-function)
  - [함수 선언문, 함수 표현식](#함수-선언문-함수-표현식)
  - [call()](#call)
  - [apply()](#apply)
    - [apply(), call() 부가적인 목적?](#apply-call-부가적인-목적)
  - [toString()](#tostring-1)

- [7. Global 오브젝트](#7-global-오브젝트)

  - [Global 오브젝트 프로퍼티 리스트](#global-오브젝트-프로퍼티-리스트)
  - [Global과 Window 관계](#global과-window-관계)

- [8. Array 오브젝트(ES3 기준)](#8-array-오브젝트es3-기준)
  - [Array 오브젝트(ES3) 프로퍼티 리스트](#array-오브젝트es3-프로퍼티-리스트)
  - [unshift()](#unshift)
  - [push()](#push)
  - [concat()](#concat)
  - [sort()](#sort)
- [9. Array 오브젝트(ES5 기준)](#9-array-오브젝트es5-기준)
  - [Array 오브젝트(ES5) 프로퍼티 리스트](#array-오브젝트es5-프로퍼티-리스트)
  - [isArray()](#isarray)
  - [reduce()](#reduce)
- [10. Object 오브젝트(ES5 기준)](#10-object-오브젝트es5-기준)
  - [ES5 Object 함수](#es5-object-함수)
  - [프로퍼티 디스크립터](#프로퍼티-디스크립터)
  - [defineProperty()](#defineproperty)

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
  - `Infinity`: 양수 무한대
    - 무한대가 발생하면 그 값으로 Infinity를 할당
  - `-Infinity`: 음수 무한대
    - 음수 무한대가 발생하면 그 값으로 -Infinity를 할당
  - `NaN`: Not-a-number
    - **_숫자가 아니라는 시맨틱_** 을갖고 있으면서 값으로 역할을 함
    - JS는 숫자가 아닌 것을 연산할 때 프로그램이 죽지 않고 연산 결과가 숫자가 아니라는 의미를 가진 NaN 값을 할당한다.
    * NaN은 두 가지 관점이 있다.  
      변환을 했는데 그 결과값이 NaN, 변환을 하려고 했는데 파라미터값이 NaN

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

## 2. Built-in

- Built-in 이란?
  - 값 타입, 연산자, 오브젝트(object)를 'JS 코드를 처리하는 영역에' 사전에 만들어 놓은 것

* 장점
  - 사전 처리를 하지 않고 즉시 사용(\* 반대로 사전 처리를 해야 사용 가능한 것들도 있음)
* 빌트인 값 타입
  - Undefined, Null, Boolean, Number, String, Object
* 빌트인 연산자
  - +, -, \*, /, %, ++, --, new 등
* 빌트인 오브젝트
  - 함수이든, 프로퍼티 값이든 공통적인 모습은 key-value
  - JS의 모든 구조는 name-value, key-value 형태를 가진다.

### 빌트인 오브젝트 유형

- Number 오브젝트
  - 123과 같은 숫자, 상수, 지수
- String 오브젝트
  - "abc"와 같은 문자열, 분리, 연결
- Boolean 오브젝트
  - true, false
- Object 오브젝트
  - { key: value } 형태 (\* 프로퍼티를 처리하기 위한 오브젝트)
- Array 오브젝트
  - [1, 2, "A", "가나다"] 형태
- Function 오브젝트
  - function abc() {} 형태
- Math 오브젝트
  - Math.abs(), Math.round() 형태
- Date 오브젝트
  - 연월일, 시분초 값 얻고 싶을 때 주로 사용
- JSON 오브젝트
  - { "name": "value" } 형태
  - 서버와 데이터 송수신에 주로 사용
- RegExp 오브젝트
  - ^, $ 와 같은 정규 표현식
- 글로벌(Global) 오브젝트
  - 글로벌 오브젝트 외에 오브젝트는 ㄷ이터를 처리하기 위한 함수를 지원하는 오브젝트이다.
  - 해당 오브젝트는 소스 파일 전체에서 하나만 존재
    - Number 오브젝트는 Number 단위로 지원할 수 있으므로 Number 단위로 오브젝트를 만들 수 있다.
    - 글로벌 오브젝트는 하나만 만들 수 있으며 Number처럼 만드는 것이 아니고 JS에서 제공
  - 모든 코드에서 공유, 접근 가능
  - 전역 객체라고도 한다.

## 3. Number 오브젝트

- 숫자(123)을 처리하기 위한 오브젝트
- 즉, Number 오브젝트에 숫자를 처리하기 위한 함수와 프로퍼티가 포함되어 있으며 함수를 호출하여 숫자 처리를 한다.

### Number 오브젝트 프로퍼티 리스트

| 이름             | 개요                                  |
| ---------------- | ------------------------------------- |
| new Number()     | 인스턴스 생성                         |
| Number 함수      |
| Number()         | 숫자 값으로 변호나하여 반환           |
| Number.protptype |
| constructor      | 생성자                                |
| toString()       | 숫자 값을 문자열로 반환               |
| toLocaleString() | 숫자 값을 지역화 문자로 변환          |
| valueOf()        | 프리미티브(인스턴스에 설정된) 값 반환 |
| toExponential()  | 지수 표기로 변환                      |
| toFixed()        | 고정 소수점 표기로 변환               |
| toPrecision()    | 고정 소숫점 또는 지수 표기로 변환     |

### Number()

- 파라미터 값을 Number 타입으로 변환한다.
  - 파라미터 값이 String 타입이라도 값이 숫자이면 변환 가능하다.
  ```javascript
  console.log(Number("123") + 500); // 623
  console.log(Number("abc")); // NaN
  ```

### Number 상수

| 상수 이름                | 값                              |
| ------------------------ | ------------------------------- |
| Number.MAX_VALUE         | 1.7976931348623157 \* 10(308승) |
| Number.MIN_VALUE         | 5 \* 10(-324승)                 |
| Number.NaN               | Not-a-Number                    |
| Number.POSITIVE_INFINITY | Infinity                        |
| Number.NEGATIVE_INFINITY | -Infinity                       |

### toString()

| 구분     | 데이터(값)                    |
| -------- | ----------------------------- |
| data     | 변환 대상                     |
| 파라미터 | 진수(2~36)opt, 디폴트: 10진수 |
| 반환     | 변환된 갑                     |

- data를 String 타입으로 변환
- 변환할 때 주의사항
  - 20.toString()으로 작성하면 에러가 난다.
  - IEEE 754 기준을 준수하여 JS는 실수로 처리하기 때문에 20이 아니라 20. 을 변환 대상으로 인식하므로
  - 20 이 아니라 20..toString()으로 작성해야 한다.

### toLocaleString()

- 숫자를 브라우저가 지원하는 지역화 문자로 변환한다.
  - 지역화: 한국, 중국, 프랑스 등 각 국에서 사용하는 문자

```javascript
// 숫자를 지역화 문자로 변환
var value = 1234.56;
console.log(value.toLocaleString()); // 1,234.56
console.log(value.toLocaleString("de-DE")); // 1.234,56
console.log(value.toLocaleString("zh-Hans-CN-u-nu-hanidec")); // 一,二三四.五六
```

- 파라미터를 작성하지 않았을 때 1234.56에 콤마(,)를 삽입하여 1,234.56 으로 출력한다.
- 파라미터에 de-DE(독일)을 작성하면 콤마 대신 점(.)으로 표시한다.

### toExponential()

- 숫자를 지수 표기로 변환하여 문자열로 반환한다.
  - 파라미터에 소수 이하 자릿수 작성 - 0 ~ 20 까지

#### 표시 방법

- 변환 대상의 첫 자리만 소수점(.) 앞에 표시

* 지수(e+) 다음에 정수에서 소수로 변환된 자릿수 표시

```javascript
// 지수 표기
var value1 = 1234;
console.log(value1.toExponential()); // 1.234e+3
// 소수 이하 자릿수 작성
var value2 = 123456;
console.log(value2.toExponential(3)); // 1.234e+5
```

- 파라미터에 값을 작성하지 않으면 1234에서 1을 소수점 앞에 표시하고 1.234처럼 234를 소수에 표시
- 이어서 e+를 표시하고 정수에서 소수로 변환된 자릿수를 표시한다 -> 234가 3자리이므로 3이 표시됨
- 파라미터에 3을 작성했으므로 123456이 1.234e + 5로 표시되어야 하지만 반올림하여 1.235e+5로 표시

### toFixed()

- 고정 소숫점 표기로 변환하여 문자열로 반환한다.

#### 표시 방법

- 파라미터 값 보다 소수 자릿수가 길면 작성한 자리수에 1을 더한 위치에서 반올림

```javascript
var value = 1234.567;
console.log(value.toFixed(2)); // 1234.57
console.log(value.toFixed()); // 1235
console.log(value.toFixed(5)); // 1234.56700
```

## 4. String 오브젝트(ES5 기준)

> "ABC"처럼 문자 처리를 위한 오브젝트  
> 즉, String 오브젝트에 문자 처리를 위한 함수와 프로퍼티가 포함되어 있으며 함수를 호출하여 문자 처리를 하고 프로퍼티 이름으로 프로퍼티 값을 구하게 된다.

### String 오브젝트 프로퍼티 리스트

| 이름                    | 개요                                                                      |
| ----------------------- | ------------------------------------------------------------------------- |
| new String()            | 인스턴스 생성                                                             |
| <b>String 함수</b>      |
| String()                | 문자열로 변환하여 반환                                                    |
| fromCharCode()          | 유니코드를 문자열로 변환하여 반환                                         |
| <b>String 프로퍼티</b>  |
| length                  | 문자열의 문자 수 반환                                                     |
| <b>String.prototype</b> |
| constructor             | 생성자                                                                    |
| valueOf                 | 프리미티브(= 인스턴스 생성 시 할당된) 값 반환                             |
| toString()              | 문자열로 반환                                                             |
| charAt()                | 인덱스 번째 문자 반환                                                     |
| indexOf                 | 일치하는 문자열 중에서 가장 작은(= 가장 왼쪽의) 인덱스 반환               |
| lastIndexOf             | 일치하는 문자열 중에서 가장 큰(= 가장 오른쪽의) 인덱스 반환               |
| concat()                | 문자열 연결                                                               |
| toLowerCase()           | 영문 소문자로 변환                                                        |
| toUpperCase()           | 영문 대문자로 변환                                                        |
| trim()                  | 문자열 앞뒤의 화이트 스페이스 삭제                                        |
| substring()             | 시작에서 끝 직전까지 값 반환                                              |
| substr()                | 시작 위치부터 지정한 문자 수 반환                                         |
| slice()                 | 시작에서 끝 직전까지 값 반환. 추출하는 조건에서 substring()과 차이가 있음 |
| match()                 | 매치 결과 반환 (\* 정규 표현식에 사용 가능)                               |
| replace()               | 매치 결과를 지정한 값으로 대체(\* 정규 표현식에 사용 가능)                |
| search()                | 다양한 조건으로 검색된 첫 번째 인덱스 반환(\* 정규 표현식에 사용 가능)    |
| split()                 | 구분자로 분리하여 반환(\* 정규표현식에 사용 가능)                         |
| charCodeAt()            | 인덱스 번째 문자를 유니코드로 반환                                        |
| localeCompare()         | 값의 위치를 1, 0, -1로 반환                                               |

### new String()

- String 인스턴스를 생성하여 반환
  ```javascript
  var obj = new String(123);
  console.log(typeof obj); // object
  ```
  - 파라미터 값을 String 타입으로 변환하고 파라미터 값이 프리미티브 값이 됨
  - [[PrimitiveValue]]: 파라미터 값

### length 프로퍼티

```javascript
var value = "ABC";
console.log(value.length); // 3
```

- value 변수는 "ABC" 문자열을 가지고 있으나 length 프로퍼티를 가지고 있지 않다.
- length 값이 반환되는 논리
  - 논리적으로 String 타입의 value가 length 출력되는 것을 확인함으로써 String 타입의 value와 object 타입의 obj가 같은 레벨이라는 것을 알 수 있다.
    - String 타입의 value가 object 타입이 된 것이다. -> length 값 구할 수 있음
  - 즉, value.length를 만나면 JS 엔진이 new String("ABC")를 하고 생성된 인스턴스의 length 값인 3을 반환한다.

### slice()

- 파라미터의 시작 인덱스부터 끝 인덱스 '직전까지' 반환한다.

```javascript
var value = "01234567";
console.log(value.slice(4, -2)); // 45
console.log(value.slice(-5, -2)); // 345
console.log(value.slice(-2, -5)); // ""
```

- 3개의 결과에 대한 논리 설명
  - value.slice(4, 8 + (-2)); -> value.slice(4, 6);으로 간주 -> 따라서 45 반환
  - value.slice(8 + (-5), 8 + (-2)) -> value.slice(3, 6)으로 간주 -> 따라서 345 반환
  - value.slice(8 + (-2), 8 + (-5)) -> value.slice(6, 3)으로 간주 -> 첫 번째 파라미터가 두 번째 파라미터 보다 크면 빈 문자열 반환

## 5. Object 오브젝트(ES3 기준)

### 오브젝트 구분

#### 빌트인 오브젝트

- 사전에 만들어 놓은 오브젝트
- 빌트인 Number 오브젝트, 빌트인 String 오브젝트, ...

#### 네이티브 오브젝트

- JS 스펙에서 정의한 오브젝트
  - 여기에 빌트인 오브젝트도 포함된
  - 이외에도 JS 코드를 실행할 때 만드는 오브젝트
- ex) Argument 오브젝트
  - 함수가 호출되면 함수 안에서 만들고 함수를 빠져나오면 JS 엔진이 자동적으로 지운다.

#### 호스트 오브젝트

- 빌트인, 네이티브 오브젝트를 제외한 오브젝트
  - window, DOM(Document Object Model의 약칭) 오브젝트

```javascript
// 호스트 오브젝트
var node = document.querySelector("div");
console.log(node.nodeName); // DIV
```

- querySelector()는 JS에서 제공하는 것이 아닌 **_DOM 스펙에 작성된 함수_**
- 어떠한 처리를 하지 않고 바로 사용이 가능하다.
  - 함수 앞에 document는 오브젝트가 되고, DOM에서 제공하는 오브젝트를 호스트(Host) 오브젝트라고 부른다.
- 마치 JS함수처럼 DOM 함수를 사용한다.

* 호스트 오브젝트에서 JavaScript에서 사용할 수 있는 형태로 만들어서 제공하고 이런 환경을 **_호스트 환경_** 이라고 부른다.
* JS는 호스트 환경에서 브라우저의 모든 요소 기술을 연결하고 융합하여 이를 제어한다.
  - 자바스크립트 개발자는 자바스크립트 하나로 끝나는 것이 아님을 보여주고, 호스트 환경에서의 호스트 오브젝트도 배워야 한다.

### Object 오브젝트 프로퍼티 리스트

| 이름                    | 개요                                                        |
| ----------------------- | ----------------------------------------------------------- |
| new Object              | 파라미터 데이터 타입의 인스턴스 생성                        |
| Object()                | Object 인스턴스 생성(\* new 연산자를 사용하지 않은 것 뿐임) |
| <b>Object.prototype</b> |
| constructor             | 생성자                                                      |
| hasOwnProperty()        | 프로퍼티 소유 여부 반환                                     |
| propertyIsEnumerable()  | 프로퍼티 열거 여부 반환                                     |
| isPropertyOf()          | property의 존재 여부 반환                                   |
| toString()              | 문자열로 반환                                               |
| toLocaleString()        | 지역화 문자열로 반환                                        |

### new Object()

- new 연산자로 Object 생성자 함수를 호출 -> 인스턴스를 생성하여 반환한다.
- 파라미터의 데이터 타입에 따라 생성할 인스턴스를 결정한다.
  ```javascript
  var newObj = new Object(123);
  console.log(typeof newObj); // object
  console.log(newObj + 100); // 223
  ```
  - new Object(123)로 생성한 인스턴스의 타입은 object이고 프리미티브 값은 123 이다.
  - 즉, new Object()는 파라미터 값 타입이 Number 타입이면 Number 인스턴스를 생성하고 String 타입이면 String 인스턴스를 생성한다.

### hasOwnProperty()

- 인스턴스에 파라미터 이름이 존재하면 true, 존재하지 않으면 false 반환

```javascript
var obj = { value: undefined };
console.log(obj.hasOwnProperty("value")); // true
```

- 값은 체크하지 않고 존재 여부만 체크하므로 true 반환

```javascript
var obj = {};
console.log(obj.hasOwnProperty("hasOwnProperty")); // false
```

- 자신이 만든 것이 아니라 상속받은 프로퍼티이면 false 반환

### propertyIsEnumaerable()

- 오브젝트에서 프로퍼티를 열거할 수 있으면 true, 열거할 수 없으면 false 반환

```javascript
// 열거 가능
var obj1 = { sports: "축구" };
console.log(obj1.propertyIsEnumerable("sports")); // true

// 열거 불가능
var obj2 = { sports: "농구" };
Object.defineProperty(obj2, "sports", { enumerable: false }); // 열거할 수 없는 상태로 설정
console.log(obj2.propertyIsEnumerable("sports")); // false

for (var name in obj2) {
  console.log(name); // 열거되지 않음
}
```

### isPrototypeOf()

- 파라미터에 작성한 오브젝트에 object 위치에 작성한 prototype이 존재하면 true, 존재하지 않으면 false 반환

```javascript
var numObj = new Number(123);
console.log(Object.prototype.isPrototypeOf(numObj)); // true
```

## 6. Function 오브젝트

### Function 오브젝트 프로퍼티 리스트

| 이름                      | 개요                                 |
| ------------------------- | ------------------------------------ |
| new Function()            | 인스턴스 생성                        |
| Function()                | 인스턴스 생성                        |
| <b>Function 프로퍼티</b>  |
| length                    | 함수의 파라미터 수                   |
| <b>Function.prototype</b> |
| constructor               | 생성자                               |
| call()                    | 함수 호출: 단일값으로 작용           |
| apply()                   | 함수 호출: 파라미터를 배열로 사용    |
| toString()                | 함수를 문자열로 반환                 |
| bind()                    | 새로운 오브젝트를 생성하고 함수 실행 |

### new Function()

- Function 인스턴스 생성
  ```javascript
  var obj = new Function("book", "return book;");
  console.log(obj("JS책")); // JS책
  var obj2 = new Function("one", "two", "return one + two;");
  console.log(obj2(100, 200)); // 300
  ```
  - 파라미터에 함수의 파라미터 뿐만 아니라 함수 코드도 작성 가능

### 함수 선언문, 함수 표현식

- 함수 선언문(Function Declaration)
  - function getBook(book) {코드}
- 함수 표현식(Function Expression)
  - var getBook = function(book) {코드}

### call()

```javascript
function getTotal(one, two) {
  return one + two;
}
var result = getTotal.call(this, 10, 20);
console.log(result); // 30
```

- 첫 번쨰 파라미터
  - 호출된 함수에서 this로 참조할 오브젝트를 설정한다.
  - 일반적으로 this 사용하여 파라미터 값으로 넘겨진 오브젝트를 참조할 수 있다.
    - 다른 오브젝트도 작성 가능
  ```javascript
  var value = { one: 10, two: 20 };
  function getTotal() {
    return this.one + this.two;
  }
  var result = getTotal.call(value);
  console.log(result);
  ```
  - getTotal.call(value)의 파라미터에 value 오브젝트를 작성하면 this는 value 오브젝트를 참조한다.

### apply()

- 파라미터 수가 유동적일 때 사용, 두 번째 파라미터에 배열 사용
  - 배열 내 element 수가 유동적이여도 파라미터 수는 고정된다.

```javascript
function getTotal(one, two, three) {
  return one + two + three;
}
var result = getTotal.apply(this, [10, 20, 30]);
console.log(result); // 60
```

- getTotal() 파라미터에 one에 10, two에 20, three에 30이 설정된다.

#### apply(), call() 부가적인 목적?

- 첫 번째 파라미터에 호출된 함수에서 this로 참조할 오브젝트를 사용할 수 있다.
  - 호출된 함수에서 오브젝트를 바꿔서 사용이 가능한 것!

### toString()

- 거의 모든 빑트인 오브젝트에 toString()이 있지만 오브젝트마다 반환되는 형태가 다르다.

```javascript
var getBook = function () {
  return 100 + 23;
};
var result = getBook.toString();
console.log(result); // function() { return 100 + 23; }
```

### Argument 오브젝트

> Argument 오브젝트가 Function 오브젝트에 속하지는 않지만 함수를 호출하면 그 때 Argument 오브젝트를 생성한다.

- 함수가 호출되어 JS 엔진이 함수 안으로 이동했을 때 arguments 이름으로 생성되는 오브젝트이다.

* 함수를 호출한 곳에서 넘겨준 값을 순서대로 저장한다.
  - 함수가 실행된 후에 함수를 빠져나오면 arguments 오브젝트도 자동으로 삭제된다.
* 즉, 호출된 함수의 파라미터에도 값을 설정하고 아규먼트 오브젝트에도 저장한다.
  ```javascript
  // apply()와 아규먼트 오브젝트
  function getTotal(one) {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
      total += arguemtns[i];
    }
    return total;
  }
  var result = getTotal.apply(this, [10, 20, 30]);
  console.log(result); //  60
  ```
  - 파라미터에 몇 개를 넘기든 arguments 오브젝트에 저장돼서 for문으로 값을 구할 수 있다.

## 7. Global 오브젝트

- 모든 \<script>를 통해 하나만 존재한다.
  - new 연산자로 인스턴스 생성 불가
  - 모든 코드에서 공유한다.

### Global 오브젝트 프로퍼티 리스트

| 이름                 | 개요                                                                           |
| -------------------- | ------------------------------------------------------------------------------ |
| 값                   | 프로퍼티에는 3개의 값이 존재                                                   |
| NaN                  | Not-a-Number                                                                   |
| Infinity             | 무한대 값                                                                      |
| undefined            | undefined                                                                      |
| 함수                 | 글로벌 오브젝트는 인스턴스를 만들지 못하므로 모두 함수!                        |
| isNaN()              | NaN 여부. NaN 이면 true, 아니면 false 반환                                     |
| isFinite()           | 유한대 여부. 유한이면 true, 아니면 false                                       |
| parseInt()           | 정수로 변환하여 반환 (\* 넓이 값을 받아올 때 px가 따라오는데 이 경우에도 사용) |
| parseFloat()         | 실수로 변환하여 반환                                                           |
| eval()               | 문자열을 JS 코드로 간주하여 실행한다.(\* 이제 사용하지 않음)                   |
| encodeURI()          | URI 인코딩                                                                     |
| encodeURIComponent() | URI 확장 인코딩                                                                |
| decodeURI()          | encodeURI 함수의 인코딩 값을 디코딩                                            |
| decodeURIComponent() | encodeURIComponent() 함수의 인코딩 값을 디코딩                                 |

### Global과 Window 관계

- 글로벌과 window 오브젝트 주체
  - 글로벌 오브젝트는 JS가 주체
  - window 오브젝트는 window가 주체 -> JS 스펙에 정의된 것이 아님!
- 주체는 다르지만, 글로벌 오브젝트의 프로퍼티와 함수가 window 오브젝트에 설정된다.
  - Global 오브젝트의 속하는 함수와 프로퍼티는 window 오브젝트에 저장된다.

```javascript
console.log(undefined); // undefeind
console.log(window.undefined); // undefined
```

## 8. Array 오브젝트(ES3 기준)

- 배열 특징
  - 엘리먼트 작성이 순서를 가지고 있다. -> `순서`가 매우 중요한 의미를 가진다.
  - 배열 전체를 작성한 순서로 읽거나 인덱스로 값을 추출할 수 있다.

### Array 오브젝트(ES3) 프로퍼티 리스트

| 이름                   | 개요                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| new Array()            | 인스턴스 생성                                                    |
| Array()                | 인스턴스 생성                                                    |
| <b>Array 프로퍼티</b>  |
| length                 | 배열의 엘리먼트 수 변환                                          |
| <b>Array.prototype</b> |
| constructor            | 생성자                                                           |
| unshift()              | 배열 처음에 엘리먼트 삽입                                        |
| push()                 | 배열 끝에 엘리먼트 삽입                                          |
| concat()               | 배열 끝에 값을 연결                                              |
| slice()                | 인덱스 범위의 엘리먼트 복사                                      |
| join()                 | 엘리먼트와 분리자를 결합하여 반환                                |
| toString()             | 엘리먼트를 문자열로 연결하여 반환                                |
| toLocaleString()       | 엘리먼트를 지역화 문자로 변환하고 문자열로 연결하여 반환         |
| shift()                | 첫 번째 엘리먼트를 삭제하고 삭제한 엘리먼트 반환                 |
| pop()                  | 마지막 엘리먼트를 삭제하고 삭제한 엘리먼트 반환                  |
| splice()               | 엘리먼트를 삭제하고 새로운 엘리먼트를 삽입, 삭제한 엘리먼트 반환 |
| sort()                 | 엘리먼트 값을 unicode 순서로 분류하여 반환                       |
| reverse()              | 엘리먼트 위치를 역순으로 바꾸어 반환                             |

### unshift()

```javascript
var value = [1, 2];
value.unshift(345, 8);
console.log(value); // [345, 8, 1, 2]
```

- 배열에 있던 엘리먼트는 뒤로 이동한다.

### push()

```javascript
var value = [1, 2];
value.push(345, 8);
console.log(value); // [1, 2, 345, 8]
```

- 배열 끝에 파라미터 값을 첨부

### concat()

```javascript
var value = [10, 20, 30];
value.concat([1], [2], [3]); // [10, 20, 30, 1, 2, 3]
value.concat([1, 2, 3]); // [10, 20, 30, 1, 2, 3]
value.concat(1, 2, 3); // [10, 20, 30, 1, 2, 3]
```

### sort()

- sort() 메서드 안에 콜백함수로 인해 a > b이면 둘의 배열 위치를 바꾼다.

```javascript
var value = [101, 26, 7, 1234];
console.log(value.sort((a, b) => a - b)); // [7, 26, 101, 1234]
console.log(value.sort((a, b) => b - a)); // [1234, 101, 26, 7]
```

1. a = 101, b = 26일 때 0보다 큰 값이 되므로 값의 위치가 바뀌어 [26, 101, 7, 1234]로 진행된다.
2. a = 101, b = 7이면 0보다 큰 값이 되므로 값의 위치가 바뀌어 [26, 7, 101, 1234]가 된다.
3. a = 101, b = 1234이면 0보다 작은 값이 되므로 값의 위치가 바뀌지 않는 식으로 진행된다.

## 9. Array 오브젝트(ES5 기준)

### Array 오브젝트(ES5) 프로퍼티 리스트

| 이름                   | 개요                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| <b>Array 함수</b>      |
| isArray()              | 배열 여부 반환. 배열이면 true, 아니면 false                              |
| <b>Array.prototype</b> |
| indexOf()              | 지정한 값에 일치하는 첫 번째 엘리먼트 인덱스 반환                        |
| lastIndexOf()          | indexOf()와 같으며, 마지막 인덱스 반환                                   |
| forEach()              | 모든 엘리먼트를 돌아가며 콜백 함수를 실행                                |
| every()                | 반환 값이 false일 때까지만 콜백 함수 실행. 하나라도 false이면 false 반환 |
| some()                 | 반환 값이 true일 때까지만 콜백 함수 실행. 하나라도 true이면 true 반환    |
| filter()               | 콜백 함수에서 true를 반환하는 엘리먼트 반환                              |
| map()                  | 콜백 함수에서 반환한 값을 새로운 배열로 반환                             |
| reduce()               | 콜백 함수의 반환 값을 파라미터 값으로 사용                               |
| reduceRight()          | reduce()와 같은. 단, 배열의 끝에서부터 진행                              |

### isArray()

```javascript
console.log(typeof { a: 1 }); // object
console.log(typeof [1, 2]); // object
console.log(isArray([1, 2])); // true
```

- typeof 연산자로 데이터 타입을 구하면 object를 반환하므로 배열 여부 체크 불가
- 따라서 isArray() 함수를 사용하여 배열 여부를 체크할 수 있다.

### reduce()

```javascript
var value = [1, 2, 3, 4];
var result = value.reduce((prev, curr, index, all) => prev + curr, 2);
console.log(result); // 12
```

## 10. Object 오브젝트(ES5 기준)

### ES5 Object 함수

- 메서드 없이 함수들만 추가됐다.

| 이름                       | 개요                                         |
| -------------------------- | -------------------------------------------- |
| defineProperty()           | 프로퍼티 추가, 프로퍼티 속성 변경            |
| definedProperties()        | 다수의 프로퍼티 추가, 속성 변경              |
| getPrototypeOf()           | prototype에 연결된 프로퍼티 반환             |
| getOwnPropertyNames()      | 프로퍼티 이름을 배열로 반환                  |
| keys()                     | 열거 가능 프로퍼티 이름들을 배열 형태로 반환 |
| getOwnPropertyDescriptor() | 디스크립터 속성 반환                         |
| preventExtensions()        | 프로퍼티 추가 금지 설정                      |
| isExtensible()             | 프로퍼티 추가 금지 여부 반환                 |
| seal()                     | 프로퍼티 추가, 삭제 금지 설정                |
| isSealed()                 | 프로퍼티 추가, 삭제 금지 여부 반환           |
| freeze()                   | 프로퍼티 추가, 삭제/변경 금지 설정           |
| isFrozen()                 | 프로퍼티 추가, 삭제/변경 금지 여부 반환      |

### 프로퍼티 디스크립터

| 이름         | 개요                                      |
| ------------ | ----------------------------------------- |
| value        | [[Value]], 설정한 값                      |
| writable     | [[Writable]], 값 변경 가능 여부           |
| get          | [[Get]], 값 반환 프로퍼티 함수            |
| set          | [[Set]], 값 설정 프로퍼티 함수            |
| enumerable   | [[Enumerable]], 프로퍼티 열거 가능 여부   |
| configurable | [[Configurable]], 프로퍼티 삭제 가능 여부 |

### defineProperty()
