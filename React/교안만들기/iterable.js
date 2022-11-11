//ES6에서 도입된 이터레이션 프로토콜(iteration protocol)은 순회 가능한 데이터 컬렉션(자료구조)을 만들기 위해 ECMAScript 사양에서 정의하여 미리 약속한 규칙이다.
// ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for ... of 문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화했다.

// 이터러블: String, Array, Map, Set, NodeList, HTMLCollection 등등 (Object X)
// 이터러블은 [Symbol.iterator]를 가진 애들이라 생각하면 된다.
const str = "string";
console.log(str[0]); // s
// 이터러블로 뭘 할 수 있는데? => for - of 문, 구조 분해 할당, 스프레드 문법
console.log(...str); // 값들의 목록이 출력된다.

const arr = [[1, 2], [3, 4], [5, 6]];

arr.forEach((item, i) => {
    console.log(item[0], item[1]);
});

arr.forEach(([a, b], i) => {
    console.log(a, b);
});

// 이터러블의 구조 분해 할당 기준은 인덱스 즉 순서대로 입니다.
const [s0, s1, s2, , s4] = str;
console.log(s0); // s
console.log(s1); // t
console.log(s2); // r
console.log(s4); // i가 아니라 n

// 이터러블 끼리는 자유롭게 구조 분해 할당 스프레드 문법이 가능하다.
const arr2 = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
const arr3 = [...new Set(arr2)]; 
// 아까 말씀드렸던 언제까지?
// const set = new Set(arr2); // Set(3) {1, 2, 3}
// const iterator = set[Symbol.iterator]();
// iterator.next(); // { value: 1, done: false }
// iterator.next(); // { value: 2, done: false }
// iterator.next(); // { value: 3, done: false }
// iterator.next(); // { value: undefined, done: true } <= done이 true일때까지!

// 이터러블은 for - of 문이 가능
for (let value of str) {
  console.log(value);
}

// s
// t
// r
// i
// n
// g
// 언제까지?
// const iterator = str[Symbol.iterator]();
// iterator.next(); { value: "s", done: false }
// iterator.next(); { value: "t", done: false }
// iterator.next(); { value: "r", done: false }
// iterator.next(); { value: "i", done: false }
// iterator.next(); { value: "n", done: false }
// iterator.next(); { value: "g", done: true }
// iterator.next(); { value: undefined, done: true } <= done이 true일때까지 루프를 돈다!

// 객체의 경우는 달라요 => 구조 분해 할당, 스프레드 문법, for - of 문은 XXXXXXXXX
const schools = [{
  name: "Yorktown",
  students: 100
},
{
  name: "Stratford",
  students: 120
},
{
  name: "Washington & Lee",
  students: 200
},
{
  name: "Wakefield",
  students: 300
},
];

// 객체의 구조 분해 할당 기준은 프로퍼티 키입니다.
const a = {
  oneny: 1,
  twony: 2,
  threeny: 3,
};

const { threeny, twony } = a;
console.log(threeny); // 3
console.log(twony); // 2

// 객체는 객체끼리만 구조 분해 할당, 스프레드 문법이 된다.
// const [oneny, twony] = a; // a is not iterable

// 객체는 이터러블이 아니므로 for-of문 안된다.
for (let value of a) {
  console.log(value); // a is not iterable
}

// forEach에서 구조 분해 해보기 
schools.forEach((school, i) => {
  console.log(school["name"], school["students"]);
});

schools.forEach(({ name, students }, i) => {
  console.log(name, students);
});