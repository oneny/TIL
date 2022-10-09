# Vanilla JavaScript로 상태관리 시스템 만들기

> 출처: [Vanilla JavaScript로 상태관리 시스템 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/#_2-observer-pattern%E1%84%8B%E1%85%A6-%E1%84%83%E1%85%A2%E1%84%92%E1%85%A2-%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)

## 1. Observer Pattern에 대해 이해하기

> [JavaScript 디자인 패턴 기초 - 옵저버 패턴(Observser Pattern)](https://github.com/oneny/TIL/blob/main/JavaScript/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4_%EA%B8%B0%EC%B4%88/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8_%EB%94%94%EC%9E%90%EC%9D%B8_%ED%8C%A8%ED%84%B4.md#%EC%98%B5%EC%A0%80%EB%B2%84-%ED%8C%A8%ED%84%B4observer-pattern)

- `중앙 집중식 저장소(Store)`를 구현하기 위해 먼저 `저장소(Store)`와 `컴포넌트(Component)`의 관계를 살펴봐야 한다.
  - Store은 여러 개의 컴포넌트에서 사용될 수 있다.
  - Store가 변경될 때, Store가 사용되고 있는 Component가 변경되어야 한다.

```js
// Store 생성
const store = new Store({
  a: 10,
  b: 20,
});

// 컴포넌트 생성
const component1 = new Component({ subscribe: [store] });
const component2 = new Component({ subscribe: [store] });

// 컴포넌트가 Store 구독
component1.subscribe(store); // a + b = ${store.state.a + store.state.b}
component2.subscribe(store); // a * b = ${store.state.a * store.state.b}

// Store의 state 변경
store.setState({
  a: 100,
  b: 200,
});

// store가 변경되었음을 알림
store.notify();
```

1. 처음에 `component1`은 `a + b = 30`을 출력하고, `component2`는 `a * b = 200`을 출력한다.
2. store의 값이 변경된 다음에 각각 `a + b = 300`, `a * b = 2000`을 출력한다.

- `Observer Pattern`은 객체의 상태 변화를 관찰하는 관찰자들, 즉 옵저버들의 목록을 객체에 등록하여 **상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접 목록의 각 옵저버들에게 통지하도록 하는 디자인 패턴**이다.
  - 주로 `분산 이벤트 핸들링 시스템`을 구현하는데 사용된다.
  - `발행/구독 모델`로 알려져 있기도 한다.

### Publish

**발행기관(Publish)** 만들기

```js
class 발행기관 {
  state;
  observers = new Set();

  constructor(state) {
    this.state = state;
    // 인스턴스.프로퍼티키로 접근하면 접근자 프로퍼티에서 getter 함수가 실행되어 인스턴스.state.프로퍼티키 값 반환
    // 상태.state.a의 값을 상태.a로 접근 가능
    Object.keys(state).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this.state[key], // 주의: this.state.key 하면 프로퍼티 키가 key인 프로퍼티의 값을 반환한다.
      })
    );
  }

  // 핵심 메서드: "내부에 변화가 생길 경우 구독자에게 알리기"
  내부에_변화가_생김(newState) {
    this.state = { ...this.state, ...newState };
    this.구독자에게_알림();
  }

  구독자_등록(subscriber) {
    this.observers.add(subscriber);
  }

  구독자에게_알림() {
    this.observers.forEach((fn) => fn());
  }
}
```

<details>
  <summary>프로퍼티 접근하는 방법 이해하기</summary>

```js
const a = { a: 1, b: 2, c: 3, key: 123 };
const b = {};
const c = {};

Object.keys(a).forEach((key) => {
  Object.defineProperty(b, key, {
    get: () => a.key,
  });
});

Object.keys(a).forEach((key) => {
  Object.defineProperty(c, key, {
    get: () => a[key],
  });
});

console.log(b.a, b.b, b.c); // 123 123 123
console.log(c.a, c.b, c.c); // 1 2 3
```

</details>

### Subscriber

**구독자(Subscriber)** 만들기

```js
class 구독자 {
  fn;

  // 발행기관에 변화가 생겼을 때 하는 일 정의
  constructor(발생기관에_변화가_생길_때_하는_일) {
    this.fn = 발생기관에_변화가_생길_때_하는_일;
  }

  // 발행기관 구독
  구독(publisher) {
    publisher.구독자_등록(this.fn);
  }
}
```

### 적용하기

```js
const 상태 = new 발행기관({
  a: 10,
  b: 20,
});

const 덧셈계산기 = new 구독자(() => console.log(`a + b = ${상태.a + 상태.b}`));
const 곱셈계산기 = new 구독자(() => console.log(`a * b = ${상태.a + 상태.b}`));

덧셈계산기.구독(상태);
곱셈계산기.구독(상태);

상태.구독자에게_알림();
// a + b = 30
// a * b = 200

상태.내부에_변화가_생김({ a: 100, b: 200 });
// a + b = 300
// a * b = 20000
```

### 문제점

- 지금 작성한 코드는 `2명의 구독자(덧셈계산기, 곱셈계산기)`가 `1개의 신문사(상태)`를 구독하고 있는 상황이다.
- 하지만 `10명의 구독자`가 `100개의 신문사(혹은 잡지)`를 구독한다면 구독 관련 코드가 기하급수적으로 늘어날 것이다.

## 리팩토링

- 앞에서 작성한 코드를 단순하게 `observable`과 `observe`라는 관계로 만들 수 있다.
  - `observable`은 `observe`에서 사용된다.
  - `observable`에 변화가 생기면, `observe`에 등록된 함수가 실행된다.

```js
const 상태 = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a * b = ${상태.a} * ${상태.b}`));
observe(() => console.log(`a - b = ${상태.a} - ${상태.b}`));

