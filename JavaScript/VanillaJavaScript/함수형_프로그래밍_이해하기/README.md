# 함수형 프로그래밍 이해하기

## 함수형 프로그래밍의 목표

- 목표는 애플리케이션 로직을 더 작은 부분인 함수로 나누는 것이다.
- 각 함수는 한 가지 작업에 초점을 맞추고 여러 함수를 합성해서 더 큰 함수를 만드는 방식으로 시계를 만든다.
- 함수형 프로그래밍에서는 가능하면 값 보다는 **함수를 활용**해야 한다.
- 필요할 때 값을 얻기 위해 함수를 호출할 것이다.

## 정상 동작하는 시계 만들기

### 필요할 때 값을 얻기 위해 호출할 함수들

```js
const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = (message) => console.log(message);
```

### 데이터를 변환하는 함수

- Date 객체를 시계에 사용할 수 있는 **다른 객체로 변환**한다.
- 아래 세 함수는 **원본 객체를 변화시키지 않고 새 객체를 반환한다.** -> 각 함수는 인자를 불변 객체로 다룬다.
- `abstractClockTime`: Date 객체를 받아서 시, 분, 초가 들어 있는 24시간제 시각을 반환한다.
- `civilianHours`: 24시간제 시각을 받아서 상용시로 변경한다. 예를 들어 13:00은 1:00이 된다.
- `appendAMPM`: 24시간제 시각을 받아서 시각에 맞는 AM이나 PM을 붙여준다.

```js
const abstractClockTime = (date) => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
});

const civilianHours = (clockTime) => ({
  ...clockTime,
  hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours,
});

const appendAMPM = (clockTime) => ({
  ...clockTime,
  ampm: clockTime.hours >= 12 ? "PM" : "AM",
});
```

### 고차 함수

- 고차 함수들을 호출해서 매 초마다 시계의 시간을 형식화할 때 재사용할 함수를 얻는다.
- `formatClock`과 `prependZero`를 필요한 템플릿 문자열이나 키를 지정하면서 각각 한 번씩만 호출한다.
- 화면 표시를 위해 매 초마다 `formatClock`과 `prependZero` 함수가 반환한 내부 함수를 호출한다.
- `display`: 대상 함수를 인자로 받아서 시간을 그 함수에게 전달하는 함수를 반환한다.
  - 여기서는 대상 함수로 `console.log` 사용할 예정.
- `formatClock`: 템플릿 문자열을 받아서 그 문자열이 지정하는 형식대로 시간을 표현하는 문자열을 반환한다.
  - 여기서는 `hh:mm:ss tt`를 템플릿으로 사용할 예정.
  - `formatClock`은 그 템플릿 문자열에서 시간(hh), 분(mm), 초(ss), 오전오후(tt) 부분을 각각에 맞는 값으로 바꿔치기 해준다.
- `prependZero`: 키와 객체를 인자로 받아서 객체에서 그 키에 해당하는 프로퍼티 값이 9 이하인 경우 앞에 0을 붙인 문자열을 반환하고 10 이상인 경우 그냥 그 값에 해당하는 문자열을 반환한다.

```js
const display = (target) => (time) => target(time);

const formatClock = (format) => (time) =>
  format
    .replace("hh", time.hours)
    .replace("mm", time.minutes)
    .replace("ss", time.seconds)
    .replace("tt", time.ampm);

const prependZero = (key) => (clockTime) => ({
  ...clockTime,
  [key]: clockTime[key] < 10 ? "0" + clockTime[key] : clockTime[key],
});
```

### 함수들을 합성하기

- compose 함수를 사용한다.
  ```js
  const compose =
    (...fns) =>
    (arg) =>
      fns.reduce((composed, f) => f(composed), arg);
  ```
- `convertToCivilianTime`: 24시간제 시간을 받아서 상용시로 변경하는 함수다.
- `doubleDigits`: 상용시 객체를 받아서 시, 분, 초가 두 자리 숫자로 이뤄졌는지 확인하고 필요하면 앞에 0을 붙여준다.
- `startTicking`: 매초 호출되는 인터벌 타이머를 설정해서 시계를 시작한다. 타이머의 콜백은 우리가 만든 여러 함수를 합성한 함수다. 매초 콘솔을 지우고, 현재 시간을 얻어서 변환한 다음에 사용시로 바꾸고 형식에 맞는 문자열을 만들어서 출력한다.

```js
const convertToCivilianTime = (clockTime) =>
  compose(appendAMPM, civilianHours)(clockTime); // clockTime이 reduce 메서드의 초기값

const doubleDigits = (civilianTime) =>
  compose(
    prependZero("hours"),
    prependZero("minutes"),
    prependZero("seconds")
  )(civilianTime);

const startTicking = () =>
  setInterval(
    compose(
      clear,
      getCurrentTime,
      abstractClockTime,
      convertToCivilianTime,
      doubleDigits,
      formatClock("hh:mm:ss tt"),
      display(log)
    ),
    oneSecond()
  );

startTicking();
```

- 이렇게 만든 선언적인 버전은 명령형 버전과 같은 결과를 보여준다.
- 이 접근 방법에는 적지 않은 장점이 존재한다.
  - 각각의 작은 함수를 쉽게 테스트하고 재활용할 수 있다.
  - 나중에 다른 시계를 만들거나 다른 형태로 시간을 표시하는 디지털 시계를 만들 때 활용할 수 있다.
  - 부수 효과가 없으며 함수 밖에 아무런 전역 변수도 없다.
  - 그렇기 때문에 버그가 있더라도 범위가 함수 내부로 제한되므로 쉽게 버그를 찾을 수 있다.