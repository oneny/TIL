## 빈 배열 조심

```js
try {
  const array = [];
  array.push('hi');
} catch (error) {
  error;
}
```

- array에 마우스를 올리면 never[]로 추론한다.
- never[] 타입으로 추론되면 array에는 아무 타입도 올 수 없다.

```js
try {
  const array: string[] = [];
  array.push('hi');
} catch (error) {
  error;
}
```

- 이렇게 타입을 지정해주자!

## `!`는 비추!

```js
const head = document.querySelector('#head')!;

if (head) {
  head.innerHTML = 'hello';
}
```

- `const head = document.querySelector('#head')!` -> head가 있음을 확신!
  - 하지만 세상에는 절대는 없기 때문에 비추다!
- 누군가가 `<div id='head'>`를 `<div id='header'>`로 바꿔버리는 순간 난리가 난다!
- 대신 `if (head) { head.innerHTML = 'hello'; }`로 작성하자! 얼마나 안전해!

## 원시 래퍼 타입, 템플릿 리터럴 타입, rest, 튜플

### 원시 래퍼 타입

```js
const a: string = 'hello';
const b: String = 'hell'; // String 대문자로 사용하는 순간 지옥이 펼쳐진다!!!

function c(a: string, b: string) {}
c(a, b); // Argument of type 'String' is not assignable to parameter of type 'string'
// ~
```

- 타입을 String 대문자로 사용하는 순간 지옥이 펼쳐진다.
- String 타입을 string에 적용할 수 없다! -> b에 오류가 발생

### 템플릿 리터럴 타입

```js
type World = "world";
const d: World = "world";

// type Greeting = 'hello word'
type Greeting = `hello ${World}`;
```

- `type Greeting = `hello ${World}`;`
  - 타입에서 ${World} 가능! -> 타입 추천을 더욱 정교하게 만들 수 있다.

### rest

```js
let arr: string[] = [];
let arr2: Array<string> = [];
function rest(...args: string[]) {}
```

### 튜플

```js
const tuple: [string, number] = ['1', 1];
tuple[2] = 'hello'; // Type '"hello"' is not assignable to type 'undefined'.
tuple.push('hello'); // 이거까지는 못막아준다.
```

- `tuple[2] = 'hello'` -> 에러가 발생한다.
- `tuple.push("hello");` -> push까지는 막아주지는 못한다.

## enum, keyof, typeof

### enum

```js
const enum EDirection {
  Up = 3,
  Down,
  Left,
  Right,
}

const a = EDirection.Up; // a는 3이 됨
const b = EDirection.Left; // b는 5가 됨

// 아래처럼 불규칙하게 정해줄 수도 있다.
// 잘 안사용함
const enum EDirection2 {
  Up = 3,
  Down = 6,
  Left = 4,
  Right = 8,
}

// enum 보다는 객체로 사용하는 것 추천!
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const // as const 쓰고 안쓰고 ODirect에 마우스 올려서 비교해보기!


const c = ODirection.Up
const d = ODirection.Left
```

- `as const` 없으면 Up: number로 추론, as const 있으면 Up: 0으로 추론
- `as const`를 사용하면 이 값들을 상수로 사용하겠다! + readonly(읽기 전용)!

#### enum과 객체 사용 비교

```js
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const

const a = EDirection.Up
const b = EDirection.Left
function walk(dir: EDirection) {}

// It requires an extra line to pull out the keys
type Direction = typeof ODirection[keyof typeof ODirection]
function run(dir: Direction) {}

walk(EDirection.Left)
run(ODirection.Right)
```

- `type Direction = typeof ODirection[keyof typeof ODirection]`
  - => `type Direction = 0 | 2 | 1 | 3`가 된다.

```js
// keyof - a, b, c만 꺼내오고 싶은 경우
const obj = { a: '123', b: 'hello', c: 'world' } as const;
// type Key = keyof obj; // 오브젝트는 값인데 형식으로 사용되고 있다.
type Key = keyof typeof obj;
// typeof obj -> { readonly a: "123"; readonlny b: "hello"; readonly c: "world" } 여기서 키만 뽑아낸다
type Value = typeof obj[keyof typeof obj]; // value들만 가져오게 됨 -> "123" | "hello" | "world"
// as const 없게 되면 널널하게 타입 추론하게 된다. 빼고 해보는 것 추천
```

- `type Key = keyof typeof obj;` -> `type Key = "a" | "b" | "c"`가 된다
- `type Value = typeof obj[keyof typeof obj];`는 value들만 가져오게 되므로
  - `type Value = "123" | "hello" | "world"`가 된다.

## uion(|)과 intersection(&)

```js
type A = { a: string }; // 간단하게 하고 싶으면 type!
const a: A = { a: 'hello' };

interface B {
  a: string;
} // interface는 상속받고 implement, 객체지향이 포함되어 있다.
const b: B = { a: 'hello' };

let c: number | string = 'hello';
c = 123; // string | number이기 때문에 가능!

type D = string & number; // never가 된다.
const a: D = 1; // string이면서 number인게 말이 안되니 당연히 에러!
//    ~ <- Type 'number' is not assignable to type 'never'.
type Obj = { hello: 'world' } & { name: 'oneny' };

const obj: Obj = {
  hello: 'world',
  name: 'oneny',
};

// union 사용하면 의미가 180도 다르다!! 주의!!
type Obj2 = { hello: 'world' } | { name: 'oneny' };
const obj2: Obj2 = {
  hello: 'world',
}; // 가능!
```

```js
// 안되는 코드!
// 아래를 허용하면 타입적으로 result도 맞아야 한다.
function add(x: string | number, y: string | number): string | number {
  return x + y;
}
const result: string = add(1, 2);
```

## 타입 애일리어스와 인터페이스의 상속(extends)

```js
type Animal = { breath: true };
type Mammal = Animal & { breed: true };
type Human = Mammal & { think: true };

const oneny: Human = {
  breath: true,
  breed: true,
  think: true,
};

// 위와 비슷하게 interface로
interface A {
  breath: true;
}

interface B extends A {
  breed: true;
}

const b: B = { breath: true, breed: true };

interface C extends Human { // interface에 type 적용!
  walk: true;
}

const twony: C = {
  breath: true,
  breed: true,
  think: true,
  walk: true,
}
```