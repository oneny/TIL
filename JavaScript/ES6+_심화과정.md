# ES6+ 심화 과정의 주요 내용

> 출처: [자바스크립트 ES6+ 심화](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-es6-%EC%8B%AC%ED%99%94)

### Class

- 객체 지행 프로그래밍의 대명사
- 클래스와 인스턴스 구조 정리
  - 클래스를 생성하면 프로퍼티, prototype, [[Prototype]]이 만들어 진다.
    - prototype에는 constructor와 클래스에 작성한 메소드들이 연결된다.
    - [[Prototype]]에는 빌트인 Function 오브젝트의 prototype에 연결되어 있는 메서드들이 연결된다.
  - 인스턴스는 자신을 만든 클래스의 prototype에 연결되어 있는 constructor와 메서드가 참조된다.
- 상속을 받아 인스턴스를 만드는 가장 큰 목적
  - 인스턴스 100개를 만들어도 모두 메서드는 같고 인스턴스 프로퍼티만이 고유의 값을 가진다.
    - 여기서 행위와 속성으로 나누어 보면 행위는 메서드, 속성은 인스턴스 프로퍼티가 된다.
    - 즉, 인스턴스마다 프로퍼티를 가지고 그 프로퍼티마다 고유의 값을 가져가겠다는 것이 상속을 받아서 인스턴스를 만드는 가장 큰 목적
    - 인스턴스마다 모두 메서드를 만들면 중복으로 메모리에 부담

### Proxy, Proxy Trap, Reflect

- getter로 값을 구하면 바로 엔진이 처리 -> 중간에서 처리할 수 없음
- getter를 실행하면 Proxy가 받아 먼저 (개발자 코드로) 처리한 후, 엔진에게 넘겨주는 형태
- 개발자에게 확장성을 부여한 것

### Module

- 코드의 모듈화, 프로그래밍의 새로운 패턴
- 작게 만들어서 필요할 때마다 가져다 쓰는 형태

### Promise, async/await

- Promise: 비동기 실행 환경 -> 비동기란 처리가 연결되지 않고 끊어진다는 의미
  - 그러면 처리를 하는 것과 받는 것이 있어야 하는데 순서로 처리하는 것들이 어려울 때가 있음
  - 그럴 때 async/await을 사용해서 비동기 환경에서 동기로 실행할 수 있도록 한다.
- 많은 API의 기반 환경

### ArrayBuffer, TypedArray, DataView

- Number 타입의 데이터를 바이너리로 처리
- WebGL, 머신러닝/딥러닝의 이미지 처리에 필수

### Web Worker, SharedArrayBuffer, Atomics

- 멀티 스레드 환경의 병렬 처리 (<-> Promise는 병행 처리 즉, 스레드가 하나임)
- 동기 실행으로는 멀티 스레드 처리 불가 -> 비동기 실행이 필요
- Web Workers를 SharedArrayBuffer에서 사용

# 섹션 01. Class

## 자바스크립트와 OOP

- 객체 지향 프로그래밍 언어
  - OOP: Object Oriented Programming
- ECMAScript is an object-oriented programming language라고 스펙에 작성되어 있다.
  - 자바스크립트의 기반은 OOP 즉, 바탕이 객체 지행이다
- 다른 언어와 OOP 개념은 같지만 클래스 구조와 구현 방법이 다르다.
  - **_prototype에 메소드를 연결하는 구조_**
  - 연결된 메소드로 인스턴스를 생성

### 객체 구성 요소

OOP에서 Object(객체)는 자바스크립트의 Object({key: value}로 구성된 프로퍼티 집합)이 아니다.

- 형체, 실체가 있다!
- 행위와 속성으로 객체의 특성을 표현한다.
  - 행위(Behavior) -> 먹다, 마시다와 같은 동적인 모습
  - 속성(Attribute) -> 밥을 먹다, 물을 마시다와 같은 행위의 대상이 속성
  - A를 변수에 할당한다고 할 때 A가 속성이고 할당하는 동적인 것이 행위에 속함

### 객체의 구체화

