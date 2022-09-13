# CSS 기초

## 목차

- [속성마다 다른 auto](#속성마다-다른-auto❗️)
  - [Width, Height](#width-height)
  - [블럭 요소 중 하나인 \<div>](#블럭-요소-중-하나인-div)
  - [box-sizing의 속성값](#box-sizing의-속성값)
- [inline elements vs block-level elements](#inline-elements-vs-block-level-elements)
  - [inline elements](#inline-elements)
  - [상속](#상속)
- [Cascading](#cascading)
- [margin 병합 현상](#margin-병합-현상)
  - [margin 병합 이해하기](#margin-병합-이해하기)
- [CSS 적용하기](#css-적용하기)
  - [다중 스타일시트](#다중-스타일시트)

## 속성마다 다른 auto❗️

### Width, Height

```css
div {
  background-color: orange;
  width: auto; /* with 속성의 initial value(초깃값) <- 부모 기준 */
  height: auto; /* height 속성의 initial value(초깃값) <- 자식 기준 */
}
```

- (콘텐츠가 있을 때) div 요소는 어떻게 너비를 가질 수 있을까?
  - `width` 속성은 초깃값(initial value)으로 `auto`이기 때문에 최대너비를 가질 수 있다.

#### `width 속성의 초깃값 auto`, 그 의미는?

- <b>브라우저가 계산한</b> 즉, `margin`이나 `padding`, `border`들을 고려하여 <b>유연하게</b> 부모가 제공하는 콘텐츠 영역 최대너비만큼 가득찬다.
- `100%`와 차이는?
  - 부모가 제공하는 콘텐츠 영역 최대너비만큼 가득차지만 이는 <b>단순히 계산된 고정픽셀값</b>이다.
  - 따라서 `margin`이나 `padding`, `border` 값을 지정해주면 부모 요소를 벗어나버릴 수가 있다.
- `width: initial`: width를 초기화했다는 의미로 `auto` 값을 가진다. 좀 더 명시적임!

#### `height 속성의 초깃값 auto`, 그 의미는?

- 자식(자신)이 가지는 콘텐츠 높이만큼 <b>유연하게</b> 가진다.
- 즉, `width: auto`와는 다르게 자식이 기준이 된다.

### box-sizing의 속성값

- 요소의 너비와 높이를 계산하는 방법 지정

#### contenxt-box

- box-sizing 속성의 `initial value`
- `padding`이나 `border`의 값을 지정해주면 그 값의 두 배만큼 너비나 높이가 커진다!
  - 양쪽으로 커지기 때문에!!

#### border-box

- 테두리(`border`)와 안쪽 여백(`padding`)의 크기도 요소의 크기(width, height)로 고려하여 포함한다.
- 따라서 `padding`이나 `border`의 값을 지정해주면 자신(자식)이 가지는 크기를 벗어나지 않고
- <b>그 안에서 값이 설정된다.</b>

### 블럭 요소 중 하나인 \<div>

- 한 줄 전체를 다 차지하는 개념이다.
  - 따라서 아래 예시처럼 wow 박스가 한 줄에 배치되지 않는다.
- div 요소에 200x200 크기를 줬는데 한 줄 전체를 차지? 나머지 공간은?
  - `사용 가능한 공간`으로 밑에서 이를 활용한 예제가 나온다.

```html
<head>
  <style>
    div {
      background-color: orange;
      width: 200px;
      height: 200px;
    }
  </style>
</head>
<body>
  <div>wow</div>
  <div>wow</div>
</body>
```

```
 -----------------------------------------------------
| wow     |
|         |            사용 가능한 공강
|         |
 -----------------------------------------------------
| wow     |
|         |            사용 가능한 공간
|         |
------------------------------------------------------
```

#### 사용가능한 공간

- `margin-left: auto`: 왼쪽으로 사용가능한 공간을 취하기 때문에 wow박스는 오른쪽에!
  ```
  -----------------------------------------------------
                                             | wow     |
                  사용 가능한 공강               |         |
                                             |         |
  -----------------------------------------------------
  ```
- `margin-right: auto`: 오른쪽으로 사용가능한 공간을 취하기 때문에 wow박스는 왼쪽에!
  ```
   -----------------------------------------------------
  | wow     |
  |         |            사용 가능한 공간
  |         |
   ------------------------------------------------------
  ```
- `margin: 0 auto`: 사용가능한 공간을 좌우로 균등하게 배분해 wow 박스가 가운데로 온다.
  ```
   -----------------------------------------------------
                       | wow     |
     사용 가능한 공간 / 2  |         |   사용 가능한 공간 / 2
                       |         |
   ------------------------------------------------------
  ```

#### margin: auto auto 안되는 이유

- [관련 내용](https://www.w3.org/TR/CSS21/visudet.html#inline-replaced-height)
  - If `margin-top`, or `margin-bottom`are `auto`, their used value is 0.

## inline elements vs block-level elements

- [inline elements vs block-level elements](https://www.w3schools.com/html/html_blocks.asp)

### inline elements

- 내부에 있는 텍스트, 이미지가 해당
- <b>baseline</b>라는 것 위에 존재
  ```
  <header 공간> (text-align: center)
    <p 공간> (block element)
                o <- p 요소의 텍스트(inline element)
    --------------------------- (baseline)
    </p 공간>
  </header 공간>
  ```
- `margin: auto` vs `text-align`

  - `margin: auto`: 블럭요소 가운데 정렬
  - `text-align: center`: 인라인 요소 가운데 정렬
  - h1 자체는 block 요소라서 h1의 width를 가운데로 옮길려면 margin: auto로 해야하고,
  - 그 안에 텍스트 노드는 inline 요소로 text-align: center로 해줘야 한다.
    <img src="./img/스크린샷 2022-09-02 오후 2.19.06.png" >

#### img 가운데 정렬

```css
img {
  margin: 0 auto; /* X */
  text-align: center; /* X */
}
```

- 어떻게 가운데 정렬?
  - img 태그는 inline도 block-level도 아니기 때문에 그 상위 요소에 `text-align: center`를 적용해야 가운데 정렬이 가능하다!

### 상속

- 부모에게 지정한 값이 자식으로 그대로 전파되는 것!
  - 위 header 클래스에 `text-align: center`를 설정해줬을 때 p, h1 요소에도 상속돼서 적용된다.
- 프로퍼티와 그 값이 그대로 넘어가기 때문에 되는 프로퍼티인지 잘 확인해야 한다!
  - `background-color`, `width` 같은 경우는 안된다. 더 알고 싶으면 검색!
  - 그리고 자식 요소에 같은 프로퍼티가 있으면 자식의 것으로 적용된다.

## Cascading

- `cascading`은 '폭포, 위에서 아래로 쏟아지는'이라는 뜻을 가진 단어이다. 그리고 `cascading`은 css에서 Cascading Style Sheet의 약자로 가장 중요한 스타일 적용 규칙이기도 한다.
- `cascading`은 `스타일 우선순위`, `스타일 상속`이라는 두 가지의 원칙을 통해 어떤 요소에 스타일을 적용할지 결정한다.

### 선택자 우선순위

- CSS 파일 안에서 사용되는 선택자 우선순위에는 3가지 원칙이 있다.
  - `후자 우선의 원칙`
  - `명시도(구체성)의 원칙`
  - `중요성의 원칙`

#### 후자 우선의 원칙

```css
p {
  color: red;
  font-size: 20px;
}

p {
  color: green;
}
```

- 위 코드에서 동일한 선택자가 연속으로 사용된 것을 확인할 수 있고 `후자 우선의 원칙`에 의해 두 번째 타입선택자의 color 값으로 덮어씌워진다.

#### 명시도(Specificity)의 원칙

```css
p.color-red {
  color: red;
  font-size: 20px;
}

p {
  color: green;
}
```

- 한 선택자가 다른 선택자보다 더 구체적으로 작성되었다면 구체적인 선택자를 우선으로 선택하는 원칙
  - 위 코드에서 선택자는 둘 다 같은 p 태그를 가리키고 있지만 첫 번째 선택자가 두 번째 보다 더 구체적이기 때문에 첫 번째 선택자의 스타일이 적용된다.
- **`가중치`**
  - 명시도의 원칙은 가중치 즉, **어떤 선택자가 더 구체적인가?**를 판단할 때 가중치를 기준으로 판단한다는 의미이다.
  - 아래 코드와 같이 id와 class가 동시에 있을 경우 `id > class > 타입` 순으로 style 적용이 된다.
    ```css
    h1 {
      color: red;
    }
    .yellowgreen {
      color: yellowgreen;
    }
    #fourth {
      color: skyblue;
    }
    ```
- **`우선 순위 계산`**
  - inline-style: 요소의 안에 속성으로 선언되는 스타일이다. 1000 점의 가중치를 가진다.
  - id 선택자: 100점의 가중치를 가진다.
  - class, 가상클래스, 속성 선택자: 10점의 가중치를 가진다.
  - 타입, 가상요소 선택자: 1점의 가중치를 가진다.
  - 전체선택자(Universal Selector)는 무시된다.
  - 단, 자리올림이 되지 않는 것을 주의! 예를 들어, 타입선택자로 13점의 점수를 얻어도, 클래스가 가지는 10점을 넘지못한다.
- 우선 순위 계산

```css
h1 {
  color: blue; /* 0001점 */
}
section h1 {
  color: red; /* 0002점 */
}

.sector {
  color: blue: /* 0010점 */
}
section .sector {
  color: red; /* 0011점 */
}

#one {
  color: blue; /* 0100점 */
}
section .sector #one {
  color: red; /* 0111점 */
}
```

#### 중요성의 원칙

- `!important`: 절대적인 우선순위. 가중치 점수를 무시하고 무조건적인 우선 순위를 가진다. 쉬운 방법이지만 우선 순위 계산을 어렵게 만들기 때문에 인라인 스타일을 덮어 써야하는 등의 불가피한 상황이 아니라면 사용하지 않는 것이 좋다. 나쁜 습관이다.

## margin 병합 현상

```html
<head>
  <style>
    .wrapper {
      background-color: antiquewhite;
      width: 300px;
      margin: 100px auto;
    }

    .animal {
      background-color: blue;
    }

    .ground {
      background-color: brown;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- 윗 부분이라고 해서 꼭 header가 아님 -->
    <img class="animal" src="images/animal07.png" alt="" />
    <!-- 재사용성을 위해 아래 컴포넌트를 div 태그 안에 작성 -->
    <div class="ground">
      <!-- 잔디는 해당 컨텐츠에 꼭 있어야 하는 것이 아님! 그저 데코용 -> background로 설정 -->
      <h1>Fox</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec
      </p>
    </div>
  </div>
</body>
```

<img>
위 코드를 브라우저에서 코드를 실행하면 아래와 같은 결과가 나온다.
<details>
  <summary>animals 결과</summary>

  <img src="../img/마진병합.png" alt="마진병합" width="200px" >
</details>

- 위 여우 이미지의 마진과 h1의 마진부분이 병합되는 현상이 일어난다.
  - 즉, **block-level 엘리먼트 사이들의 일어나는 마진은 병합되도록 설정되어 있다.**
  - 근데 `<h1>Fox</h1>`는 div.ground 태그안에 있는데 그 안에서 margin 안일어나나?
  - 그리고 ground 클래스 밖에 margin이 일어나는 이유는???

### margin 병합 이해하기

```html
<head>
  <style>
    .wrapper {
      background-color: aqua;
      margin: 100px auto;
      width: 260px;
      /* border: 1px solid transparent; */
      /* padding: 1px; */
      /* display: flow-root; */
      /* overflow: hidden */
    }
    /*
    .wrapper::before,
    .wrapper::after {
      content: ' ';
      display: table;
    }
    */
    .box {
      font-size: 100px;
      text-align: center;
      line-height: 200px;
      background-color: orange;
      color: rgba(255, 255, 255, 0.3);
      width: 200px;
      height: 200px;
      margin: 30px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="box">A</div>
    <div class="box">B</div>
  </div>
  <body></body>
</body>
```

- A와 B 박스가 마진 병합 현상으로 인해 위아래로 margin 60px이 돼야하는데 30px인 것을 확인할 수 있다.
- 그리고 부모의 자식의 margin 병합도 일어나 아래 이미지 같은 현상이 일어난다.

#### 부모 자식 간의 마진 병합 해결 방법

- `border`, `padding`을 속성을 줘서 부모와 자식의 마진 병합 해결
- `display: flow-root;` 속성을 설정해 해결할 수 있지만 IE에서 지원하지 않는다는 문제점이 있다.
- `overflow: hidden` 속성을 줘서 원래의 용도가 아닌 마진 병합 해결하는데 사용할 수 있다.
  - `Block Formatting Context`라는 요소가 내부에 있어 독립적인 영역이 돼서 해결 가능
  - [Block Formatting Context 자세히 알기](https://developer.mozilla.org/ko/docs/Web/Guide/CSS/Block_formatting_context)
  - 대신 A, B 박스에 `box-shadowing` 프로퍼티를 설정하게 되면 짤리게 되는 문제가 생긴다.
- `<table>`로 해결하기
  ```html
  <div class="wrapper">
    <table></table>
    <div class="box">A</div>
    <div class="box">B</div>
    <table></table>
  </div>
  ```
  - A와 B 박스 위아래로 `<table>` 태그를 작성해 공간은 차지않으면서 마진 겹침 현상을 해결할 수 있다.
  - 대신 올바른 마크업을 사용하는 것은 아니므로 HTML 관점에서는 올바른 상황은 아니다.
- `.wrapper::before, .wrapper::after`로 Pseudo Element로 마진 병합 해결할 수 있다.
  - css 단에서 컨텐츠를 추가해주는 개념을 활용해 마진 병합을 해결 가능
<details>
  <summary>AB 박스 마진 병합 현상 및 해결</summary>

  <img src="../img/ab마진병합.png" alt="ab마진병합" width="300px" >
  <img src="../img/ab마진병합해결.png" alt="ab마진병합해결" width="200px" >
  
</details>

## CSS 적용하기

### 다중 스타일시트

```css
@import "foo.css";
```

- 위 코드처럼 `@`가 붙는 문법을 `at-rule`이라고 부른다. import만 있는 것이 아니고 아래처럼 다양한 엣룰이 있다.
  - `@charset`: 스타일시트에서사용하는 문자 인코딩을 지정한다. 문서에서 가장 먼저 선언한다.
  - `@import`: 다른 스타일 시트에서 스타일 규칙을 가져온다. @charset 바로 다음에 선언되어야 한다.
  - `@font-face`: 디바이스에 없는 폰트를 다운받아 적용할 때 사용한다.
  - `@keyframes`: 애니메이션을 만들 때 사용한다.
  - `@media`: 사용자 디바이스에 따른 스타일을 분기 처리하고자 할 때 사용한다.
  - `@supports`: 특정 CSS 속성을 브라우저가 지원하는지 확인하고 스타일을 선언하고자 할 때 사용한다.

### RESET CSS

#### 문제의 시작. 너무 많은 브라우저들. 각자 다른 스타일.

- 사파리, 크롬 등 브라우저 제작사들마다 각각 브라우저가 제공하는 요소의 기본 스타일이 모두 다르다.
- 개발자들은 디자이너에게 받은 웹디자인을 구현하기 위해 각각의 브라우저에 따라 다른 스타일을 부여해야 한다는 문제가 발생
  - 너무 비효율적인 방법이기 때문에 아래와 같은 해결방법이 나타난다.

#### 에릭 마이어의 reset CSS

- 매우 오래전부터 널리 사용된 방법. 하지만 2011년 이후로 업데이트 중단
- [해당 사이트](https://meyerweb.com/eric/tools/css/reset/)

#### normalize.css

- 노멀라이즈는 브라우저의 기본적인 스타일 속성들을 모두 제거하지 않는다.
  - 에릭 마이어는 기존 스타일을 모두 제거하는 적극적인 방법이라면, normalize는 브라우저 고유의 스타일을 존중하면서 거기에 스타일을 첨가하는, 좀 더 부드러운 방법으로 생각하면 된다.
- [해당 사이트](https://necolas.github.io/normalize.css/)

#### CSS Remedy

- 아직 프로젝트 진행중이며, 만약 CSSWG에서 CSS를 제작하는 사람들의 입장이라면, 어떤식으로 브라우저에게 기본 스타일을 주게 될 까 라는 생각에서 출발한 차세대 CSS reset 프로젝트
  - 때문에 단순히 스타일만 생각하는 것이 아닌, 하위 브라우저 호환 걱정없이 CSS가 브라우저에서 효율적으로 작동하도록 하는 것이 목표!
- [해당 사이트](https://github.com/jensimmons/cssremedy)

### 벤더프리픽스(Vendor-Prefix)

| 벤더 프리픽스 | 웹 브라우저                                                                 | 예                           |
| ------------- | --------------------------------------------------------------------------- | ---------------------------- |
| -webkit-      | 크롬, 안드로이드, 사파리, ios 기반 파이어폭스, 오페라 등 웹킷 기반 브라우저 | -webkit-transition: all .5s; |
| -moz-         | 파이어폭스 브라우저                                                         | -moz-transition: all .5s;    |
| -ms-          | 마이크로소프트 인터넷 익스플로어, 레거시 엣지                               | -ms-transition: all .5s;     |
| -o-           | 레거시 오페라 브라우저                                                      | -o-transition: all .5s;      |

- 벤더(브라우저 제조사)와 프리픽스(접두어)의 합성어
- 아직 비표준이거나 실험적인 CSS 속성을 특정 브라우저에서 실행할 수 있도록 CSS 속성 앞에 브라우저 제조사만의 접두어(prefix)를 붙이는 문법을 의미한다.
  ```css
  -webkit-transition: all 4s ease;
  -moz-transition: all 4s ease;
  -ms-transition: all 4s ease;
  -o-transition: all 4s ease;
  transition: all 4s ease;
  ```
  - 벤더 프리픽스는 줄어 들고 있지만 새로운 CSS 기능들은 개발되고 있기 때문에 아직까지 사용해야하는 벤더 프리픽스들이 존재한다.
  - 그리고 크로스 브라우징을 위해 레거시 브라우저들을 지원해야한다는 점도 있다!
  - [벤더 프리픽서 자동화를 위한 사이트](https://autoprefixer.github.io/) 및 VS Code 익스텐션 `Autoprefixer`를 이용할 수 있다.

#### 웹킷 기반 브라우저?

웹킷(Webkit)은 브라우저가 HTML, CSS를 화면에 그려줄때 사용하는 렌더링 엔진이다.  
크롬, 안드로이드, 사파리, ios 기반 파이어폭스 등 많은 브라우저들이 사용했다.  
현재 크롬, 안드로이드, 오페라, 마이크로소프트 엣지 브라우저 등은 **Blink** 엔진으로 전환되었다. 참고로 Blink 엔진은 vendor-prefix가 존재하지 않는다.
