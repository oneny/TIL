# JS 심화

> 출처: [자바스크립트 중고급: 근본 핵심 논리](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A4%91%EA%B3%A0%EA%B8%89)

## 목차

- [01. ES3/ES5 스펙의 아키텍처](#01-es3es5-스펙의-아키텍처)
  - [ES3 스펙](#es3-스펙)
  - [ES5 스펙](#es5-스펙)
  - [엔진 관점의 핵심 키워드](#엔진-관점의-핵심-키워드)
  - [실행 콘텍스트(Execution Context) 형태](#실행-콘텍스트execution-context-형태)
  - [식별자 해결](#식별자-해결)
  - [ES3: Scope Chain](#es3-scope-chain)
    - [ES5에서 Scope Chain](#es5에서-scope-chain)
  - [정적 환경(Lexical Environment)](#정적-환경lexical-environment)
  - [var 키워드 사용하지 않았을 때의 문제](#var-키워드-사용하지-않았을-때의-문제)
- [02. Function 오브젝트](#02-function-오브젝트)
  - [함수 실행 환경 인식](#함수-실행-환경-인식)
  - [함수 실행 환경 저장](#함수-실행-환경-저장)
  - [내부 프로퍼티](#내부-프로퍼티)
    - [내부 프로퍼티 분류](#내부-프로퍼티-분류)
    - [공통 프로퍼티](#공통-프로퍼티)
    - [선택적 내부 프로퍼티](#선택적-내부-프로퍼티)
  - [함수 코드 해석 순서](#함수-코드-해석-순서)
    - [1. 함수 선언문 해석](#1-함수-선언문-해석)
    - [2. 변수 쵝화](#2-변수-초기화)
    - [3. 코드 실행](#3-코드-실행)
  - [호이스팅](#호이스팅)
- [03. 스코프](#03-스코프)
  - [스코프 목적](#스코프-목적)
  - [스코프 매커니즘](#스코프-매커니즘)
  - [글로벌 오브젝트](#글로벌-오브젝트)
  - [글로벌 스코프](#글로벌-스코프)
- [04. Execution Context](#04-execution-context)
  - [실행 콘텍스트](#실행-콘텍스트)
  - [실행 콘텍스트 상태 컴포넌트](#실행-콘텍스트-상태-컴포넌트)
  - [렉시컬 환경 컴포넌트](#렉시컬-환경-컴포넌트)
  - [렉시컬 환경 컴포넌트 구성 및 설정](#렉시컬-환경-컴포넌트-구성-및-설정)
  - [외부 렉시컬 환경 참조](#외부-렉시컬-환경-참조)
  - [변수 환경 컴포넌트](#변수-환경-컴포넌트)
  - [콘텍스트 실행 과정](#콘텍스트-실행-과정)
  - [환경 레코드 구성](#환경-레코드-구성)
    - [선언적 환경 레코드](#선언적-환경-레코드)
    - [오브젝트 환경 레코드](#오브젝트-환경-레코드)
    - [글로벌 환경](#글로벌-환경)
  - [this 바인딩 컴포넌트](#this-바인딩-컴포넌트)
  - [this 바인딩 컴포넌트 설정 및 사용 과정](#this-바인딩-컴포넌트-설정-및-사용-과정)
  - [호출 스택](#호출-스택)
- [05. Function Instance](#05-function-instance)
  - [Function 인스턴스 생성](#function-인스턴스-생성)
  - [생성자 함수](#생성자-함수)
  - [인스턴스 생성 과정](#인스턴스-생성-과정)
  - [constructor 프로퍼티](#constructor-프로퍼티)
    - [constructor 비교](#constructor-비교)
  - [prototype 오브젝트 목적](#prototype-오브젝트-목적)
  - [인스턴스 상속](#인스턴스-상속)
  - [인스턴스 프로퍼티 우선 사용](#인스턴스-프로퍼티-우선-사용)
- [06. this](#06-this)

## 01. ES3/ES5 스펙의 아키텍처

### ES3 스펙

- `실행 콘텍스트(Excution Contexts)`

  - 함수가 호출되었을 때 함수가 실행될 수 있는 환경
  - 함수가 실행되었을 때 결과를 저장하는 영역
  - 함수의 모든 처리를 이 영역 안에서 이루어진다.

- Function Object
  - JS 엔진이 Function 키워드를 만났을 때 만드는 Function 오브젝트를 의미한다.
- Types of Executable Code
  - 실행 가능 코드의 유형
  - 하단의 Global Code, Eval Code, Function Code가 있다.
  - Eval Code -> Evaluate 함수(\* 문자열로 작성)
  - Global Code와 Function Code는 위치만 다를 뿐이지 코드 내용은 같음
    - 그래도 분류하는 이유는 실행하는 영역이 다르기 때문이다.
- Variable Instantiation
  - 변수의 인스턴스화
  - 변수를 어떻게 인스턴스 시켜서 처리할 것인지에 대해 정의
- `Scope Chain` and `Identifier Resolution`
  - `스코프 체인`과 `식별자 해결(결정)`
  - 함수를 호출할 때 어떻게 함수 이름을 차을 것인지, 변수의 값을 설정할 때 변수의 이름을 찾을 것인지에 대해 정의한다.
- Global Object
  - 전역 객체라고도 한다.
  - 위의 Function Object와 구분한 것은 실행하는 영역이 다르기 때문이다.
- Activation Object
  - 함수가 호출되었을 때 함수를 실행할 수 있는 환경
  - 함수가 실행되었을 때 실행된 결과를 저장하는 오브젝트
  - 오브젝트이기 때문에 프로퍼티를 가지고 있따. -> 이 안에 또 다른 오브젝트가 존재할 수 있다.
- This
  - This는 인스턴스에서 중요한 의미를 가진다.
- Arguments Object
  - 함수의 파라미터를 처리하는 오브젝튿

### ES5 스펙

- Strict Mode Code
  - "use strict"를 작성했을 때의 실행 모드
- `정적 환경(Lexical Environment)`
  - `실행 콘텍스트`가 하나의 어떤 코드를 실행하는 묶음이라 한다면 그 안에서 환경적인 측면을 처리하는 것이 `정적 환경`이다.
  - 아래와 같은 구조를 가진다.
  - Environment Records
    - 함수가 호출되어 실행될 때, 실행되기 전에 그 사항들을 기록하는 것
  - Lexical Environments Operations
    - Operation을 할당이라고 봐도 무방
    - 어떤 변수에 값을 할당헀을 떄 그것을 정적인 환경에 설정한다는 의미로 Records와 관련 있다.
  - The Global Environments
    - Global Object를 처리하는 환경
- `식별자 해결(Identifier Resolution)`
  - `실행 콘텍스트`가 어떤 코드를 실행하는 묶음이라 한다면 `식별자 해결`을 `바탕`이 되는 개념이다!
- Declaration Binding Instantiation
  - 중요 포인트는 Binding -> 변수와 this와 관계가 있다.
  - `변수(Variable)`를 어떻게 `실행 콘텍스트(Excution Contexts)`의 `환경(Lexical Environments)`에다가 `바인딩(Binding)`시켜서 `레코딩(Records)`할 것인지에 대해 정의

### 엔진 관점의 핵심 키워드

- 엔진 처리는 크게 `해석`과 `실행`으로 나눌 수 있다.
  - `해석`: 컴파일과 실행할 환경을 설정하는 것
    - 실행 환경을 만드는 것은 함수가 호출되기 전에 할 수도 있고, 호출된 후에도 할 수 있다.
  - `실행`: 해석 단계에서 설정된 환경을 바탕으로 코드를 실행하는 것이다.
    - 함수가 호출된 다음에 하는 것
  - 여기서 키워드는 `Context` -> 함수라는 단위를 어떻게 묶음으로 가져갈 것인지 설정해야 한다.

#### 실행 콘텍스트를 묶음으로 가져가는 이유는?

- 해답: `식별자 해결`
  - 함수가 호출되었을 때 함수 이름을 찾아야 간다.
  - 어떻게 변수 이름, 함수 이름을 빠르게 찾고 실행할 것인지에 대해 생각해야 한다.
- 식별자 해결에서 파생된 단어: `스코프`
  - 식별자가 어디 있는지 구조적으로 정의된다.

### 실행 콘텍스트(Execution Context) 형태

```javascript
function book() {
  var point = 123;
  function show() {
    var title = "JS책";
  }
  function getPoint() {
    return point;
  }
  show();
}
book();

show 실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {
    환경 레코드(ER): {
      선언적 환경 레코드(DER): {
        title: "JS책"
      },
      오브젝트 환경 레코드(OER): {},
    },
    외부 렉시컬 환경 참조(OLER): {
      point: 123,
      getPoint: function() {}
    }
  },
  변수 환경 컴포넌트(VEC): {},
  this 바인딩 컴포넌트(TBC): {
    글로벌 오브젝트(window)
  }
}
```

#### 엔진 동작 순서

1. 마지막 줄 book() 함수가 호출하면 JS 엔진이 함수 안으로 이동하게 된다.
2. point 변수 선언
3. Function 키워드를 만나므로 show 이름의 Function 오브젝트 생성
4. show의 [[Scope]]에 스코프 설정 -> [[]] 대괄호 두 개는 엔진이 설정하는 프로퍼티를 의미한다

- show()함수를 호출했을 때가 아닌 function 키워드를 만날 때 `렉시컬 스코프`를 설정한다.

5. 그 다음 show 함수처럼 getPoint Function 오브젝트를 생성한다.
6. show 함수 호출
7. 엔진이 show 함수로 이동하지만 이동하기 전 엔진 동작에 대해 설명

- show() 함수가 호출되면 `EC(실행 콘텍스트)` 생성
  - 함수 실행을 위한 Context 환경 구축 -> 하나의 덩어리 안에서 함수가 실행될 수 있도록 만든다.
- `LEC(렉시컬 환경 컴포넌트)`, `VEC(변수 환경 컴포넌트)`, `TBC(this 바인딩 컴포넌트)` 생성
  - LEC, VEC의 초깃값은 같음
  - TBC: this로 참조할 오브젝트를 바인딩시킨다.
- LEC에 variable 키워드로 변수를 만나게 되면
  - ER(환경 레코드) 안에 DER(선언적 환경 레코드)에 프로퍼티 형태(\* title: "JS책")로 설정
  - OER(오브젝트 환경 레코드) 첨부
- 함수에서 값을 구하는 형태
  - 파라미터로부터 값을 구할 수 있다.
  - var point = 123; 처럼 변수를 선언해서 값을 구할 수 있다.
  - getPoint() 같은 함수를 호출하여 호출된 함수로부터 반환된 값을 값으로 사용할 수 있다.
  - show() 함수 밖의 변수를 값으로 사용할 수 있다.
    - show Function 오브젝트를 만들 때 show가 속한 범위를 [[Scope]]에 설정해서 가능하다.
    - 스코프에 설정된 것을 바로 OLER(외부 렉시컬 환경 참조)에 설정하기 때문이다.
    - 따라서, point 변수와 getPoint() 함수가 위와 같이 설정된다.
    - 그러기 저 하나의 덩어리가 하나의 콘텍스트(EC)이다.
    - 즉, show() 함수 밖에 있는 변수와 함수이지만 하나의 콘텍스트 영역에 존재하기 때문에 내 것처럼 사용이 가능하다.
  - this로 참조해서 프로퍼티 값을 구할 수 있다.
    - 위의 show 함수를 window 오브젝트를 참조하고 있다.

### 식별자 해결

- 사용할 변수/함수를 결정하는 것
- 신속하고 정확한 검색을 위해 스코프가 필요하다.
  - 식별자 해결로부터 파생된 단어: `스코프`

```javascript
var point = 123;
function getPoint() {
  var point = 200;
  return point;
}
console.log(getPoint()); // 200
```

- 처음에 point를 123으로 할당하였는데 200으로 반환하는 이유
  - function getPoint()가 하나의 스코프이기 때문에 스코프 안에 먼저 찾고 없으면 그 위의 스코프에 가서 찾아가는 형태이기 때문이다.

### ES3: Scope Chain

- `Scope Chain`은 실행 콘텍스트와 관련이 있으며 식별자 해결을 위해 사용한다.
  - 다루는 것은 ES5와 같고 ES5도 Scope를 사용하지만 Scope Chain을 다루지 않는다.
- Scope Chain은 식별자를 검색하기 위한 오브젝트 { name: value } 형태 리스트
- 생성한 `Scope`를 `Scope Chain`에 연결하여 구조적, 계층적으로 {name: value} 리스트를 만들고
  - `Scope Chain`에서 식별자를 검색하고 해결한다.
- `동적 처리`
  - 함수가 호출되면 그 안의 변수와 함수 이름을 프로퍼티로 만들고 `Scope Chain`에다가 연결시킨다.
  - 그러니 함수가 새로 생길 때마다 Scope Chain이 동적으로 처리(생성)된다.
  - 반면, ES5는 함수가 호출되었을 때 정적(Lexical) 환경에다가 함수 안에 변수와 함수를 설정하고 이외에 처리는 하지 않는다.
  - 즉, ES3는 두 번 동작하고 ES5는 한 번만 처리 -> 따라서 정적 환경이 더 빠르다.

#### ES5에서 Scope Chain

- `Scope Chain` 형태를 정적환경의 `선언적 환경 레코드(Declarative Environment Record)로 대체하고, 함수의 변수와 함수 이름을 바인드시킨다고 나온다.
- 즉 ES5에서 `Scope Chain`을 사용하지 않으면서 유일한 하나의 콘텍스트를 만들 수 있다.
- 콘텍스트 구조에 맞춰 코드를 작성하면 함수가 호출되어 메모리에 올라갈 때 콘텍스트 하나만 올라가면 되기 때문에 심플하고 처리가 빠르다.

### 정적 환경(Lexical Environment)

- function 키워드를 만나면
  - function 오브젝트를 생성하고
  - 스코프를 FO(Function Object)의 [[Scope]]에 설정
  - 이것은 함수 밖의 스코프가 설정되는 것
    - 함수가 속한 스코프로 설정된 것으로 즉, 아직 함수 안으로 들어간 것은 아니다.
  - **_따라서, 이 시점에서 스코프가 결정된다._**
    - 함수가 호출되었을 때 결정되는 것이 아니라 function 키워드를 만났을 때 결정 -> 정적
    - 이것이 `Lexical Environment(정적 환경)`
- 함수 밖에 있는 변수와 ㅎ마수, 함수 안에 있는 변수와 함수릃 하나의 렉시컬 정적 개념으로 사용할 수 있다.
  - 즉, 하나의 콘텍스트!

### var 키워드 사용하지 않았을 때의 문제

- 함수에서 var 키워드를 사용하지 않고 변수를 선언하면 글로벌 오브젝트에 설정된다.
  - 함수 안에 몇 단게 내려가서 거기서 var 키워드를 사용하지 않고 변수를 선언하면 몇 단게 위에 있는 글로벌 오브젝트에 설정되어 버린다.
    - Scope Chain이 적용되어 버린다.
  - 렉시컬 환경 구조에 맞지 않다.
    - 함수 밖에 있는 것과 함수 안에 있는 것으로 두 개 단계의 계층만 갖고 있는데 몇 단계 올리는 것은 위배된다.
  - 함수 안에서 var 키워드를 사용하면 함수 안에서 작동되는 로컬 변수가 되지만 호이스팅이 발생한다.
    - 그리고 글로벌 오브젝트 안에서 작성한다면 var 변수 또한 글로벌 변수가 되어 window 오브젝트에 설정된다.
- ES5 해결 방법
  - `"use strict"` 사용
  - var 키워드를 사용하지 않고 변수를 선언하면 에러 발생시킨다.
  - ES5 환경에서 처음에 `"use stict"`를 작성하는 것은 필수 아닌 필수!
- ES6 해결 방법
  - let 변수, const 변수
  - 좀 더 근본적으로 var 키워드를 사용하지 않아 생기는 정적 환경의 문제를 해결한다.
  - 변수 자체에 스코프 제약을 둔다 -> 렉시컬 환경 구조를 유지!

## 02. Function 오브젝트

### 함수 실행 환경 인식

- 함수 실행 환경 인식이 필요한 이유는?
  - 함수가 호출되었을 때 실행될 환경을 알아야 실행 환경에 맞추어 실행할 수 있기 때문이다.
- 실행 환경 설정 시점
  - function 키워드를 만나 function 오브젝트를 생성할 때 `정적`으로 설정한다.
- 설정하는 것
  - 실행 영역(함수가 속한 스코프) -> 정적 스코프 -> 렉시컬 환경
  - 따라서 스코프를 딱 한 번만 만들면 된다.

### 함수 실행 환경 저장

- function 오브젝트를 생성하고 바로 실행하지 않으므로 함수가 호출되었을 때 바로 사용할 수 있도록 환경을 저장해야 한다.
- 어디에 저장?
  - 함수가 실행될 영역을 별도로 만들어서 거기에 저장하는 것이 아니라
  - 생성한 function 오브젝트에 저장한다.
    - 즉, 생성한 Function 오브젝트를 읽으면 그 안에 함수가 실행될 수 있는 환경이 설정되어 있다.
  - function 오브젝트의 내부 프로퍼티(\* {name: value} 형태)로 인식한 환경을 설정

### 내부 프로퍼티

- 엔진이 내부 처리에 사용하는 프로퍼티로 스펙 표기로 외부에서 사용이 불가능하다.
  - 즉, 내부 프로퍼티는 엔진 내부에서 사용하는 것이므로 개발자 프로그램에서 값을 액세스할 수 없다.
- 스펙 표기
  - [[]] 형태로 대괄호 두개 안에 프로퍼티 이름을 작성한다.
  - [[Scope]]는 스코프를 의미

#### 내부 프로퍼티 분류

- 공통 프로퍼티
  - 모든 오브젝트에 공통으로 설정되는 프로퍼티
  - 위의 모든 오브젝트는 빌트인 오브젝트로 만드는 오브젝트를 의미한다.
- 선택적 프로퍼티
  - 오브젝트에 따라 선택적으로 설정되는 프로퍼티
  - ex) Array 오브젝트에는 설정되지만 String 오브젝트에는 설정되지 않는 프로퍼티를 의미함
  - 즉, 해당되는 오브젝트에만 설정한다.

#### 공통 프로퍼티

| 프로퍼티 이름            | 값 형태             | 개요                                      |
| ------------------------ | ------------------- | ----------------------------------------- |
| [[Prototype]]            | Object 또는 Null    | 오브젝트의 prototype                      |
| [[Class]] String         | 오브젝트 유형 구분  |
| [[Extensible]]           | Boolean             | 오브젝트에 프로퍼티 추가 가능 여부        |
| [[Get]]                  | any                 | 이름의 프로퍼티 값(\* getter라고 보면 됨) |
| [[GetOwnProperty]]       | 프로퍼티 디스크립터 | 오브젝트 소유의 프로퍼티 디스크립터 속성  |
| [[GetProperty]]          | 프로퍼티 디스크립터 | 오브젝트의 프로퍼티 디스크립터 속성       |
| [[Put]]                  |                     | 프로퍼티 이름으로 프로퍼티 값 설정        |
| [[CanPut]]               | Boolean             | 값(value) 설정 가능 여부                  |
| [[HasProperty]]          | Boolean             | 프로퍼티의 존재 여부                      |
| [[Delete]]               | Boolean             | 오브젝트에서 프로퍼티 삭제 가능 여부      |
| [[DefaultValue]]         | any                 | 오브젝트의 디폴트 값                      |
| [[[DefinedOwnProperty]]] | Boolean             | 프로퍼티 추가, 프로퍼티 값 변경 가능 여부 |

#### 선택적 내부 프로퍼티

- 오브젝트에 따라 선택적 설정

  | 프로퍼티 이름        | 값 형태       | 개요                                                        |
  | -------------------- | ------------- | ----------------------------------------------------------- |
  | [[PrimitiveValue]]   | 프리미티브 값 | Boolean, Date, Number, String에서 제공                      |
  | [[Construct]]        | Object        | new 연산자로 호출되며 인스턴스를 생성                       |
  | [[Call]]             | any           | 함수 호출                                                   |
  | [[HasInstance]]      | Boolean       | 지정한 오브젝트로 생성한 인스턴스 여부                      |
  | [[Scope]]            | 렉시컬 환경   | Function 오브젝트가 실행되는 렉시컬(정적) 환경              |
  | [[FormalParameters]] | 문자열 리스트 | 호출된 함수의 파라미터 이름 리스트                          |
  | [[Code]]             | JS 코드       | 함수에 작성한 JS 코드 설정, 함수가 호출되었을 때 해석, 실행 |
  | [[TargetFunction]]   | Object        | Function 오브젝트의 bind()에 생성한 타깃 함수 오브젝트 설정 |
  | [[BoundThis]]        | any           | bind()에 바인딩된 this 오브젝트                             |
  | [[BoundArguments]]   | 리스트        | bind()에 바인딩된 아규먼트 리스트                           |
  | [[Match]]            | 매치 결과     | 정규표현식의 매치 결과                                      |
  | [[ParameterMap]]     | Object        | 아규먼트 오브젝트와 함수의 파라미터 매핑                    |

### 함수 코드 해석 순서

```javascript
function book() {
  debugger;
  var title = "JS책";
  function getBook() {
    return title;
  }
  var readBook = function () {};
  getBook();
}

book();
```

#### 1. 함수 선언문 해석

- 마지막 줄에서 book() 함수를 호출한다.
- 엔진이 book 함수의 첫 번째 줄로 이동한다.(\* 아직 debugger 실행X)
- 함수 안에서 함수 선언문을 찾는다.
  - 위에서 아래로 내려가면서 하나씩 검색
- function getBook(){}이 함수 선언문이므로 function 오브젝트를 생성한다.
- 더 이상 함수 선언문이 없으므로 다시 함수의 첫 번째 줄로 이동한다.

#### 2. 변수 초기화

- 아직 dubugger를 실행하지 않는다.
- var title = "JS책";
  - title 변수에 undefined를 할당(\* 아직 "JS책"을 할당하지 않음)
- var readBook = function(){};
  - readBook 변수에 undefined를 할당한다.
  - 함수 표현식은 변수를 선언만 함
- 여기까지가 초기화 단계이며 다시 함수의 첫 번째 줄로 이동한다.

#### 3. 코드 실행

- debugger를 실행하며, 실행이 멈춘다.
  - 위에 console.log를 호출할 때 getBook은 function 오브젝트가 출력되지만 나머지는 undefined인 이유
- var title = "JS책";
  - title 변수에 "JS책"을 할당한다.
  - 스코프에 완전한 형태로 저장된다.
- function getBook() {};
  - 실행이 아닌 선언이므로 다음 줄로 이동(그냥 패스)
- var readBook = function() {};
  - function 오브젝트를 생성하여 readBook 변수에 할당한다.
  - readBook이 function 오브젝트가 되므로 이제 readBook 함수를 호출할 수 있다.
  - 순서가 매우 중요한 이유다!
- getBook() 함수 호출
  - 지금까지와 같은 순서로 getBook() 함수의 함수와 변수를 초기화하고 코드를 실행한다.

### 호이스팅

- 함수 선언문은 초기화 단계에서 function 오브젝트를 생성하므로 어디에서도 함수를 호출할 수 있다.
  - 이러한 개념을 `호이스팅(Hoisting)`이라고 한다.

```javascript
// 호이스팅
var result = book();
console.log(result); // 호이스팅

function book() {
  return "호이스팅";
}

// 함수 표현식과 비교
var result2 = book2();
console.log(result2); // TypeError: book2 is not a function

var book2 = function () {
  return "호이스팅";
};
```

## 03. 스코프

### 스코프 목적

- 범위를 제한하여 **_식별자를 해결_** 하려는 것
  - 스코프에서 식별자를 해결
  - 한국에서 '허재원'을 찾는 것보다 서울에서 '허재원'을 찾는 것이 더 빠른 것처럼

#### 식별자 해결(Identifier Resolution)

- 변수 이름, 함수 이름을 찾는 것! -> 어디서? 스코프에서!
- 이름을 찾게 되면 값을 구할 수 있음
- 크게는 이름을 설정하는 것도 식별자 해결
  - 스코프에 변수 이름을 `등록` -> 나중에 사용하자는 것에 목적이 있는 것
  - `검색`을 통해 식별자를 찾음
  - 등록과 검색을 통칭해서 `식별자 해결`이라고 부름

### 스코프 매커니즘

```javascript
// 스코프 설정
function book() {
  var point = 123;
  function get() {
    console.log(point);
  }
  get();
}
book();
```

- 엔진이 function book(){}을 만나 function 오브젝트를 생성하고 스코프를 설정한다.
  - 생성한 funciton 오브젝트의 내부 프로퍼티인 [[Scope]]에 스코프를 설정한다.
  - 위의 과정이 JS의 스코프 설정 메커니즘으로 `정적 스코프`를 취한다.
    - 정적 스코프: function 오브젝트를 만드는 시점에 스코프를 결정하는 것 -> 부담이 적고 효율성이 높음
    - 함수를 호출할 때마다 스코프를 결정하는 것을 '동적 스코프'라고 하고 부담이 크고 효율성이 낮다.
- 마지막 줄에 book() 함수를 호출하면 엔진이 book() 함수 안으로 이동한다.
- book() 함수 안에서 함수 선언문을 찾아서 해석한다. -> get() 함수가 해당
  - function 오브젝트를 생성하고 스코프를 funciton 오브젝트의 [[Scope]]에 설정하면서 결정된다.
  - 이 때, 스코프의 개념은 영억, 범위의 개념 -> get() 함수가 속한 3 ~ 7번 줄까지
  - 따라서, 스코프에 속한 변수(point)를 get() 함수에서 쉽게 검색할 수 있는 것이다.

### 글로벌 오브젝트

```javascript
// <script src="./abc.js">
var value = 100;
function book() {
  return value + 50;
}

// <script src="./abc.js">
var value = 100;
function book() {
  return value + 50;
}
```

- JS 소스 파일 전체에서 글로벌 오브젝트는 하나만 있다.
  - new 연산자로 인스턴스 생성 불가 -> 생성할 수 있으면 하나만 존재한다는 전제에 위배
- JS 소스 파일 전체 기준
  - \<script>에 작성된 모든 코드, 모든 코드에 사용 가능하다.
- abc.js 파일 코드에서
  - value 변수는 스코프 어딘가에 저장되는데 그 저장되는 곳이 글로벌 오브젝트!
  - book 함수도 마찬가지이다.
- def.js 파일 코드에서
  - console.log(value)를 실행하면 글로벌 오브젝트에 가서 value 변수를 찾을 수 있다. -> 식별자 해결
  - 글로벌 오브젝트에 작성된 변수 value 값을 출력, book() 함수를 호출할 수 있다.
- 즉, 글로벌 오브젝트는 스코프 역할을 할 수 있다.

### 글로벌 스코프

- 글로벌 오브젝트는 하나만 존재하므로 글로벌 오브젝트 = 글로벌 스코프라고 할 수 있다.
  - 하지만 스코프는 식별자 해결 즉, 엔진 관점이고
  - 오브젝트는 함수와 변수를 작성하기 위한 개발자 관점에서 봐야 한다.

## 04. Execution Context

### 실행 콘텍스트

- 함수가 실행되는 영역, 묶음
- 함수 코드를 실행하고 실행 결과를 저장한다.
- [실행 콘텍스트 스펙](https://262.ecma-international.org/12.0/#sec-executable-code-and-execution-contexts)

```javascript
function music(title) {
  var musicTitle = title;
}
```

- music("음악")으로 함수를 호출하면 엔진은 실행 콘텍스트를 생성하고 실행 콘텍스트 안으로 이동한다.

### 실행 콘텍스트 상태 컴포넌트

```javascript
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {},
  변수 환경 컴포넌트(VEC): {},
  this 바인딩 컴포넌트(TBC): {}
}
```

- 실행 콘텍스트 상태를 위한 오브젝트
  - 실행 콘텍스트 안에 생성된다.
  - 실행 콘텍스트와 상태 컴포넌트도 프로퍼티 형태로 저장하기 때문에 오브젝트에 해당
- 상태 컴포넌트 유형
  - 렉시컬 환경 컴포넌트(LEC): Lexical Environment Component
  - 변수 환경 컴포넌트(VEC): Variable Environment Component
  - this 바인딩 컴포넌트(TBC): This Binding Component
- LEC와 VEC은 초깃값이 같지만 구분하는 이유
  - 보호를 하기 위해, 다시 돌아왔을 때 변수 환경의 초깃값을 렉시컬 환경에다가 설정하기 위함이다.
- LEC는 정적 환경이지만 더 깊이 들어가면 글로벌 환경, 동적 환경을 같이 사용할 수 있다.

### 렉시컬 환경 컴포넌트

- 함수와 변수의 식별자 해결을 위한 환경 설정
- 함수 초기화 단계에서 해석한 함수와 변수를 { name: value } 형태로 저장한다.
  - 변수는 name과 undefined로 저장
  - 함수 선언문은 name과 function 오브젝트로 저장
- 함수 밖의 함수와 변수 참조 환경 설정
  - 즉, 내가 속한 오브젝트의 환경을 컴포넌트에 설정하는 것
  - 렉시컬 환경 컴포넌트 안에서 함수 밖의 함수와 변ㅅ를 사용할 수 있게 된다.
- 위의 과정을 통해 하나의 콘텍스트가 되는 것이다.
  - 함수 안에 있는 변수/함수 + 함수 밖에 있는 변수/함수를 하나의 묶음으로 `렉시컬 환경 컴포넌트`에 만들어 버린다.
  - 이것은 심플해지고 엔진이 처리하는데 속도가 빨라져 효율이 좋다.

### 렉시컬 환경 컴포넌트 구성 및 설정

```javascript
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {
    환경 레코드(ER): {
      point: 100
    },
    외부 렉시컬 환경 참조(OLER): {
      title: "책",
      getTitle: function() {}
    }
  },
  // ...
}
```

- 렉시컬 환경 컴포넌트 생성
  - 생성 시점: function, try-catch를 만났을 때 생성한다.
- 컴포넌트 구성
  - 환경 레코드(ER: Environment Record)
  - 외부 렉시컬 환경 참조(OLER: Outer Lexical Environment Reference)
- 환경 레코드에 함수 안의 함수와 변수를 기록한다.
- 외부 렉시컬 환경 참조에 function 오브젝트의 내부 프로퍼티인 [[Scope]]를 설정
  - 함수 밖의 함수와 변수를 기록한다.
- 렉시컬 환경 컴포넌트 관점에서 보면 환경 레코드, 외부 렉시컬 환경 참조 모두 하나의 오브젝트에 속한다.
  - 따라서 하나의 콘텍스트 개념을 사용할 수 있어 프로퍼티 액세스하듯 함수 안과 밖의 함수와 변수를 사용할 수 있따.

### 외부 렉시컬 환경 참조

- 스코프와 실행 중인 함수가 Context 형태이므로 스코프의 변수와 함수를 별도의 처리 없이 즉시 사용할 수 있다.
- 실행 콘텍스트에서 함수 안과 밖의 함수, 변수를 사용할 수 있으므로
  - <b>함수와 변수를 찾기 위해 실행 콘텍스트를 벗어나지 않아도 된다.</b>

### 변수 환경 컴포넌트

```javascript
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {},
  변수 환경 컴포넌트(VEC): {},
  this 바인딩 컴포넌트(TBC): {}
}
```

- 렉시컬 환경 컴포넌트와 같은 레벨
- 실행 콘텍스트 초기화 단계에서 렉시컬 환경 컴포넌트와 같게 설정한다.
- 이렇게 하는 이유는? <b>초깃값 복원</b>할 때 사용하기 위한 것!
- 함수 코드가 실행되면 실행 결과를 렉시컬 환경 컴포넌트에 설정한다.
  - 변수에다가 값을 할당하면 현재 초깃값 상태에서는 변수 이름과 undefined로 설정되어 있기 때문에 값이 변경되었다고 볼 수 있다
    - 변경된 값이 렉시컬 환경 컴포넌트에 설정된다.
  - 한 번만 변경하게 되면 렉시컬 환경 컴포넌트(LEC)와 변수 환경 컴포넌트(VEC)는 다르게 된다.
  - 나중에 가서 렉시컬 환경 컴포넌트에 있는 것을 지우고 초기 환경으로 바꿀 때 변수 환경 컴포넌트로 리프레시 시킨다.
- 즉, 초깃값이 변하게 되므로 이를 유지하기 위한 것이다!

### 콘텍스트 실행 과정

```javascript
var base = 200;
function getPoint(bonus) {
  var point = 100;
  return point + base + bonus;
}
console.log(getPoint(70)); // 370
```

- getPoint 오브젝트의 [[Scope]]에 글로벌 오브젝트 설정
- 마지막 줄에서 getPoint() 함수 호출하면 엔진은 실행 콘텍스트를 생성하고 실행 콘텍스트 안으로 이동한다.

#### 준비 단계

- 컴포넌트를 생성하여 실행 콘텍스트에 첨부한다.
  - 렉시컬 환경 컴포넌트
  - 변수 환경 컴포넌트
  - this 바인딩 컴포넌트
- 환경 레코드를 생성하여 렉시컬 환경 컴포넌트에 첨부한다.
  - 나중에 실행하는 과정에서 함수 안의 함수, 변수를 바인딩한다.
- 외부 렉시컬 환경 참조를 생성하여 렉시컬 환경 컴포넌트에 첨부하고
  - getPoint function 오브젝트가 스코프로 설정된 [[Scope]]로 참조한다.

```
// 지금까지의 모습
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {
    환경 레코드(ER): {},
    외부 렉시컬 환경 참조(OLER): {
      base: 200
    }
  },
  변수 환경 컴포넌트(VEC): {},
  this 바인딩 컴포넌트(TBC): {}
}
```

#### 초기화 단계

- 호출한 함수의 파라미터 값을 호출된 함수의 파라미터 이름에 매핑
  - 70을 bonus에 매핑시킨다.
  - 환경 레코드에 작성한다.
    - 함수 선언문이나 변수에 초깃값을 설정하기 전에 함
- 함수 선언문을 function 오브젝트로 생성한다.
- 함수 표현식과 변수에 초깃값을 설정한다.
- 여기까지는 외부에 아래와 같은 실행 상태를 제공하지 않는다.
  - 그래서 이 상태에서는 개발자가 자바스크립트 코드로 실행 상태의 값을 설정하거나 다른 처리가 불가능

```
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {
    환경 레코드(ER): {
      bonus: 70,
      point: undefined
    },
    외부 렉시컬 환경 참조(OLER): {
      base: 200
    }
  },
  변수 환경 컴포넌트(VEC): {},
  this 바인딩 컴포넌트(TBC): {}
}
```

#### 실행 단계

- 다시 올라가 함수 안의 코드를 실행한다
  - var point = 100;
- 실행 콘텍스트 안에서 관련된 함수와 변수를 사용할 수 있다.

```
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {
    환경 레코드(ER): {
      bonus: 70,
      point: 100
    },
    외부 렉시컬 환경 참조(OLER): {
      base: 200
    }
  },
  변수 환경 컴포넌트(VEC): {},
  this 바인딩 컴포넌트(TBC): {}
}
```

- return 문을 만나서 표현식을 평가하면 point 변수를 식별자 해결하는데 환경 레코드 안의 값으로 100을 설정한다.
  - base 변수는 함수 밖에 있는 변수, 함수를 참조하는 외부 렉시컬 환경 참조의 값으로 200이 설정된다.
  - bonuse는 파라미터 값으로 설정된다.
  - point + base + bonus = 370이 리턴(반환)된다.
- 위의 과정처럼 실행 콘텍스트 -> 렉시컬 환경 (컴포넌트) 안에서 모든 것을 처리하므로 엔진 처리 속도가 빠르다.

### 환경 레코드 구성

```
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {
    환경 레코드(ER): {
      선언적 환경 레코드(DER): {
        point: 123
      },
      오브젝트 환경 레코드(OER): {}
    },
    외부 렉시컬 환경 참조(OLER): {}
  },
  변수 환경 컴포넌트(VEC): {},
  this 바인딩 컴포넌트(TBC): {}
}
```

- 환경 레코드를 구분하는 이유
  - 기록 대상에 따라 다르기 때문이다.
  - 기록 대상에 따라 `선언적 환경 레코드(DER)`, `오브젝트 환경 레코드(OER)`에 기록한다.

* 정적인 것은 `선언적 환경 레코드`에 저장하고, 동적인 것은 `오브젝트 환경 레코드`에 저장한다.

#### 선언적 환경 레코드

- DER: Declaritive Environment Record
- function, 변수, catch 문에서 사용
- 위에서 환경 레코드에 설정하였는데 실제로는 DER에 저장된다.

#### 오브젝트 환경 레코드

- OER: Object Environment Record
- 글로벌 함수와 변수, with 문에서 사용한다.
- 정적이 아니라 동적이기 때문이다.

#### 글로벌 환경

```
실행 콘텍스트(EC): {
  글로벌 환경(GE): {
    환경 레코드(ER): {
      오브젝트 환경 레코드(OER): 글로벌 오브젝트
    },
    외부 렉시컬 환경 참조(OLER): null
  }
}
```

- Global Environment
  - 글로벌 오브젝트에서 사용한다.
  - 렉시컬 환경 컴포넌트와 형태가 같다.
    - 선언적 환경 레코드는 없다.
    - 정적이 아닌 동적으로 반영한다.
    - 그 외에 처리 방법은 같다.
- 동적으로 함수와 변수 바인딩한다.
  - 함수에서 var 키워드를 사용하지 않고 변수를 선언하면 글로벌 오브젝트에 설정되기 때문이다.
    - 정적으로 저장하는 것과는 달리 계층적으로 엄청 밑에 있어도 var 키워드를 사용하지 않으면 글로벌 오브제그가 되기 때문에 정적 개념이 깨지게 된다.
  - 글로벌 오브젝트는 소스 전체에서 하나만 있기 때문에 글로벌 환경을 하나만 만들어 놓으면 어느 코드에서든지 환경 레코드에 동적으로 저장할 수 있다.
  - 이런 이유로 오브젝트 환경 레코드 사용한다.
- 글로벌 오브젝트는 어디에 속하지 않기 때문에 외부 렉시컬 환경 참조값은 null

### this 바인딩 컴포넌트

- 목적
  - this로 함수를 호출한 오브젝트의 프로퍼티에 액세스(접근)
  - this.propertyName 형태로 액세스할 수 있도록 this로 액세스할 오브젝트를 바인딩시켜 놓은 것!
- 액세스 매커니즘
  - obj.book() 형태에서 this는 obj를 참조할 수 있도록 this 바인딩 컴포넌트에 obj을 바인딩시켜 놓는다.
- obj의 프로퍼티가 변경되면 `동적`으로 참조
  - 설정, 할당이 아닌 말 그대로 `참조`이기 때문이다.

### this 바인딩 컴포넌트 설정 및 사용 과정

- getPoint() 함수에서 100이 반환되는 과정

```javascript
var obj = { point: 100 };
obj.getPoint = function () {
  return this.point;
};
console.log(obj.getPoint());
```

```
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {
    환경 레코드(ER): {
      선언적 환경 레코드(DER): {},
      오브젝트 환경 레코드(OER): {}
    },
    외부 렉시컬 환경 참조: {}
  },
  변수 환경 컴포넌트: {},
  this 바인딩 컴포넌트(TBC): {
    point: 100,
    getPoint: function() {}
  }
}
```

#### 준비 단계

- 마지막 줄에서 obj.getPoint() 함수 호출
- 실행 콘텍스트 생성
- 3 개의 컴포넌트 생성
  - 렉시컬/변수 환경 컴포너트, this 바인딩 컴포넌트
- this 바인딩 컴포넌트에 getPoint()에서 this로 obj의 프로퍼티를 참조해서 사용할 수 있도록 바인딩
  - 함수를 호출사는 시점에 this로 바인딩, 묶어 놓음
  - 따라서, 함수 안에서 바로 obj를 참조할 수 있게 된다.

#### 초기화 단계

- 함수 안에 파라미터, 함수 표현식, 변수 초기화하지만 선언된 것이 없다.

#### 실행 단계

- return this.point;
  - return 문을 만나 표현식을 평가 -> this.point로 값을 구한다.
- this 바인딩 컴포넌트에서 point 검색
  - getPoint() 함수를 호출하는 오브젝트가 this 바인딩 컴포넌트에 설정(참조)된 상태
  - 따라서 this는 obj.getPoint() 함수가 호출되었을 때 바인딩 시켜놓은 것이다.
- this 바인딩 컴포넌트에 point 프로퍼티가 있으므로 100을 반환한다.

### 호출 스택

- Call Stack
  - 실행 콘텍스트의
    논리적 구조
- FILO(First-in Last-out) 순서
  - 함수가 호출되면 스택의 가장 위에 실행 콘텍스트가 위치하게 된다.
  - 다시 함수 안에서 함수를 호출하면 호출된 함수의 실행 콘텍스트가 스택의 가장 위에 놓이게 된다.
  - 함수가 종료되면 스택에서 빠져 나온다
  - FILO 순서를 가질 수 있는 이유는 JS는 `싱글 스레드`이기 때문이다.

## 05. Function Instance

### Function 인스턴스 생성

```javascript
function Book(point) {
  this.point = point;
}
Book.prototype.getPoint = function () {
  return this.point + 200;
};
var obj = new Book(100);
console.log(obj.point); // 100
console.log(obj.getPoint()); // 300
```

- function Book(point) {}
  - Book 오브젝트를 생성한다.
  - 엔진이 자동으로 Book.prototype(\* { key: value } 형태)을 만든다.
    - 따라서 점(.)을 사용하여 프로퍼티를 연결할 수 있다.
- Book.prototype.getPoint = function() {}
  - Book.prototype에 getPoint를 연결하고 function(){}을 할당한다.
  - 프로퍼티 관점에서 getPoint는 프로퍼티 이름, function(){}은 프로퍼티 값
- var obj = new Book(100);
  - Book()을 실행하며 인스턴스를 생성하고 생성한 인스턴스에 point 값을 설정한다.
  - 이 때 this는 생성한 인스턴스를 참조한다. -> { point: 100 } 형태로 저장됨
- Book.prototype에 연결된 모든 프로퍼티(메서드)를 생성한 인스턴스에 할당한다.
  - { getPoint: function() {} } 형태
- cosole.log(obj.getPoint());
  - obj 인스턴스의 메서드를 호출한다.(\* prototype은 작성하지 않아도 된다.)
- return this.point + 200에서 this가 obj 인스턴스를 참조하므로 100 + 200 반환

### 생성자 함수

- new 연산자와 함께 인스턴스를 생성하는 함수
  - new Book()에서 Book()이 생성자 함수
- new 연산자
  - 인스턴스 생성을 제어하고, 생성자 함수를 호출한다.
- 생성자 함수
  - 인스턴스 생성하고 반환한다.
  - 인스턴스에 초깃값을 설정한다.
- new 연산자가 생성자 함수를 호출하면 생성자 함수에서 인스턴스를 생성하고 반환하면 new 연산자는 이것을 받아서 반환한다.

### 인스턴스 생성 과정

```javascript
function Book(point) {
  this.point = point;
}
Book.prototype.getPoint = function () {
  return this.point;
};
var bookObj = new Book(10);
```

```
Book 인스턴스: {
	point: 10,
	[[Prototype]]: {
		constructor: Book,
		getPoint: function() {},
		[[Prototype]]: Object
	}
}
```

- new Book(10)을 실행하면 Book 오브젝트의 [[Construct]] 호출하여 파라미터 값을 [[Construct]]로 넘겨준다.
  - 인스턴스 프로퍼티로 설정된다(\* { point: 10 } 형태)
- [[Construct]]는 빈 Object를 생성하고 이것이 인스턴스이다!
  - 현재는 빈 오브젝트이며 이제부터 하나씩 채워간다.
- 오브젝트에 내부 처리용 프로퍼티를 설정한다.
  - 공통 프로퍼티와 선택적 프로퍼티
  - 오브젝트의 [[Class]]에 "Object"를 설정한다.
  - 따라서 생성한 인스턴스 타입은 Object
- Book.prototype에 연결된 프로퍼티(메서드)를 생성한 인스턴스의 [[Prototype]]에 설정한다.
  - 외부 프로퍼티인 constructor도 같이 설정된다.

### constructor 프로퍼티

- 생성하는 function 오브젝트를 참조한다.
  - function 오브젝트르 생성할 때 설정되며
  - prototype이 Book function 오브젝트에 연결되고 prototype에 constructor가 연결되어 있다.
  - 이 때, constructor의 값은 Book function 오브젝트 전체를 참조한다.

#### constructor 비교

```javascript
// constructor 비교
var Book = function () {};
var result = Book === Book.prototype.constructor;
console.log("1: " + result); // 1: true

var obj = new Book();
console.log("2: " + (Book === obj.constructor)); // 2: true
console.log("3: " + typeof Book); // 3: function
console.log("4: " + typeof obj); // 4: object
```

- Book === Book.prototype.constructor
  - 실행 결과 1번이 true가 출력된 것은 Book 오브젝트와 Book.prototype.constructor가 타입까지 같다는 뜻
  - Book 오브젝트를 생성할 때 Book.prototype.constructor가 Book 오브젝트 "전체"를 참조하기 때문이다.
- Book === obj.constructor
  - obj의 constructor가 Book 오브젝트를 참조하므로 실행 결과 2번에 true가 출력된다.
- typeof Book;
  - Book 오브젝트의 타입은 function
- typeof obj;
  - obj 인스턴스의 타입은 object
  - 즉, function 오브젝트를 인스턴스로 생성했더니 `object`로 타입이 변경된 것을 확인할 수 있다.
  - 이것은 [[Construct]]가 실행될 때 생성한 오브젝트의 [[Class]]에 "Object"를 설정하기 때문이다.
- 오브젝트 타입이 바뀐다는 것은 오브젝트의 성격과 목적이 바뀐 것을 의미하고 prototype에 많은 메서드들이 연결되어 있다는 것!

### prototype 오브젝트 목적

- prototype 확장
  - prototype에 프로퍼티(메서드)를 연결하여 prototype를 확장한다
- 프로퍼티 공유
  - 생성한 인스턴스에서 원본 prototype의 프로퍼티를 공유한다.
  - `복사`가 아닌 `공유`의 개념인 이유
    - 복사한다면 메모리에 부담이 가게 되므로 원본 prototype의 메서드들을 공유하여 사용한다.
- 인스턴스 상속
  - function 인스턴스를 연결하여 상속할 수 있다.

### 인스턴스 상속

```javascript
// 인스턴스 상속
function Book(title) {
  this.title = title;
}
Book.prototype.getTitle = function () {
  return this.title;
};
function Point(title) {
  // call() 함수를 호출하여 파라미터 값을 넘겨줘서 파라미터 값을 this로 참조하는 현재 인스턴스에다가 할당
  Book.call(this, title); // super 생성자 호출
}
// Object.create() 함수를 호출하여 Book.prototye에 연결된 메소드들을 Point.prototype에 할당(연결)
// 하위클래스(Point)는 상위클래스(Book)를 확장
Point.prototype = Object.create(Book.prototype, {}); // 두 번째 파라미터는 Point.prototype이 갖는 메소드 작성
var obj = new Point("자바스크립트"); // new 연산자로 Point() 생성자 함수 호출
console.log(obj.getTitle());
console.log(obj instanceof Book); // true
console.log(obj instanceof Point); // true
console.log(typeof Point); // function
console.log(typeof obj); // object
```

- ES5에서 상속하는 방법은 새로운 function 인스턴스를 생성하여 상위 function 인스턴스를 정하고 그의 prototype을 연결시킨다.
  - ES5 상속은 OOP의 상속 기능 부족으로 ES6의 Class로 상속하여 사용한다.
  ```javascript
  // ES6 Class 상속
  class Book {
    constructor(title) {
      this.title = title;
    }
    getTitle() {
      return this.title;
    }
  }
  class Point extends Book {
    // 내부에서는 prototype 확장
    constructor(title) {
      super(title);
    }
  }
  const obj = new Point("자바스크립트");
  console.log(obj.getTitle()); // 자바스크립트
  ```

### 인스턴스 프로퍼티 우선 사용

```javascript
function Book(point) {
  this.point = point;
}
Book.prototype.getPoint = function () {
  return 100;
};
var obj = new Book(200);
obj.getPoint = function () {
  return this.point;
};
console.log(obj.getPoint()); // 200
```

```
// obj 형태
obj: {
  getPoint: function() {},
  point: 200,
  [[Prototype]]: {
    getPoint: function() {},
    constructor: Book(point),
    [[Prototype]]: Object
  }
}
```

- 생성한 인스턴스(obj)에 바로 getPoint 즉, 인스턴스 프로퍼티가 있으므로 100이 아닌 200을 반환한다.
  - 즉, 한 단계 더 들어간 prototype의 getPoint() 메서드가 아닌 인스턴스에 연결한 프로퍼티를 먼저 사용한다.
  - 인스턴스 프로퍼티는 공유되지 않는다.

## 06. this

### this 개요

- 함수가 되든 이벤트 핸들러 함수가 되든 함수 앞에 작성한 오브젝트를 함수 안에서 this로 참조한다.

### this와 글로벌 오브젝트

- 글로벌 오브젝트에서 this는 글로벌 오브젝트 참조한다.
  - 글로벌 함수를 호출할 때는 함수 앞에서다가 글로벌 오브젝트를 작성할 수 없고 묵시적으로 간주한다.
  - 글로벌 함수에서 this는 글로벌 오브젝트를 참조한다.
- this와 window 오브젝트
  - window는 JS에서 만든 것이 아니며 글로벌 오브젝트의 스코프도 아니다.
  - 하지만, window와 글로벌 오브젝트를 같은 선상에서 사용한다.
  - `Host 오브젝트` 개념 사용하낟.

```javascript
// this와 window 참조
console.log(this === window); // true
```

- true가 출력된다는 것은 값과 타입이 같다는 것
  - 글로벌 오브젝트에서 this는 window를 참조한다는 것을 알 수 있다.

```javascript
var value = 100;
console.log("window:", window.value); // window: 100
console.log("this:", this.value); // this: 100
console.log("global:", value); // 100
```

- var value = 100; => value는 글로벌 변수
- this.value
  - this가 글로벌 오브젝트를 참조하므로 this.value 형태로 글로벌 변수 사용 가능하다.
  - 그리고, window가 글로벌 오브젝트를 참조하므로 value를 사용할 수 있다.
  - window 오브젝트와 같이 다른 오브젝트를 마치 내 것처럼 사용하는 개념 -> `Host 오브젝트`
    - `Host 오브젝트` 개념으로 글로벌 오브젝트를 참조하는 this와 window가 같은 선상에서 사용

### this와 window 오브젝트

```javascript
// this와 window
window.onload = function () {
  console.log(this === window); // true
};

// this로 지역 변수 액세스
window.onload = function () {
  var value = 100;
  console.log(this.value); // undefined
};
```

- var value는 onload 핸들러 함수의 지역(로컬) 변수가 되므로
- this 바인딩 컴포넌트는 window 오브젝트를 참조하고 있어 value 값이 없으므로 undefined가 출력된다.
- this.value = 100; 형태로 값 할당
  ```javascript
  // this로 값 할당
  window.onload = function () {
    this.value = 100;
    console.log(window.value); // 100
  };
  ```
  - this.value = 100;은 this가 window 오브젝트를 참조하므로 글로벌 변수가 된다.
  - 따라서 window.value로 접근이 가능하다.

### this와 strict 모드

- 오브젝트.함수이름() 형태로 함수를 호출한다.
  - 글로벌 오브젝트는 오브젝트 이름이 없으므로 함수 이름만 작성하여 호출

* strict 모드에서는 window.book()처럼 book() 앞에 window를 글로벌 오브젝트로 무조건 작성해야 한다.
* 함수 앞에 오브젝트를 작성하지 않으면
  - this 바인딩 컴포넌트에 undefined가 설정되고 this로 window(글로벌 오브젝트)를 참조할 수 없다.

```javascript
function book() {
  "use strict";
  return this;
}
console.log(book()); // undefined
```

- 위 코드처럼 호출하는 book() 함수 앞에 오브젝트를 작성하지 않으면 즉, window.book() 작성하지 않으면
  - this 바인딩 컴포넌트에 undefined가 설정되기 때문에 return this에서 undefined를 반환한다.

```javascript
// window 오브젝트 작성
function book() {
  "use strict";
  return this;
}
var obj = window.book();
console.log(obj === window); // true
```

- 호출하는 book() 함수 앞에 window 오브젝트 작성
- book() 함수가 글로벌 함수가 되므로 return this에서 window를 반환한다.

### this 참조 오브젝트

> 함수는 자신을 호출한 바로 앞에 작성한 오브젝트를 함수 안에서 this로 참조한다.  
> 즉, 자신만의 this가 있는 것! -> 나중에 화살표 함수(Arrow Function)과의 차이점

```javascript
var book = {
  point: 100,
  member: {
    point: 200,
    get: function () {
      console.log(this === book.member); // true
      console.log(this.point); // 200
    },
  },
};
book.member.get();
```

- this가 참조하는 오브젝트
- 마지막 줄에서 book.member.get()을 호출하면 this가 book이 아닌 member 오브젝트를 참조한다.
  - book은 get()을 호출하는 경로 역할
- console.log(this === book.member)
  - 따라서 실행 결과 true가 출력되며 this가 book.member를 참조하기 때문에 this 바인딩 컴포넌트에 book.member 오브젝트가 설정(참조)된다.
- console.log(this.point);
  - this가 book.member를 참조하므로 book.member.point 프로퍼티 값인 200을 출력한다.

### this와 인스턴스

- 인스턴스 목적? 인스턴스마다 **_고유 값 유지_**
- 인스턴스에서 this의 목적
  - this로 인스턴스를 참조하여 this.name 형태로 프로퍼티에 접근한다.
  - name의 값이 function 오브젝트이면 name은 메서드 이름이 되고
  - name의 값이 number 타입이면 name은 프로퍼티 이름이 되는 식으로 접근할 수 있다.
- [[Prototype]] 프로퍼티 접근
  - new 연산자로 인스턴스를 생성하면 prototype에 연결된 프로퍼티가 인스턴스의 [[Prototype]]에 첨주된다.
  - this.method() 형태로 [[Prototype]]에 첨부된 메서드를 호출할 수 있다.
- 여기서 prototype에 연결된 메서드는 모든 인스턴스에서 `공유`할 수 있고, 인스턴스마다 고유값을 유지한다.
  - 일관된 환경에서 값만 다르게 가져가겠다는 시맨틱! -> 즉, 데이터 중심의 처리

```javascript
// this와 인스턴스
var book = {}; // book 오브젝트 생성
book.Point = function (point) {
  // book.Point로 생성자 함수를 선언
  this.point = point;
};
// prototype에 getPoint 메소드 생성
book.Point.prototype.getPoint = function () {
  console.log(this.point);
};
var obj = new book.Point(100); // book.Point() 생성자 함수를 호출하여 인스턴스 생성
obj.getPoint(); // 100
```

- var obj = new book.Point();
  - book.Point 인스턴스를 생성한다.
- this.point = point;
  - 파라미터 값으로 넘겨준 100을 this로 참조하는 인스턴스의 point 이름의 프로퍼티 값으로 할당한다.
  - this가 <b>생성한 인스턴스를 참조</b>하므로 point는 인스턴스 프로퍼티가 된다.
  - 이 논리로 <b>인스턴스마다 프로퍼티 이름과 값을 유지</b>할 수 있다!
- obj.getPoint()
  - obj 인스턴스의 getPoint() 메서드를 호출한다.

* console.log(this.point);
  - obj.getPoint()로 호출되어 해당 코드가 실행되는데 이 떄, this는 getPoint() 앞에 작성하 obj 인스턴스를 참조한다.

### this와 call()

| 구분     | 타입     | 데이터(값)                                  |
| -------- | -------- | ------------------------------------------- |
| object   | Function | 호출할 함수 이름                            |
| 파라미터 | object   | this로 참조할 오브젝트                      |
| 파라미터 | Any      | 파라미터opt, 콤마(,)로 구분, 다수 작성 가능 |
| 반환     | Any      | 호출된 함수에서 반환한 값                   |

- getTotal.call(this, 10, 20);
  - 함수명.call() 형태
  - 첫 번째는 파라미터 값으로 넘어가지 않고 두 번째부터 넘어간다.
  - getTotal() 함수에 10과 20이 파라미터 값으로 넘어간다.
- 첫 번째 파라미터에 호출된 함수에서 this로 참조할 오브젝트 작성한다.
  - 호출된 함수에서 this로 참조할 오브젝트 작성한다.
  - this 이외에 다른 오브젝트 사용 가능하다.
  - 첫 번째 파라미터에 작성된 오브젝트가 this 바인딩 컴포넌트에 바인딩된다.

#### this 사용

```javascript
// this와 call()
"use strict";
var value = 100;
function get(param) {
  return param + this.value; // 첫 번째 파라미터에 작성한 오브젝트를 참조
}
var result = get.call(this, 20);
console.log(result); // 120

// call()을 사용하지 않는다면
("use strict");
var value = 100;
function get(param) {
  return param + this.value; // 첫 번째 파라미터에 작성한 오브젝트를 참조
}
var result = get(20);
console.log(result); // get 함수 안의 this가 undefined를 참조
```

- get.call(this, 20);
  - 첫 번째 파라미터에 this 작성하면 글로벌 오브젝트 참조 -> window 오브젝트 참조
- return param + this.value
  - this가 글로벌 오브젝트를 참조하므로 120 반환
- 만약 get(20)으로 작성한다면 strict 환경에서 get 앞에 오브젝트트를 작성하지 않았으므로 window가 아닌 undefined를 참조해서 에러가 발생한다.

#### object 사용 예제

```javascript
// 오브젝트 사용
var get = function (value) {
  return this.base * this.rate + value;
};
var value = { base: 20, rate: 30 };
var result = get.call(value, 50);
console.log(result); // 650
```

- this로 참조할 오브젝트를 변경할 수 있는 것이 call()의 특징이다.
- var result = get.call(value, 50);
  - this는 value 오브젝트를 참조하므로 650이 반환된다.

#### 숫자 작성 예제

```javascript
// 숫자 작성
function get() {
  return this.valueOf();
}
var result = get.call(123);
console.log(result); // 123
```

- var result = get.call(123)
  - this가 오브젝트를 참조하므로 숫자(123)를 작성하면 에러가 발생하지만
  - 값(123) 타입에 해당하는 Number 인스턴스를 생성하고 123을 프리미티브 값으로 설정한다.
  - 따라서 this가 Number 인스턴스를 참조하게 된다.
- 별로 사용하지는 않는 유형

#### this 참조 변경

```javascript
// this 참조 변경
var book = {
  value: 123,
  point: {
    value: 456,
    get: function () {
      console.log(this.value);
    },
  },
};
book.point.get.call(book); // 123
book.point.get.call(book.point); // 456
```

- book.point.get.call(book);
  - book.point의 get() 호출
  - get()에서 this로 book 오브젝트를 참조하여 this.value는 123을 출력한다.
- book.point.get.call(book.point);
  - book.point의 get() 호출
  - get()에서 this로 book.point 오브젝트를 참조하므로 456이 출력된다.