객체(Object)를 코드로 구체화하면

- 객체는 클래스(Class)가 된다.
- 행위는 메소드(Method)가 된다.
- 속성은 프로퍼티(Property)가 된다.

#### 클래스에 메소드와 프로퍼티를 작성

- OOP의 Object(객체)는 클래스로 구현되고, 클래스 자체로는 사용할 수 없으며 new 연산자로 인스턴스를 생성해야 사용할 수 있다.

```javascript
// 인스턴스 생성
class Point {
  constructor(point) {
    this.point = point;
  }
  getPoint() {
    return this.point;
  }
}
const obj = new Point(100);
console.log(obj.point); // 100
console.log(obj.getPoint()); // 100
```

### Class 선언문, 표현식, 구조

#### Class 선언문

- `Syntax`: class Name { body }

#### Class 표현식

- `Syntax`: const/let Name = class { body }

#### Point Class 구조

위 Point 클래스를 펼치면 프로퍼티, prototype, [[Prototype]]이 있다.

- prototype을 펼치면 constructor와 getPoint()가 있다.
  - constructor는 Point 클래스 전체를 참조
  - 클래스에 메서드를 작성하면 prototype에 연결된다.
    - Point.prototype.getPoint = function(){} 형태로 작성한 것과 같다.
    - 엔진이 자동적으로 연결시켜준다.
  - [[Prototype]]에서 빌트인 Function 오브젝트의 prototype에 연결된 메소드를 참조할 수 있게 만들어 진다.

#### obj 인스턴스 구조

인스턴스를 만들면 내부 프로퍼티인 [[Prototype]]이 있다.

- **_클래스의 prototyp에 연결되어 있는 constructor와 getPoint()를 첨부시킨다.(\* 복사 X)_**
- 따라서 obj의 getPoint()를 호출하면 Point 클래스에 있는 getPoint() 메서드가 호출된다.
  - 즉, Point.prototype에 연결된 메서드로 인스턴스를 생성하고 [[Prototype]]에서 참조할 수 있도록 만든다.

### Computed Property Name

`Computed Property Name`은 표현식(expression)을 이용해 객체의 key 값을 정의하는 문법이다.

```javascript
const name = "홍길동";
const age = 26;

const obj = {
  [name]: "이름",
  [age]: "나이",
};

obj[name]; // 홍길동
obj["홍길동"]; // 홍길동
```

### Class에서 Computed Property Name 사용

```javascript
const name = "Point";
class Point {
  static ["get" + name](add) {
    return add ? 100 : 50;
  }
}
Point["get" + name](true); // 100
Point["getPoint"](true); // 100
Point.getPoint(true); // 100
```

- static은 정적 메서드로 클래스 이름에 메서드 이름으로 호출할 수 있다.

### 상속

- 상속(inheritance)은 OOP 기능 중 하나
  - **_클래스에 다른 클래스를 포함시키는 형태_**
  - 따라서 포함시킨 클래스의 메소드와 프로퍼티를 내 것처럼 사용할 수 있다.
- 상속해주는 클래스, 상속받을 클래스를 부모 클래스, 슈퍼(super) 클래스라고 부른다.
  - super 키워드로 슈퍼 클래스를 참조한다.
- 상속받는 클래스를 자식 클래스, 서브(sub) 클래스라고 부른다.

### extends 키워드

```javascript
// Book 클래스 생성
class Book {
  constructor(title) {
    this.title = title;
  }
  getTitle() {
    return this.title;
  }
}

// Book 클래스를 상속받는 Point 클래스 생성
class Point extends Book {
  constructor(title) {
    super(title);
  }

  setPoint(point) {
    this.point = point;
  }
}
const obj = new Point("책"); // Point 인스턴스 생성ㅇ
console.log(obj.getTitle()); // 책
```

- class Point extends Book {...}
  - Point가 상속받는 서브 클래스이고 Book이 상속해주는 슈퍼 클래스이다.