상태.a = 100;
상태.b = 200;
```

### Object.defineProperty 이해하기

- MDN 설명: 객체에 직접 새로운 속성을 정의하거나 이미 존재하는 속성을 수정한 후, 그 객체를 반환한다.
- [Deep Dive 설명 보러가기](https://github.com/oneny/TIL/blob/main/JavaScript/DeepDive/16.%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0_%EC%96%B4%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%8A%B8.md#%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-%EC%A0%95%EC%9D%98)
- `Object.defineProperty(object, prop, descriptor)`
  - **object**: 속성을 정의할 객체
  - **prop**: 새로 정의하거나 수정하려는 속성의 이름 또는 Symbol
  - **descriptor**: 새로 정의하거나 수정하려는 속성을 기술하는 객체

```js
let a = 10;
const state = {};
Object.defineProperty(state, "a", {
  get() {
    console.log(`현재 a의 값은 ${a} 입니다.`);
    return a;
  },
  set(value) {
    a = value;
    console.log(`변경된 a의 값은 ${a} 입니다.`);
  },
});

console.log(`state.a = ${state.a}`);
state.a = 100;
// 현재 a의 값은 10 입니다.
// state.a = 10
// 변경된 a의 값은 100 입니다.
```

### 여러 개의 속성 관리하기

```js
const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state);

for (const key of stateKeys) {
  let _value = state[key];
  Object.defineProperty(state, key, {
    get() {
      console.log(`현재 state.${key}의 값은 ${_value} 입니다.`);
      return _value;
    },
    set(value) {
      _value = value;
      console.log(`변경된 state.${key}의 값은 ${_value} 입니다.`);
    },
  });
}

console.log(`a + b = ${state.a + state.b}`);

state.a = 100;
state.b = 200;
// 현재 state.a의 값은 10 입니다.
// 현재 state.b의 값은 20 입니다.
// a + b = 30
// 변경된 state.a의 값은 100 입니다.
// 변경된 state.b의 값은 200 입니다.
```

```js
for (const key of stateKeys) {
  let _value = state[key];
  Object.defineProperty(state, key, {
    get() {
      console.log(`현재 state.${key}의 값은 ${_value} 입니다.`);
      return _value;
    },
    set(value) {
      _value = value;
      console.log(`변경된 state.${key}의 값은 ${_value} 입니다.`);
    },
  });
}
```

- `_value=value`로 값을 재할당했는데 왜 obj[key]의 값이 변경되었을까?
  - `obj[key]`로 접근했을 때, 기존의 값이 아닌 `_value`의 값을 반환하기 때문이다.
  - `클로저`와 관련되어 있다. get과 set도 결과적으로 함수이다.
  - 이 함수들이 외부의 변수(\_value)를 내부에서 사용하고 있기 때문에 \_value가 해제되지 않고 유지되는 현상이다.

#### console.log -> observer 함수

```js
const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state);
const observer = () => console.log(`a + b = ${state.a + state.b}`);