- 엔진이 extends 키워드를 만나면 Point 클래스에서 Book 클래스를 상속받아 구조적, 계층적인 형태를 만든다.
- Book.prototype에 연결된 메서드를 Point.prototype에 구조적으로 연결한다.
- console.log(obj.getTitle());
  - Point에서 title을 파라미터로 super로 올라가 obj 인스턴스는 { title: '책' } 프로퍼티를 갖게 된다.
  - 그리고 Point 클래스에는 getTitle() 메서드가 작성되어 있지 않지만 super 클래스에 getTitle() 메서드가 있어 이것을 호출한다.
    - 1층에 메서드가 없으면 2층으로 올라가서 찾는 형태이다!
- 만약 point에도 프로퍼티 값을 가지고 싶으면 obj.setPoint('포인트') 실행하면
  - obj는 { title: '책', point: '포인트' } 프로퍼티 형태를 갖는다.

### super 키워드

- super 키워드를 사용하여 슈퍼 클래스의 메서드를 호출할 수 있다.

```javascript
class Book {
  getTitle() {
    console.log("슈퍼");
  }
}
class Point extends Book {
  getTitle() {
    // 오버라이딩으로 인해 슈퍼 클래스의 getTitle()이 호출되지 않음
    super.getTitle(); // super 키워드를 사용하여 슈퍼 클래스의 getTitle() 호출
    console.log("서브");
  }
}

new Point().getTitle();
// 슈퍼
// 서브
```

### constructor 호출 규칙

#### 서브와 슈퍼에 constructor를 모두 작성하지 않으면 디폴트 constructor가 호출된다.

#### 서브에 작성하지 않고 슈퍼 클래스에만 작성하면 파타미터로 값을 부모로 넘겨준다.

```javascript
class Book {
  constructor(title) {
    this.title = title;
  }
}
class Point extends Book {}
const obj = new Point("책");
console.log(obj.title); // 책
```

#### 서브에는 작성하고 슈퍼에 작성하지 않으면 에러가 발생

```javascript
// 서브 클래스에만 작성
class Book {
  setTitle(title) {
    this.title = title;
  }
}
class Point extends Book {
  constructor(point) {
    this.point = point;
  }
}
const obj = new Point(100);
// Must call super constructor in derived class before accessing 'this' ... 에러 발생
```

#### 서브와 슈퍼에 constructor를 모두 작성하면 서브에서 super()를 호출해야 한다.
```javascript
// 서브와 슈퍼 모두 클래스 작성
class Book {
	constructor(title) {
		this.title = title;
	}
}
class Point extends Book {
	 constructor(title, point) {
		super(title);
		this.point = point;
	}
}
const obj = new Point("책", 100);
console.log(`${obj.title}, ${obj.point}`); // 책, 100
```

### Built-in 오브젝트 상속
* 빌트인 오브젝트를 상속받을 수 있다.
  * 인스턴스가 빌트인 오브젝트의 특징을 갖게 되며 this로 빌트인 오브젝트에 접근할 수 있다.
```javascript
class Point extends Array {
  constructor() {
    super();
  }

  getTotal() {
    let total = 0;
    for (const value of this) {
      total += value;
    }
    return total;
  }
}
const obj = new Point();
obj.push(10, 20, 30);
console.log(obj.getTotal()); // 60
```

### this 참조
* 인스턴스.메서드() 형태로 호출하면 메서드에서 this가 인스턴스를 참조
* static 메서드에서 this는 메서드가 속한 클래스를 참조
  * 인스턴스를 참조하지 않는다.
```javascript
class Point {
  static setPoint(point) {
    this.value = point;
  }
}
Point.setPoint(100);
console.log(Point.value); // 100
console.log(new Point().value); // undefined
```

### Generator 함수
* 클래스의 제너레이터 함수는 prototype에 연결되므로 인스턴스를 호출해야 한다.
```javascript
class Point() {
  *getPoint() {
    yield 10;
    yield 20;
  }
}
const gen = new Point();
const obj = gen.getPoint();
console.log(obj.next()); // { value: 10, done: false }
console.log(obj.next()); // { value: 20, done: false }
console.log(obj.next()); // { value: undefined, done: true }
```