for (const key of stateKeys) {
  let _value = state[key];
  Object.defineProperty(state, key, {
    get() {
      return _value;
    },
    set(value) {
      _value = value;
      observer();
    },
  });
}

observer();

state.a = 100;
state.b = 200;
// a + b = 30
// a + b = 120
// a + b = 300
```

### 여러 개의 Observer 관리하기

```js
let currentObserver = null;

const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state);
for (const key of stateKeys) {
  let _value = state[key];
  const observers = new Set(); // 프로퍼티키 a와 b에 대해서 하나씩 클로저 발생
  Object.defineProperty(state, key, {
    get() {
      if (currentObserver) observers.add(currentObserver);
      return _value;
    },
    set(value) {
      _value = value;
      observers.forEach((observer) => observer());
    },
  });
}

const 덧셈_계산기 = () => {
  currentObserver = 덧셈_계산기;
  console.log(`a + b = ${state.a + state.b}`);
};

const 뺄셈_계산기 = () => {
  currentObserver = 뺄셈_계산기;
  console.log(`a - b = ${state.a - state.b}`);
};

덧셈_계산기();
state.a = 100;

뺄셈_계산기();
state.b = 200;

state.a = 1;
state.b = 2;
// 덧셈_계산기 호출
// a + b = 30
// state.a = 100으로 setter 함수 호출
// a + b = 120
// 뺄셈_계산기 호출
// a - b = 80
// state.b = 200으로 setter 함수 호출 -> observers.forEach(observer => observer());
// a + b = 300
// a - b = -200
// state.a = 1으로 setter 함수 호출 -> observers.forEach(observer => observer());
// a + b = 201
// a - b = 199
// state.b = 2으로 setter 함수 호출 -> observers.forEach(observer => observer());
// a + b = 3
// a - b = -1
```

- `Object.keys(state).forEach` 코드를 다시 한 번 사용한 이유는?
  - 정확히는 `get`만 하기 위해서 보면 되는데, 즉 **변수 접근**만 허용하는 것이다.
  - 이건 observable을 수정한다기보단, flux 패턴을 지키기 위함이다!!
  - 즉, commit이나 dispatch로만 값을 수정하기 위해서이다.

### 함수화

작성한 코드를 재사용하기 위해서 `observe`와 `observable` 함수로 만들어야 한다.

```js
let currentObserver = null;

const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set(); // a와 b 각각

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });

  return obj;
};

const 상태 = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${상태.a}`)); // getter 함수 호출하면서 observers에 등록
observe(() => console.log(`b = ${상태.b}`));
// observer 함수 호출하면서 getter 함수도 실행돼 각 observers에 등록(add)
observe(() => console.log(`a + b = ${상태.a + 상태.b}`));
observe(() => console.log(`a * b = ${상태.a * 상태.b}`));
observe(() => console.log(`a - b = ${상태.a - 상태.b}`));

상태.a = 100;
상태.b = 200;

// a = 10
// b = 20
// a + b = 30
// a * b = 200
// a - b = -10
// a = 100
// a + b = 120
// a * b = 2000
// a - b = 80
// b = 200
// a + b = 300
// a * b = 20000
// a - b = -100
```

## DOM에 적용하기

### 일단 구현해보기

#### `index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Store 적용해보기!</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.js"></script>
  </body>
</html>
```

#### `src/main.js`

```js
import { observable, observe } from "./core/observer.js";

const state = observable({
  a: 10,
  b: 20,
});

const $app = document.querySelector("#app");

const render = () => {
  $app.innerHTML = `
    <p>a + b = ${state.a + state.b}</p>
    <input id="stateA" value="${state.a}" />
    <input id="stateB" value="${state.b}" />
  `;

  $app.querySelector("#stateA").addEventListener("change", ({ target }) => {
    state.a = Number(target.value);
  });

  $app.querySelector("#stateB").addEventListener("change", ({ target }) => {
    state.b = Number(target.value);
  });
};

// render 함수가 각 state a와 b의 observers에 등록되었으니
// 둘 중 하나 값을 바꿀 때마다 setter 함수가 호출되고 render() 함수 실행된다.
observe(render);
```

#### `src/core/observer.js`

```js
let currentObserver = null;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });

  return obj;
};
```

### Component로 추상화하기

#### `src/core/Component.js`

> 참고: [웹 컴포넌트 만들기](https://github.com/oneny/TIL/blob/main/JavaScript/VanillaJavaScript/%EC%9B%B9_%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8_%EB%A7%8C%EB%93%A4%EA%B8%B0/README.md#%EC%B6%94%EC%83%81%ED%99%94)

```js
import { observable, observe, ovserve } from "./observer.js";

export class Component {
  state;
  props;
  $el;

  constructor($el, props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = observable(this.initState()); // state를 관찰한다.
    observe(() => {
      // state가 변경될 경우, 함수가 실행된다.
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }
  template() {
    return "";
  }
  render() {
    this.$el.innerHTML = this.template();
  }
  setEvent() {}
  mounted() {}
}
```

#### `src/App.js`에 `Component` 적용하기

```js
import { Component } from "./core/Component.js";

export class App extends Component {
  initState() {
    return {
      a: 10,
      b: 20,
    };
  }

  template() {
    const { a, b } = this.state;
    return `
      <input id="stateA" value="${a}" size="5" />
      <input id="stateB" value="${b}" size="5" />
      <p>a + b = ${a + b}</p>
    `;
  }

  setEvent() {
    const { $el, state } = this;

    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      state.a = Number(target.value);
    });

    $el.querySelector("#stateB").addEventListener("change", ({ target }) => {
      state.b = Number(target.value);
    });
  }
}
```

#### `src/main.js`에서 `App` 불러와서 실행시키기

```js
import { App } from "./App.js";

new App(document.querySelector("#app"));
```

### 고민해보기

이렇게 Component 내부에 관리되는 State에 observable을 씌워 사용하거나 만들 경우 `setState`를 사용하는 방식이랑 크게 다르지 않다고 느낄 수 있다. **setState 또한 state가 변경될 때마다 render를 실행하는 방식**이기 때문이다.

- 참고: [Component 추상화](https://github.com/oneny/TIL/blob/main/JavaScript/VanillaJavaScript/%EC%9B%B9_%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8_%EB%A7%8C%EB%93%A4%EA%B8%B0/README.md#%EC%B6%94%EC%83%81%ED%99%94)

```js
setState(newState) {
  this.state = { ...this.state, ...newState }
  this.render();
}

render() {
  this.innerHTML = this.template();
}
```

### 컴포넌트 외부에 상태 만들어주기

- **세 개의 컴포넌트가 store를 참조**하고, **store가 변경되었을 때 컴포넌트가 자동으로 렌더링**되는 형태이다.
- 여기에 `Flux 패턴`을 붙이면 **Redux**나 **Vuex**가 되는 것이다.

#### `src/store.js`

```js
import { observable } from "./core/observer.js";

export const store = {
  state: observable({
    a: 10,
    b: 20,
  }),

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
```

### `src/App.js`

```js
import { Component } from "./core/Component.js";
import { store } from "./store.js";

const InputA = () => `
  <input id="stateA" value="${store.state.a}" size="5" />
`;

const InputB = () => `
  <input id="stateB" value="${store.state.b}" size="5" />
`;

const Calculator = () => `
  <p>a + b = ${store.state.a + store.state.b}</p>
`;

export class App extends Component {
  template() {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent() {
    const { $el, state } = this;

    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      store.setState({ a: Number(target.value) });
      // state.a = Number(target.value);
    });

    $el.querySelector("#stateB").addEventListener("change", ({ target }) => {
      store.setState({ b: Number(target.value) });
      // state.b = Number(target.value);
    });
  }
}
```

## Flux Pattern

```
                --------- Action --------
               ⬇️                        ⬆️
Action ---> Dispatcher ---> Store ---> View
```

- Flux의 가장 큰 특징은 `단방향 데이터 흐름`이다.
- 데이터 흐름
  - Dispatcher -> Store
  - Store -> View
  - View -> Action
  - Action -> Dispatcher

### Vuex 같은 Store 만들기

- Vue는 다음과 같은 형태로 사용한다.
  - actions.mutations, state를 묶어서 store라고 본다.
  - state를 변화시킬 수 있는 것은 오직 mutations다.
  - actions는 backend api를 가져온 다음에 mutations를 이용하여 데이터를 변경한다.
  - state가 변경되면, state를 사용 중인 컴포넌트를 업데이트한다.
- [더 정확한 내용 보러가기](https://vuex.vuejs.org/#what-is-a-state-management-pattern)
- vuex가 어떤 interface를 가지고 있는지 살펴보기 위해 공식문서가 보여주고 있는 코드를 보면 다음과 같다.
  ```js
  const store = new Vuex.Store({
    state: {
      count: 0,
    },
    mutations: {
      increments: {
        increment(state) {
          state.count++;
        },
      },
    },
  });
  ```
  * `state`가 있고, state를 변경시킬 수 있는 `mutations`가 존재하는 것을 확인할 수 있다.
  * 이렇게 선언된 store는 다음과 같이 사용된다.
    ```js
    store.commit("increment");

    console.log(store.state.count); // 1
    ```

#### `src/core/StoreVue.js`

```js
import { observable } from "./observer.js";

export class Store {
  #state; // private으로 지정하여 외부에서는 접근이 안되도록 한다.
  #mutations;
  #actions;
  state = {};

  constructor({ state, mutations, actions }) {
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    // state를 직접적으로 수정하지 못하도록 다음과 같이 정의
    Object.keys(state).forEach(key => {
      Object.defineProperty(
        this.state,
        key,
        { get: () => this.#state[key] }, // set 접근자 프로퍼티가 없으므로 직접 값 갱신 불가
      )
    });
  }

  commit(action, payload) {
    // state는 오직 commit을 통해서 수정할 수 있다.
    this.#mutations[action](this.#state, payload);
  }

  dispatch(action, payload) {
    return this.#actions[action]({
      state: this.#state,
      commit: this.commit.bind(this),
      dispatch: this.dispatch.bind(this),
    }, payload);
  }
}
```

* `store.state`는 Object.defineProperty로 get만 사용할 수 있도록 선언했다. 즉, 직접적으로 할당할 수 없는 형태이다.
* `store.state`의 값을 변경하고 싶다면 무조건 `commit` 메서드를 이용해야 한다.

#### `src/store.js`

```js
import { Store } from "./core/StoreVuex.js";

export const store = new Store({
  state: {
    a: 10,
    b: 20,
  },

  // state의 값은 오직 mutations를 통해서 변경할 수 있다.
  mutations: {
    SET_A (state, payload) {
      state.a = payload;
    },
    SET_B(state, payload) {
      state.b = payload;
    }
  },
});


```

#### `src/App.js`

```js
import { Component } from "./core/Component.js";
import { store } from "./store.js";

const InputA = () => {/* 생략 */};
const InputB = () => {/* 생략 */};
const Caculator = () => {/* 생략 */};

export class App extends Component {
  template() {/* 생략*/}

  setEvent() {
    const { $el } = this;

    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      // commit을 통해서 값을 변경시킨다.
      store.commit("SET_A", Number(target.value));
      // store.setState({ a: Number(target.value) });
      // state.a = Number(target.value);
    });

    $el.querySelector("#stateB").addEventListener("change", ({ target}) => {
      // commit을 통해서 값을 변경시킨다.
      store.commit("SET_B", Number(target.value));
      // store.setState({ b: Number(target.value) });
      // state.b = Number(target.value);
    });
  }
}
```

## Redux 만들기

```js
//Redux가 사용되는 형태
import { createStore } from "redux";

/**
 * 이것이 (state, action) => state 형태의 순수 함수인 리듀서이다.
 * 리듀서는 액션이 어떻게 상태를 다음 상태로 변경하는지 서술한다.
 * 
 * 상태의 모양은 마음대로다. 기본형(primitive)인수도, 배열일수도, 객체일수도ㅡ
 * 심지어 Immutable.js 자료구조일 수도 있다.
 * 오직 중요한 점은 상태 객체를 변경해서는 안되며, 상태가 바뀐다면 새로운 객체를 반호나해야 한다는 것!
 * 
 * 예제에서 `switch` 구문과 문자열을 썼지만,
 * 프로젝트에 맞게 (함수 맵 같은) 다른 컨벤션을 따라도 좋다.
 */

function counter(state = 0, action) {
  switch(action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 앱의 상태를 보관하는 Redux 저장소 만들기
// API로는 { subscribe, dispatch, getState }가 있다.
let store = createStore(counter);


// subscribe()를 이용해 상태 변화에 따라 UI가 변경되게 할 수 있다.
// 보통은 subscribe()를 직접 사용하기보다는 뷰 바인딩 라이브러리(ex. React Redux)를 사용해야 한다.
// 하지만 현재 상태를 localStorage에 영속적으로 저장할 때도 편리하다.

store.subscribe(() => console.log(store.getState()));

// 내부 상태를 변경하는 유일한 방법은 액션을 보내는 것 뿐!
// 액션은 직렬화할 수도, 로깅할 수도, 저장할 수도 있으며 나중에 재실행할 수도 있다.
store.dispatch({ type: "INCREMENT" }); // 1
store.dispatch({ type: "INCREMENT" }); // 2
store.dispatch({ type: "DECREMENT" }); // 1
```

코드를 살펴보았을 때 `createStore`가 `subscribe, dispatch, getState` 등의 메서드를 가진 객체를 반환하는 것을 알 수 있다.

```js
const createStore = (reducer) => {
  // 내부 구현
  return { subscribe, dispatch, getState };
}
```

### `src/core/StoreRedux.js`

```js
import { observable } from "./observer.js";

export const createStore = (reducer) => {
  // reducer가 실행될 때 반환하는 객체(state)를 observable로 만들어야 한다.
  const state = observable(reducer());

  // getState가 실제 state를 반환하는 것이 아니라 frozenState를 반환하도록 만들어야 한다.
  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    });
  });

  // 직접적으로 접근하지 못하고
  // dispatch로만 state의 값을 변경할 수 있도록 한다.
  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      // state의 key가 아닐 경우 변경 생략
      if (!state[key]) continue;
      state[key] = value;
    }
  }

  // 값을 반환받을 수 있는 접근자 프로퍼티만 있는 객체 반환
  const getState = () => frozenState;

  // sbuscribe는 observe로 대체
  return { getState, dispatch };
};
```

### `src/store.js`

```js
import { createStore } from "./core/StoreRedux.js";

// 초기 state의 값을 정의
const initState = {
  a: 10,
  b: 20,
};

// dispatch에서 사용될 type들을 정의
export const SET_A = "SET_A";
export const SET_B = "SET_B";

// reducer를 정의하여 store에 넘겨준다.
export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case "SET_A":
        return { ...state, a: action.payload };
    case "SET_B":
      return { ...state, b: action.payload };
    default:
      return state;
  }
});


// reducer에서 사용될 action 정의
export const setA = (payload) => ({ type: SET_A, payload });
export const setB = (payload) => ({ type: SET_B, payload });
```

### `src/App.js`

```js
import { Component } from "./core/Component.js";
// import { store } from "./store.js";
import { setA, SET_B, store } from "./store.js";

// <input id="stateA" value="${store.state.a}" size="5" />
const InputA = () => `
  <input id="stateA" value="${store.getState().a}" size="5" />
`;

// <input id="stateB" value="${store.state.b}" size="5" />
const InputB = () => `
  <input id="stateB" value="${store.getState().b}" size="5" />
`;

// <p>a + b = ${store.state.a + store.state.b}</p>
const Calculator = () => `
  <p>a + b = ${store.getState().a + store.getState().b}</p>
`;

export class App extends Component {
  template() {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent() {
    const { $el } = this;

    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      // dispatch를 통해서 값을 변경시킨다.
      store.dispatch(setA(Number(target.value)));
      // commit을 통해서 값을 변경시킨다.
      // store.commit("SET_A", Number(target.value));
      // store.setState({ a: Number(target.value) });
      // state.a = Number(target.value);
    });

    $el.querySelector("#stateB").addEventListener("change", ({ target}) => {
      // dispatch를 통해서 값을 변경시킨다.(setA 액션 말고 SET_B로 불러와 해보기)
      store.dispatch({ type: SET_B, payload: Number(target.value) });
      // commit을 통해서 값을 변경시킨다.
      // store.commit("SET_B", Number(target.value));
      // store.setState({ b: Number(target.value) });
      // state.b = Number(target.value);
    });
  }
}
```

## 심화학습

`observable`과 `observer`를 사용할 때 고려해야 할 것들이 몇 가지 더 있다.

### 최적화

#### 이전 상태와 값이 똑같을 경우

상태가 변경되어 render를 해야하는데, 만약에 변경된 상태가 이전 상태와 값이 똑같은 경우에는 어떻게 해야 할까?  
이럴 때는 다시 렌더링되지 않도록 방어로직을 작성하면 된다.

```js
state.a = 1;
state.a = 1;
state.a = 1;
state.a = 1;
```
```js
// src/core/observer.js
export const observable = obj => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get () {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set (value) {
        if (_value === value) return;
        if (JSON.stringify(_value) === JSON.stringify(value)) return;
        _value = value;
        console.log(observers);
        observers.forEach(fn => fn());
      }
    });
  });

  return obj;
};
```

* 숫자, 문자열, null, undefined 등의 원시타입은 `_value === value`처럼 검사하면 된다.
* 배열이나 객체의 경우 `JSON.stringify(_value) === JSON.stringify(value))`를 사용하면 된다.
* Set, Map, WeekSet, WeekMap 같은 것들은 `JSON.stringify`로 변환되지 않는다. 이런 경우에는 추가적인 검사 로직이 필요하다.
  
#### 상태가 연속으로 변경되는 경우

```js
state.a = 1;
state.b = 2;
```

단순하게 `console.log`를 찍는 경우라면 상관없지만, 브라우저에 DOM으로 렌더링되는 경우라면 `requestAnimationFrame`과 `debounce`를 이용하여 한 프레임에 한 번만 렌더링 되도록 만들어줘야 한다.

<details>
  <summary>MDN - requestAnimationFrame</summary>

* 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 한다. 이 메서드는 **이전에 실행할 콜백**을 인자로 받는다.
* 화면에 새로운 애니메이션을 업데이트할 준비가 될 때마다 이 메서드를 호출하는 것이 좋다. **콜백의 수는 보통 1초에 60회**지만, 일반적으로 대부분의 브라우저에서는 W3C 권장사항에 따라 그 수가 **디스플레이 주사율과 일치**하게 된다.
* 쉽게 말해서 `requestAnimationFrame`은 1프레임에 1회 호출된다. 보통 `1초에 60프레임`이고, 1프레임은 약 `16ms`정도 된다.

```js
let v = 1
const debounceFrame = ((callback) => {
  let currentCallback = -1;
  return callback => {
    cancelAnimationFrame(currentCallback); // 현재 등록된 callback이 있을 경우 취소한다.
    currentCallback = requestAnimationFrame(callback); // 1프레임 뒤에 실행되도록 한다.
  }
})();

debounceFrame(() => console.log(++v));
debounceFrame(() => console.log(++v));
debounceFrame(() => console.log(++v));
debounceFrame(() => console.log(++v));
debounceFrame(() => console.log(++v)); // 이것만 실행된다. -> 2
```

</details>

```js
const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  }
}

export const observe = fn => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
};
```

### Proxy

`Object.defineProperty`는 `IE`를 지원하기 위해 사용하는 `API`이다. 최신 브라우저에서는 `Proxy`를 이용한다면 더 쉽게 `Observable`을 만들 수 있다.

```js

```