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

## CSS Box Model

### 박스의 구성

- **콘텐츠(content) 박스**: 요소의 콘텐츠가 표시되는 영역으로 넓이는 `width` 그리고 높이는 `height`와 같은 속성을 사용해서 설정할 수 있다.
- **패딩(padding) 박스**: 패딩은 콘텐츠와 테두리 사이의 공간이다. 패딩의 크기는 `padding`과 관련 속성을 사용해 제어할 수 있다.
- **보더(border) 박스**: 보더 박스는 콘텐츠와 패딩을 둘러싸는 테두리이다. 보더의 크기와 스타일은 `border`와 관련 속성을 사용하여 제어할 수 있다.
- **마진(margin) 박스**: 마진은 보더 바깥 쪽 영역으로 요소와 요소 사이의 공백 역할을 한다. 마진 박스의 크기는 `margin`과 관련 속성을 사용하여 제어될 수 있따.

### 박스의 유형

#### 블록 박스

- 사용 가능 공간을 양 옆으로 100% 사용하며 사용하지 못하는 공간은 마진 영역으로 채운다. 상위 콘테이너에서 사용 가능 공간을 채운다.
- `width`와 `height`속성을 사용하여 스타일을 컨트롤할 수 있다.

#### 인라인 박스

- 기본적으로 컨텐츠 박스만큼의 크기만 가진다. 때문에 새 줄로 행을 바꾸지 않는다.
- `width`와 `height` 속성을 사용할 수 없다.
- `padding`과 `border` 속성을 사용할 수 있지만 마진 속성은 좌우만 조절 가능

### 박스의 유형을 결정하는 속성: display

`display` 속성은 박스의 성질을 지정하여 다른 박스들과 어떤 방식으로 우치가 배치될지 결정한다.  
display 속성을 크게 외부의 다른 형태, 부모 박스들과의 배치에 영향을 미치는 **외부 디스플레이 타입**과 내부 자식 박스들의 배치에 영향을 미치는 **내부 디스플레이 타입**으로 크게 나눌 수 있다.

- **inline**: 인라인 박스로 박스의 유형을 결정한다.
- **block**: 블록 박스로 박스의 유형을 결정한다.
- **inline-block**: inline처럼 한 줄에 여러 요소가 존재할 수 있다. block처럼 `width`, `height`, `margin`, `padding` 등 모든 값을 지정할 수 있다.
  - **inline** 속성의 특징과 **block** 속성의 특징이 함께 존재하는 박스

### 표준 CSS 박스 모델(Standard CSS Box Model)

### width, height

- 표준 CSS 박스모델에서는 블록 박스인 경우 width, height 값을 통해 **content box**의 크기를 제어한다.
  - 부모의 높이가 `auto`인 경우 자식의 높이를 `%`로 줄 경우 적용되지 않는다.ㄴ

#### border

- **border-width** - 선의 두께와 관련된 속성
  - 길이 지정 - 속성 값을 px과 같은 단위로 직접 지정한다.
  - medium - 키워드, 중간 굵기로 표시된다.
  - thin - 키워드, 얇은 실선으로 표시된다.
  - thick - 키워드, 굵은 선으로 표시된다.
- **border-style** - 선의 모양과 관련된 속성
  - none - 선을 없앱
  - solid - 직성
  - dotted - 점선
  - dashed - 파선으로 바느질선과 같은 모양
  - double - 평행한 이중선
  - groove - 테두리가 오목하게 안쪽으로 파인 선
  - ridge - 테두리가 볼록하게 나온 입체감이 있는 선, groove의 반대
  - inset - 요소가 전체적으로 안으로 들어가 보이는 형태
  - outset - 요소가 튀어나온 것처럼 보인다. inset의 반대
- **border-color** - 선의 색깔과 관련된 속성

#### padding, margin

- **padding** - 패딩 박스 영역의 스타일을 정의
- **margin** - 마진 박스 영역의 스타일을 정의

### 대체 CSS 박스 모델(Alternative CSS Box Model)

표준 CSS 박스모델에서 요소의 전체적인 크기는 컨텐츠 박스 + 보더 박스 + 패딩 박스의 너비와 높이 값을 모두 더행 정해진다. 하지만 박스의 실제 크기를 얻기 위해 테두리와 패딩을 추가하는 것이 불편하고 귀찮을 수 있어 **대체 박스 모델**이 도입되었다. 이 모델을 사용한다면 `width`는 페이지에서 차지하는 박스 너비가 되고, `height`는 박스의 높이가 된다.

#### box-sizing

```css
h1 {
  box-sizing: border-box;
  /* box-sizing: content-box; --> box-sizing의 기본값으로 표준 박스 모델에서 사용된다. */
}
```

```css
* {
  margin: 0;
}
h1 {
  width: 100px;
  height: 30px;
  border: 3px solid #228b22;
  padding: 10px;
}
/*
  h1 요소의 넓이: 3 + 3 + 10 + 10 + 100 = 126
  h1 요소의 높이: 3 + 3 + 10 + 10 + 30 = 56
*/
```

```css
* {
  margin: 0;
}
h1 {
  width: 100px;
  height: 30px;
  border: 3px solid #228b22;
  padding: 10px;
  box-sizing: border-box;
}
/*
  h1 요소의 넓이: 3 + 3 + 10 + 10 + 74 = 100
  h1 요소의 높이: 3 + 3 + 10 + 10 + 4 = 30
*/
```

## CSS declarations

### 단위

#### 단위의 분류

- 절대 길이 단위: cm, mm, px 등
- 상대 길이 단위: em, rem, vw, vh, % 등

| 단위           | 설명                                                                                 |
| -------------- | ------------------------------------------------------------------------------------ |
| 절대 길이 단위 |                                                                                      |
| px             | CSS에서 많이 쓰이는 기본 단위로, 사용자가 선언한 고정된 크기 그대로를 화면에 그린다. |
| em             | 배수 단위. 부모 요소의 글자 크기를 기준점으로 한다.                                  |
| %              | 부모 요소를 기준으로 하는 백분율 단위                                                |
| rem            | root em. 최상위(`<html>`)의 글자 크기를 기준점으로 하는 배수 단위이다.               |
| vw             | 화면 넓이를 기준으로 하는 백분율 단위                                                |
| vh             | 화면 높이를 기준으로 하는 백분율 단위}                                               |
| vmin           | 화면의 넓이와 높이 중 작은 값을 기준으로 하는 백분율 단위                            |
| vmax           | 화면의 넓이와 높이 중 큰 값을 기준으로 하는 백분율 단위                              |
| ex             | 현재 폰트의 x-height 값. 즉, 현재 폰트의 소문자 x의 높이값을 기준으로 한 백분율 단위 |

#### em

(부모의 크기값 \* 자식의 em 값) = 자식이 가지게 될 크기 값

- em에서의 값 1은 100%이다.

#### %

### overflow

**overflow** 속성은 첫 번째 `overflow-x`, 두 번째 값은 `overflow-y`를 지정한다. 하나만 사용하면 지정한 값을 양 축 모두에게 적용하는 축양형이 된다.

#### overflow 중요 속성

- **visible** - overflow 속성의 기본값으로 콘텐츠를 자르지 않는다.
- **hidden** - 콘텐츠를 요소의 크기만큼 맞추기 위해 잘라낸다. 스크롤바 제공 X
  - float이나 margin 겹침 현상 등에서 자식 요소의 넓이나 높이를 포함시키기 위해서도 많이 사용
  - 관련 포털 검색 키워드: **overflow hidden을 사용한 자식선택자**
- **scoll** - 콘텐츠를 요소의 크기만큼 맞추기 위해 잘라낸다. 스크롤바 제공 O

- Daum과 Naver에 활용 사례

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <style>
      .background {
        background-color: red;
      }

      /* naver 스타일 */
      .blind {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
      }

      /* daum 스타일 */
      .screen_out {
        overflow: hidden;
        position: absolute;
        width: 0;
        height: 0;
        line-height: 0;
        text-indent: -9999px;
      }

      .display_none {
        display: none;
      }

      .visibility_hidden {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <h1>hello world</h1>
    <div class="blind background">naver</div>
    <div class="screen_out background">daum</div>
    <div class="display_none background">display none</div>
    <!-- 영역은 차지하고 있습니다. -->
    <div class="visibility_hidden background">visibility hidden</div>
  </body>
</html>
```

```css
.blind {
  /* 정상적인 흐름에서 항목 제거 */
  position: absolute;

  /*요소 숨김
    top과 bottom, left와 right가 같은 값이면 요소를 숨김*/
  clip: rect(0 0 0 0);

  /* 가능한 가장 작은 크기로 설정.
    일부 스크린 리더는 높이와 너비가 0인 요소를 무시 */
  width: 1px;
  height: 1px;

  /* IE 구버전에서 인식을 못하는 경우가 있음 */
  margin: -1px;

  /* 크기 조정 후 넘치는 내용 숨기기 */
  overflow: hidden;

  /* CSS 위치 지정 및 음수 텍스트 들여쓰기 기술(ex) text-indent:-9999px)과 달리
     "클립 패턴"은 RTL(오른쪽에서 왼쪽) 언어에서도 작동.*/
}
```

### background-image

background-image 속성은 html 요소 뒤에 이미지를 배치할 때 사용한다.

- background-image: url을 이용해 이미지의 주소에서 이미지를 불러온다.
- background-color: 요소의 배경 색을 지정한다.
- background-repeat: 배경이미지를 어떻게 반복할것인지 지정한다.
  - repeat: 반복
  - no-repeat: 반복 없음
  - repeat-x: x축만 반복
  - repeat-y: y축만 반복
  - round: 이미지가 짤리지 않게, 이미지 크기 변화를 줘서 간격 없이 반복
  - space: 이미지가 짤리지 않게, 이미지 크기는 유지한채로 간격을 줘서 반복
- background-position: 배경이미지의 위치를 지정한다.
- background-size
  - cover: 이미지를 넓이와 높이에 맞게 잘라낸다.
    - 이미지가 찌그러지지 않는 한도 내에서 제일 크게 설정(잘릴 수도 있음)
  - contain: 이미지 넓이나 높이에 맞춰 자신의 이미지를 모두 넣고 반복
    - 이미지가 잘리거나 찌그러지지 않는 한도 내에서 제일 크게 설정
  - 100%: 이미지를 width와 height에 맞게 압축

#### 어느 곳에서 `img` 태그를 , 어느 곳에서 `background-image`를 사용해야 하나요?

- 주로 백엔드 개발자와 협업해야 하는 공간에는 img 태그, FE 혼자 작업하는 공간에는 background-image를 사용한다.
- 스크린리더가 읽지 않아야 하는 곳에서 사용하기도 한다.

### font

- font-size: 글꼴의 크기 변경
- font-family: 글꼴 변경
- font-weight: 글꼴 굵기 변경(normal: 일반 스타일, bold: 텍스트 굵게)
- text-transform: 대문자, 소문자 표현
  - uppercase: 대문자, lowercase: 소문자, capitalize: 각 단어의 첫글자를 대문자로
- font-style: 글꼴 기울기 설정
  - normal은 일반 스타일, italic: 필기체, oblique는 기울임체
- text-align: 텍스트의 정렬 표현
  - left: 왼쪽, right: 오른쪽, center: 가운데, justify: 마지막 줄을 제외하고 양쪽으로 정렬
- text-decoration: 텍스트 장식 설정
  - none: 효과 제거, underline: 밑줄 추가

## Text

### 서체의 기준선 목록

<img src="../img/text.png" />

### line-height

- 글자 라인의 높이를 지정하여 `텍스트 라인과 라인 사이의 간격(leading)`을 조정할 때 사용한다.
  - 위 이미지에서 line-height에서 font-size를 뺀 leading을 반반 나누어 가진다.

#### line-height의 단위

- **normal**: 기본값. 폰트의 font-family에 따른 글자의 기본 높이이다.
  - **사용하는 font-family에 따라 기본 line-height 값이 다르다는 것에 유의해야 한다.**
- number: 숫자로 값을 설정할 수 있다.
  - 1은 font-size 값 만큼의 라인 높이를 의미한다.
  - 2는 font-size 값의 두 배를 의미하므로 font-size가 16px이면 해당 inline의 높이는 총 32px가 된다.
  - 소수점까지 지원한다.
- px, em, %: 해당하는 유닛 단위에 맞춰 라인의 높이가 설정된다.
  - px: px로 고정된 값을 적용한다. 폰트의 사이즈가 변할 경우를 대비하지 못하기 때문에 잘 사용하지 않는다.
  - em: 부모 요소의 font-size에 비례한 값을 적용한다. px과 마찬가지로 요소의 폰트사이즈가 변하면 대비할 수 없다.
  - %: 요소 자신의 폰트 사이즈를 기준으로 값을 설정한다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>line-height</title>
    <style>
      .container {
        width: 300px;
        height: 300px;
        font-size: 16px;
        border: solid 1px black;
        /* 1. 고정 값으로 주었을 경우 : two, three 확인 */
        /* line-height: 10px; */

        /* 2. em으로 주었을 경우 : 역시나 two, three 확인, 더 큰 font를 자식 요소에서 사용했을 경우 UI가 깨짐 */
        /* line-height: 1em; */

        /* 3. 1값을 사용했을 경우 개발자 도구 열어서 확인해보면 contents 높이가 32px 그러나 만약 line-height가 없다면 42.86! leading 영역이 폰트의 위 아래로 존재하기 때문, line-height 1은 이 leading 영역을 없앰(폰트 높이에 딱 붙게됨), leading 영역까지 포함하여 nomal */
        /* line-height: 1; */
      }
      .one {
        font-size: 10px;
        border: solid 1px black;
      }
      .two {
        font-size: 20px;
        border: solid 1px black;
      }
      .three {
        font-size: 30px;
        border: solid 1px black;
      }
    </style>
  </head>
  <body>
    <h1>hello world</h1>
    <div class="container">
      <div class="one">hello world</div>
      <div class="two">hello world</div>
      <div class="three">hello world</div>
    </div>
  </body>
</html>
```

### letter-spacing

#### letter-spacing 단위

- normal: 현재 폰트의 기본 간격
- px, em, rem: 기본 간격에 사용하는 유닛 단위만큼 간격을 추가한다.(%는 사용 X)

### text-align

- left: 기본값으로 텍스트를 왼쪽에 정렬
- right: 텍스트를 오른쪽에 정렬
- center: 텍스트를 가운데에 정렬
- justify: 마지막 라인을 제외하고 텍스트를 양쪽 끝으로 정렬

### vertical-align

`인라인 요소`의 수직 정렬을 맞추기 위해 사용하는 속성이다.(블락 요소나 인라인블락 요소에서는 적용 X)

- baseline: 베이스라인을 부모의 베이스 라인에 맞추어 정렬
- sub: 베이스라인을 부모의 subscript(아랫첨자)-baseline에 맞추어 정렬
- super: 베이스라인을 부모의 superscript(윗첨자)-baseline에 맞추어 정렬
- top: 상단의 위치를 라인(인라인 박스를 감싸고 있는 공간)의 상단으로 정렬
- text-top: 상단의 위치를 **부모 엘리먼트 폰트의 상단**으로 정렬
- bottom: 하단의 위치를 전체 라인의 하단으로 정렬
- text-bottom: 하단의 위치를 **부모 엘리먼트 폰트의 하단**으로 정렬
- middle: 폰트의 중간 위치를 부모의 `baseline + x-height`의 절반에 해당하는 위치로 정렬
- 실무에서는 보통 쓰게된다면 기본값인 baseline과 top, bottom 정도로 쓰고 나머지는 거의 쓰지 않는다.

### text-indent

텍스트 라인에서 텍스트가 시작하기 전의 공간을 설정할 수 있다. 쉽게 말해 **들여쓰기 공간 설정**이다.

#### text-indent 단위

- mm, cm: 밀리미터, 센터미터 단위를 지원
- px, em, %: 기본 간격에 사용하는 유닛 단위만큼 간격을 추가

```css
p {
  text-indent: 5em;
  text-indent: -5em;
  text-indent: 70px;
  text-indent: 15%; /* %는 요소의 넓이에 비례합니다. */
  text-indent: 1mm;
  text-indent: 5cm;

  font-size: 14px;
  background-color: black;
  color: white;
}
```

### text-decoration

텍스트에 붙는 라인을 꾸며주는 속성으로 텍스트의 상단, 하단에 라인을 그려줄 수 있고, 라인의 종류와 색상도 지정할 수 있다.  
글씨의 font-family, 텍스트의 형태에 따라 라인이 잘리는 경우가 있기 때문에 스타일의 용도로는 잘 사용하지 않는다.

```css
p {
  text-decoration: none;
  text-decoration: underline dotted;
  text-decoration: underline dotted red;
  text-decoration: green wavy underline;
  text-decoration: underline overline #ff3028;
  text-decoration: line-through;
}
```

### text-overflow

- 부모 컨테이너를 넘어가 컨텐츠가 어떻게 보여질지 결정하는 속성이다.
  - clip: 기본값. 컨테이너의 끝에서 텍스트를 자른다.
  - ellipsis: 잘린 텍스트를 말줄임 표시로 나타낸다.
- text-overflow 속성은 그 자체만으로 넘친 컨텐츠를 만들어서 처리하지 않는다.
  - 따라서 컨테이너에 `overflow: hidden`, `white-space: nowrap` 속성이 같이 사용되어야 한다.

#### 말줄임('...')

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, ad, autem
  quaerat sed impedit cupiditate tenetur recusandae facere, alias ab nihil nisi
  eligendi eaque ea molestiae dolore accusantium repellat maiores?
</p>
```

```css
/* 한 줄 말줄임 코드입니다. */

p {
  width: 300px; /* p 태그의 크기를 제한합니다. */
  overflow: hidden; /* 요소를 넘어가는 컨텐츠를 숨깁니다. */

  /* 텍스트의 공백을 만났을때 어떻게 처리할지 설정하는 속성입니다. nowrap은 공백을 만나도 줄바꿈하지 않습니다.*/
  white-space: nowrap;
  text-overflow: ellipsis; /* 요소의 크기를 넘친 텍스트를 말줄임 처리합니다. */
}
```

```css
/* 여러줄 말줄임 코드입니다. */
/* -webkit-box, -webkit-box-orient 속성은 웹표준 속성이 아닙니다. 
앞으로 삭제되거나 기능이 변경될 수 있기 때문에 주의가 필요합니다. */

p {
  overflow: hidden;

  /* 자식요소들의 배치를 지정하는 속성입니다. flex의 예전 버전입니다. */
  display: -webkit-box;

  -webkit-line-clamp: 2; /*  블록 컨텐츠의 라인 수를 제한하는 속성입니다.*/

  /* 자식요소들의 배치를 수직으로 만드는 속성입니다. flex-direction의 예전 버전입니다. */
  -webkit-box-orient: vertical;
}
```

## position

HTML 태그의 위치를 지정해주는 속성. position 속성을 이용해 페이지의 레이아웃을 결정할 수 있다.

### position: static

기본적으로 모든 태그들은 따로 position 속성값을 주지 않았다면 static 값을 가진다. 즉, HTML에 쓴 태그 순으로 정상적인 흐름(normal flow)에 따라 위치가 지정되게 된다.

### position: relative

단어 자체의 뜻처럼 **원래 자신이 있어야 하는 위치(static)**에 `상대적`인 속성을 가지고 있다.  
relative는 자신이 원래 있던 자리를 기억해 `left: 50px`를 추가적으로 설정하면, 본인의 static 자리에서 왼쪽으로 50px만큼 떨어진 자리에 위치하게 된다.

- relative 속성은 원래의 자리를 인식하지만 left, right, top, bottom 속성을 이용해서 움직일때는 다른 콘텐츠들의 레이아웃에 영향을 미치지 않는다.

### position: absolute

굳이 한 단어로 설명하자면 `my way`라고 할 수 있다. 그러나, **static**을 제외한 position 속성을 가진 가장 가까운 부모의 박스 내를 기준으로 위치하게 된다.

### position: fixed

스크롤을 올리거나 내릴 떄, 특정 박스가 고정되어 움직이지 않았으면 할 때 사용하는 속성값이다.  
**fixed**는 현재 사용자가 보고 있는 브라우저 화면(뷰포트)를 기준으로 마치 화면에 붙은 것처럼 그 자리에 계속해서 위치할 것이다.

### position: sticky

sticky(끈끈한, 끈적끈적한) 속성값이 적용된 요소는 조상에 스크롤이 있다면 가장 가까운 부모 요소의 컨텐츠 영역에 달라붙는다.

- IE 지원하지 않는다는 점 유의하자!

### z-index

position을 통해 요소의 위치를 변경하다보면 요소와 요소가 겹쳐보이는 일이 발생한다. 이 때 어떤 요소가 더 위로 나타나게 할지 결정할 때 사용하는 것이 바로 **z-index** 속성이다.  
오직 static을 제외한 position 속성값이 적용된 요소의 Z축 순서를 결정할 수 있으며, z-index 값이 더 큰 요소가 값이 작은 요소의 위를 덮어버리게 된다.

- 하지만 **부모가 z-index를 높여 자식 앞으로 나올 수 없다! 자식은 z-index를 낮춰 부모 뒤로 가는 것은 가능하다!**

## Float

원래 그림을 따라 흐르는 텍스트 레이아웃을 웹에서 구현하기 위해 탄생한 속성이다.  
하지만 왼쪽 혹은 오른쪽으로 정렬되는 특성 덕분에 현재는 **블록 박스** 요소를 정렬하는 가장 기본적인 방법으로 사용되고 있다.

### 블록 박스 태그 vs float 속성 태그

- 블록 속성 태그는 **가로 폭 전체의 넓이를 가지는 속성**을 가지고 있다.
- float 속성을 주면 **컨텐츠가 차지하는 공간만큼만** 넓이가 바뀌게되고 왼쪽이나 오른쪽에 배치된다.
  - 그리고 float된 요소들의 넓이의 합이 그들을 감싸는 컨테이너의 넓이보다 커지면 순차적으로 아래로 떨어지는 모습이다.
  - 또한 `<span>`과 같은 inline 요소에 float 속성을 적용하면 display 속성값이 자동으로 `block`으로 바뀌게 된다.
  - 때문에 float 속성이 적용되면 inline 요소도 `width`, `height`, `margin`, `padding` 속성값을 자유롭게 사용할 수 있다.

### 자식 박스들의 존재를 인식하지 못하는 float 속성

자식한테 float 속성을 설정하면 자식 요소들은 붕 띄워진 상태(floating)이기 때문에 부모 요소가 자식 박스들의 존재를 인식하지 못한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .wrap {
        border: 4px solid blue;
      }
      .content {
        float: left;
        margin: 5px;
        height: 20px;
        border: 2px solid green;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="content">내용1</div>
      <div class="content">내용2</div>
    </div>
  </body>
</html>
```

#### floating 현상 이유

<div style="text-align: center"><img src="../img/normalflow-fin.png" width="500px" /></div>

- 브라우저는 요소들을 화면에 어떻게 보여줄지 결정하는 여러가지 방법이 있다.
  - 그 중 대표적인 세가지 방법: `normal flow`, `float`, `position`
- 대부분의 요소들 즉, 블록 레벨 요소와 인라인 요소들은 `normal flow`에 따라 레이아웃이 결정된다.
- 하지만 **float, position(absolute, fixed)**의 방법을 사용하면 `normal flow`를 벗어난다.
  - 따라서 벗어난 **float, position** 속성이 적용된 요소들을 인식하지 못한다.

#### 해결 방법1. 부모 요소에 **overflow 속성 추가**

overflow는 BFC(Block-Formatting-Context)를 생성한다. BFC는 float 속성이 적용된 요소를 컨테이너가 인식하도록 만들어 준다.  
그렇기 때문에 컨테이너 요소에 `overflow: hidden;` 혹은 `overflow: scroll;` 등 `overflow: visible`을 제외한 overflow 속성을 추가하여 해결한다.

```css
.wrap {
  border: 4px solid blue;
  overflow: hidden;
}
```

#### 해결 방법2. 부모 요소의 **높이 값을 직접 지정**

강제로 부모에 높이를 주어 늘리는 것이므로 좋은 방법은 아니다. 만약 자식 요소의 높이가 변경되었을 경우 혹은 자식 요소가 추가되어 부모 요소의 높이 수정이 불가피한 경우마다 부모의 높이를 변경해야 하므로 비효율적이다.

```css
.wrap {
  border: 4px solid blue;
  height: 35px;
}
```

#### 해결 방법3. clear 속성 사용

`float`이 사용된 요소의 바로 다음 형제 요소에 `clear` 속성을 사용한다. `clear` 속성은 left, right, both 세 가지 값을 가지면 `float`이 사용된 요소가 정렬된 방향에 따라 적절히 사용해주면 된다.

#### 해결 방법4. clear-fix 방법

CSS의 `::after` 가상요소로 해결한다. 부모 요소에 가상으로 마지막 child 요소를 덧붙여서 부모 요소인 wrap이 자식 요소들을 알아보게 하는 방법이다. 이러한 방법은 **clear-fix**라고 한다.

```css
.warp::after {
  content: "";
  display: block; /* display: table;을 사용하기도 한다. */
  clear: both;
}
```

#### 이 외에 BFC를 만들어내는 여러가지 방법들을 사용할 수 있음

- **Block Formatting Context**
  - 웹 페이지 화면에 CSS를 렌더링하는 과정의 한 부분으로, block 레벨 요소들이나 float된 요소들이 서로 상호작용하여 화면에 보여지게 되는 방법(block formatting)을 결정하는 구역(context)를 말한다.
- **BFC 생성되는 경우**
  - /<html> 요소를 사용했을 때
  - float: left, right
  - overflow: visible을 제외한 속성값(auto, hidden, scroll)을 사용했을 경우
  - display: table-cell, inline-block, flow-root
  - position: absolute, fixed 등등
- **BFC 생성 후 일어나는 현상**
  - 내부, 외부 float을 해제
  - 마진 컬랩싱 (margin collapsing) 현상을 막는다.
- [자세히 알아보기](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)

## negative margin과 line-height 이해하기

### line-height

```html
<head>
  <style>
    .pseudo-padding {
      background-color: #b7f6c2;
      color: green;
      line-height: 40px;
      padding: 0 10px;
      height: 40px;
      cursor: pointer;
      text-align: right;
      opacity: 1;
    }

    .buckets-header h1 {
      line-height: 1; /* half-leading을 없앰 */

      /* leading-trim 하는 방법: font-family가 바뀌면 다시 작업해야해서 비추! */
      /* 위 공간을 줄여 텍스트 노드(My Bucket List)를 위로 올라가게 */
      /* margin-top: -0.05em; */
      /* h1 요소 공간을 줄여 아래 공간이 -.24em부터 일찍 시작하게  */
      /* margin-bottom: -0.24em; */
      /* padding-left: 24px; */
      position: relative;
    }
  </style>
</head>
<body>
  <header class="buckets-header">
    <div class="pseudo-padding">pseudo-padding: 40px</div>
    <h1>My Bucket List</h1>
    <div class="pseudo-padding">pseudo-padding: 40px</div>
  </header>
</body>
```

<details>
  <summary>결과 확인하기</summary>
  <div style="text-align: center">
    <img src="../img/myBucketList.png" alt="" width="500px" 
  ></div>
  <div style="text-align: center">
    <img src="../img/myBucketList2.png" alt="" width="500px" 
  ></div>
</details>

- half-leading으로 인해 h1의 font 크기는 24px이지만 h1 요소 자체의 크기는 28.5px이 되는 것을 확인할 수 있다.
- 이를 해결하기 위해 `line-height` 속성을 사용해서 **half-leading**을 없애 font 크기만큼 요소가 차지할 수 있도록 설정할 수 있다.
  - [line-height 보러가기](#line-height)
- 아직 미세한 위 아래 공간이 남는 것을 확인할 수 있는데 `negative-margin`을 줘서 해결할 수 있다.
  - 하지만 font-family가 바뀔때마다 설정을 다시 해줘야 해서 비추인 방법

### negative maring 이해하기

```html
<div class="pokemon">
  <img src="images/pikachu.png" />
  <h1>Pikachu</h1>
  <p>
    Pikachu ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient
  </p>
  <div class="icons">
    <a class="twitter" href="">Twitter</a>
    <a class="facebook" href="">Facebook</a>
    <a class="pinterest" href="">Pinterest</a>
  </div>
</div>
```

<details>
  <summary>css 보기</summary>
  <div>

```css
h1,
p {
  margin: 0;
  padding: 0;
}
body {
  background-color: #ddd;
}

.pokemon {
  border-radius: 5px;
  background-color: white;
  width: 300px;
  text-align: center;
  border-right: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  margin: 240px auto;
}

/*
.pokemon img {
  background-color: orange;
  margin 의미 해석: 보여지는 공간(이미지 그 자체)은 그대로지만 img 요소가 차지하는 공간은 위 아래로 50px씩 늘어남 
  margin-top: 50px; 마진 병합 현상은 블럭과 블럭 사이에 일어남
  margin-bottom: 50px;
}
*/

.pokemon img {
  vertical-align: bottom;
  /* 이미지가 차지하는 공간은 negative로 줬기 때문에 공간이 줄어들어 이미지 자체는 위로 올라간다. */
  /* img 요소가 차지하는 공간까지 모두 줄여버리면 더 이상 위로 올라가지 않는다. */
  margin-top: -200px;
  /* img 요소가 차지하는 공간이 줄어들면서 pikachu 글자가 위로 올라간다 */
  /* img 요소가 차지하는 공간까지 모두 없애버리면 
     아래 pikachu가 더 이상 일찍 시작할 수 없기 때문에 그 뒤로 이미지 자체가 아래로 내려가기 시작
  */
  /* margin-bottom: -0px; */
}

.pokemon h1 {
  color: orange;
  border-bottom: 5px solid orange;
  width: 120px;
  margin: 0 auto 20px;
}

.pokemon p {
  padding: 20px 20px 40px;
}

.icons {
  background-color: #eee;
  padding: 20px 0;
}

.icons a {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-indent: -9999px;
  background-image: url(images/icon-sprite.png);
}

.icons a.twitter {
  background-position: left top;
}
.icons a.facebook {
  background-position: center top;
}
.icons a.pinterest {
  background-position: right top;
}

.icons a:hover {
  background-position-y: bottom;
}
```

  </div>
</details>

<details>
  <summary>결과 확인하기</summary>

  <div style="text-align:center">
    <img src="../img/negativeMargin.png" alt="" width="500px" height="500px">
  </div>
</details>

- 주석에 정리한 것처럼 `margin: 50px 0;` 속성을 주면
  - margin의 의미는 보여지는 공간(이미지 그 자체)은 그대로지만
  - img 요소가 차지하는 공간은 위 아래로 50px씩 늘어나는 것을 확인할 수 있다.
- 그 다음 .pokemon img {}처럼 margin 속성의 값으로 negative 값을 주게 되면
  - margin-top 경우, img 요소가 차지하는 공간이 위로 줄어들면서 이미지 자체가 올라가게 된다.
    - 만약 img 요소가 차지하는 공간까지 모두 줄여버리면 더 이상 올라가지 않는다.
  - margin-bottom 경우, img 요소가 차지하는 공간이 아래로 줄어들면서 화면상 아래에 있는 요소가 위로 올라오게 된다.(일찍 시작한다.)
    - img 요소가 차지하는 공간까지 모두 줄여버리면 그 뒤로는 이미지 자체가 아래로 내려가기 시작한다.
- 이러한 margin의 negative한 속성값을 줘서 font의 미세한 위 아래 공간을 없앨 수 있다.

## CSS Selector 심화

### 속성 선택자

- \*: 전체, ^: 시작/반대, $: 끝
- 태그[속성이름]
  - **속성이름**에 해당되는 속성을 가진 태그를 모두 선택한다.
- 태그[속성이름="변수"]
  - **속성이름**의 속성값이 **변수**와 일치하는 태그를 선택한다.
- 태그[속성이름~="변수"]
  - **속성이름**의 속성값이 **변수**와 일치하는 태그를 선택한다.
- 태그[속성이름^="변수"]
  - **속성**의 속성값이 **변수**로 시작하는 태그를 선택한다.
- 태그[속성$="변수"]
  - **속성**의 속성값이 **변수**로 끝나는 요소를 선택한다.
- 태그[속성*="변수"]
  - **속성**의 속성값이 **변수**를 포함하는 태그를 선택한다.
- 태그 [속성|="변수"]
  - **속성**의 속성값이 **변수**이거나 **변수**로 시작하면서 뒤에 바로 `-` 기호가 있는 태그를 선택한다.
- `태그[속성~="변수"]`와 `태그[속성*="변수"]` 차이
  - `~=`는 단어를 기준으로 `*=`는 문자열을 기준으로 판단하게 된다.
  - 변수에 **paullab**를 할당하면 `~=`은 단어가 기준이므로 `paullab`과 `paullabs`를 다르게 인식하고,
  - `*=`은 문자열을 기준으로 `paullabs` 안에 `paullab`가 포함되어 있기 때문에 선택을 한다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>속성 선택자</title>
    <style>
      /* 1. 태그[속성이름] */
      /* 속성명으로 선택했을 경우 */
      /* div 태그이면서 class 속성을 가지고 있는 요소 */
      div[class] {
        display: inline-block;
        width: 100px;
        height: 100px;
        border: 1px solid black;
      }
      /* a 태그이면서 href 속성을 가지고 있는 요소 */
      a[href] {
        color: gray;
      }

      /* 2번부터 하나씩 주석을 해제해보며 실습해 보세요 :) */

      /* 2. 태그[속성이름="값"] */
      /* div 태그이면서 class명이 red인 요소*/
      /* 공백을 포함하지 않기 때문에 red 클래스 하나만 가진 요소가 선택됩니다. */
      /* div[class="red"] {
            background-color: red;
        } */

      /* 3. 태그[속성이름~="값"] */
      /* div 태그이면서 red인 class를 가지고 있는 요소 */
      /* 공백을 포함하기 때문에 red 클래스를 가진 요소는 div 태그는 모두 선택됩니다. */
      /* div[class~="red"] {
            background-color: red;
        } */

      /* 4. 태그[속성이름*="값"] */
      /* div 태그이면서 class 중 red 문자열을 포함하는 요소 */
      /* div[class*="red"] {
            background-color: red;
        } */

      /* 5. 태그[속성이름^="값"] */
      /* div 태그이면서 class 속성값이 sky로 시작하는 요소 */
      /* div[class^="sky"] {
            background-color: skyblue;
        } */
      /* a 태그이면서 href 속성값이 http로 시작하는 요소 */
      /* a[href^="https"] {
            color: red;
        } */

      /* 6. 태그[속성이름$="값"] */
      /* div 태그이면서 속성값이 pink로 끝나는 요소 */
      /* div[class$="pink"] {
            background-color: pink;
        } */
      /* a 태그이면서 href 속성값이 kr로 끝나는 요소 */
      /* a[href$="kr"] {
            color: black;
        } */

      /* 6. 태그[속성이름|="값"] */
      /* a 태그이면서 href 속성값이 http이거나 http로 시작하는 요소 */
      /* 
           언더바(_), 공백, 합성어가 포함될 경우 적용되지 않으며,
           독립된 값이거나 하이픈을 포함하는 값은 선택됩니다.
         */
      /* a[href|="http"] {
            color: red;
        } */
    </style>
  </head>
  <body>
    <!-- class 속성을 가지고 있지 않아 스타일 설정이 되지 않음 -->
    <div>1</div>

    <div class="red">2</div>
    <div class="red pink">3</div>
    <div class="redpink skyblue pink">4</div>
    <div class="skyblue">5</div>

    <hr />

    <!-- href 속성을 가지고 있지 않아 스타일 설정이 되지 않음 -->
    <a>바울랩</a>

    <a href="http://paullab.co.kr">바울랩1</a>
    <a href="http://paullab.com">바울랩2</a>
    <a href="https://paullab.com">바울랩3</a>
    <a href="http">바울랩4</a>
    <a href="http-paullab">바울랩5</a>
  </body>
</html>
```

### 가상 클래스 선택자(Psudo Class Selector)

실제로 HTML에 존재하지 않는 클래스지만 마치 클래스가 존재하는 것처럼 작동한다고 하여 가상 클래스 선택자라 부른다.

```html
<ul>
  <li class="foo">1</li>
  <!-- .foo:first-child -->
  <li class="foo">2</li>
  <li class="foo">3</li>
  <!-- .foo:nth-child(3) -->
  <li class="foo">4</li>
  <li class="foo">5</li>
  <!-- .foo:last-child -->
</ul>
```

- **.foo:first-child**: class="foo"인 엘리먼트 중 첫번째 자식인 엘리먼트를 선택한다.
- **.foo:last-child**: class="foo"인 엘리먼트 중 마지막 자식인 엘리먼트를 선택한다.
- **.foo:nth-child(3)**: class="foo"인 엘리먼트 중 3번쨰 자식인 엘리먼트를 선택한다.
  - **.foo:nth-child(odd)**: class="foo"인 엘리먼트 중 홀수 번째 자식인 엘리먼트를 모두 선택한다.
  - **.foo:nth-child(even)**: class="foo"인 엘리먼트 중 짝수 번쨰 자식인 엘리먼트를 모두 선택한다.
  - **.foo:nth-child(n)**: class="foo"인 엘리먼트 중 n번째 자식인 엘리먼트를 모두 선택한다. n은 0부터 1씩 증가
  - **.foo:nnth-child(3n)**: class="foo"인 엘리먼트 중 3번째 자식마다 모두 선택한다.
  - **.foo:nth-child(3n+1)**: class="foo"인 엘리먼트 중 3n+1번째 자식인 엘리먼트를 모두 선택한다.
- **a:visited**: 사용자가 방문한 적이 있는 링크를 선택
  - 개인정보 보호를 위해 매우 제한적이다.

### 상호 작용을 위한 가상클래스

#### :hover

사용자가 마우스를 요소 위에 올렸을 때 적용된다. 스마트폰이나 패드 류의 터치스크린 기기에서는 사용자의 손가락이 호버되는 시점을 알 수 없기 때문에 모바일 기기가 많아지면서 점점 사용 빈도가 줄어드는 기능이다.

#### :active

사용자가 요소를 실행할 때(버튼을 누르거나 링크를 클릭할 때) 적용된다.

#### :focus

요소에 포커스가 있을 때 적용된다. 클릭할 수 있는 요소나 폼컨트롤(input, select 등등)과 같이 상호작용할 수 있는 모든 요소에는 포커스가 가능하다.

#### :checked

선택한 상태의 **라디오, 체크박스, 옵션** 요소를 나타낸다.

### 가상 요소 선택자

#### ::before

요소의 맨 첫번째 자식으로 HTML 코드에 존재하지 않는 가상요소를 하나 생성한다.

#### ::after

요소의 맨 마지막 자식으로 HTML 코드에 존재하지 않는 가상요소를 하나 생성한다.

#### ::selection

사용자가 선택하여 하이라이트된 상태의 텍스트를 선택한다.

#### 가상 클래스와 가상 요소 선택자 차이

- **가상 요소 선택자**는 콜론이 2개(가상 클래스 선택자는 1개). 간혹 가상요소 선택자에 콜론이 1개만 보이는 경우가 있는데 `레거시 브라우저 호환`을 위한 선택이다.(IE 8 이하)
- 가상 요소 선택자는 마크업 없는 요소를 삽입. 가상 클래스 선택자는 클래스 없는 요소에 클래스 삽입.
  - 브라우저, OS 스크린리더에 따라 가상요소 선택자를 읽을 수도 있고 읽지 않을 수도 있다.

#### CSS 연습 및 치트시트

- [CSS selector game](https://flukeout.github.io/)
- [cheatsheet](https://www.w3schools.com/cssref/css_selectors.asp)

## CSS Selector

### Combinator (aka 복합 선택자, 연결자 혹은 결합자)

CSS Combinator는 복합 선택자, 연결자, 결합자 등의 다양한 한글 표기가 존재한다.

```css
/* 선택자 */
header a {
  display: inline-block;
  /* 속성 */ /* 값 */
}
/* header에 포함되어 있는 a의 display를 inline-block으로 설정  */
```

### 자손(Descendent) 콤비네이터

하위 선택자는 선택자 사이를 `공백`을 사용하여 나타낸다. 앞 요소의 `자손`인 뒤 요소를 선택한다.  
이 태그는 section 아래 있는 모든 ul태그를 가리키기 때문에 바로 아래 자식을 선택할 때에는 자식 콤비네이터를 사용한다.

### 자식(Child) 콤비네이터

하위 선택자는 선택자 사이를 `>`를 사용하여 나타낸다. 앞 요소의 `자식`인 뒤 요소를 선택한다.  
`자손`은 `자식`을 포괄하는 의미로 `자손`은 모든 하위 요소를 의미하고 `자식`은 바로 아래의 하위 요소에만 적용한다.

### 인접 형제(Adjacent sibling) 콤비네이터

`형제`란 같은 부모를 가지는 요소들을 말한다.  
인접 형제 콤비네이터는 선택자 사이를 `+`를 사용하여 나타낸다. `+`를 기준으로 전방 선택자 **직후**에 나오는 후방 형제 선택자를 선택한다.

### 일반 형제(General sibling) 콤비네이터

일반 형제 콤비네이터는 선택자 사이에 `~`를 사용하여 나타낸다. `~`를 기준으로 앞 요소 이후에 나오는 모든 뒤 요소를 선택한다.

### 예제

```css
/* 자손(Descendent) 콤비네이터 */
section ul {
  text-shadow: none;
}

/* 자식(Child) 콤비네이터 */
section > ul {
  text-shadow: none;
}

/* 인접 형제(Adjacent sibling) 콤비네이터 */
h1 + ul {
  color: red;
}

/* 일반 형제(General sibling) 콤비네이터 */
h1 ~ ul {
  color: red;
}
```

## flex

`display` 속성으로, 내부 자식 박스들의 배치에 영향을 미치는 내부 디스플레이 타입 중 하나이다.

- [flexngrid](https://flexngrid.com/)
- [MDN: flex](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
- [Codepen(flex)](https://codepen.io/enxaneta/full/adLPwv)

### 기본 속성

- 가로 축(x축) 또는 세로 축(y축) 한 방향으로 배치 및 정렬
  - 각 요소의 순서를 변경하거나 요소들의 영역을 동일하게 분배하는 것 가능!
- 단, 한 방향으로만 설정할 수 밖에 없는 치명적인 단점이 있다.
- **flex 속성은 컨테이너에 적용할 수 있는 컨테이너 속성과 아이템에 적용할 수 있는 아이템 속성으로 구분 가능하다.**
  - Block-level Element의 성질을 가지며 주로 부모의 속성을 통해 자식들을 컨트롤한다.
  - 이 때 부모를 `Flex-container`, 영향을 받는 자식들을 `Flex-item`이라고 부른다
- flex는 자신의 직계자식까지만 영향을 미친다.

### Axis, Cross-Axis

- flex 레이아웃에서는 정렬에서 기준점이 되는 축(axis)이 존재한다.
  - 메인 축과 교차 축을 기준으로 아이템을 정렬
  - `메인축`: 아이템이 배치되는 방향축을 의미
  - `교차축`: 메인 축과 수직을 이루는 축을 의미
- axios가 row 상태라면 cross-axis는 column이고, axis가 column이면 cross-axis는 row인 상태이다.

### flex-container에 사용하는 속성

#### flex-direction

- flex-container가 사용할 주축과 정렬 방향을 결정한다.
  - **row**: 주축을 행 방향으로 한다.
  - **row-reverse**: 주축을 행 방향으로 하되 축의 시작점을 역전한다.
    - 즉, `flex-direction: row`였을 때의 `flex-start`가 `flex-end`로 변경된다.
  - **column**: 주축을 열 방향으로 한다.
  - **column-reverse**: 주축을 열 방향으로 하되 축의 시작점을 역전한다.
    - 즉, `flex-direction: column`이었을 때의 `flex-start`가 `flex-end`로 변경된다.

#### justify-content

- **주축(Axis)**을 기준으로 배열의 위치를 조종하거나 아이템 간의 간격을 설정할 수 있다.
  - 세 개의 아이템이 있다고 가정
  - **flex-start**: 시잠점
  - **flex-end**: 끝점
  - **center**: 중간
  - **space-between**: 첫 번재 아이템은 시작점에, 마지막 아이템은 끝점에, 나머지 아이템들은 균등한 간격으로 정렬
  - **space-around**: 전체 아이템들을 균인할 여백을 포함해서 정렬
- flex-direction의 속성값에 따라 main-axis(메인축)의 방향이 바뀌기 때문에 유의해야 한다.
  - `flex-direction: row`: 가로 축 방향
  - `flex-direction: column`: 세로 축 방향

#### align-items, align-content

- **align-items**: **교차 축(Cross-axis)** 방향으로 아이템 정렬을 설정하는 속성

  - `flex-direction: row`라고 가정
  - **stretch**: 기본값으로 아이템들이 컨테이너 높이만큼 가지게 된다.
  - **flex-start**: 세로 방향 기준 `시작점`을 기준으로 아이템이 가지는 높이만큼 정렬된다.
  - **flex-end**: 세로 방향 기준 `끝점`을 기준으로 아이템이 가지는 높이만큼 정렬된다.
  - **center**: 세로 방향 기준 시작점과 끝점 중간에 위치하게 된다.

- **align-content**: **교차 축(Cross-axis)** 방향으로 아이템 정렬을 지정하는데
  - flex-wrap 속성이 wrap으로 지정되어 있는 상태에서 item이 여러 줄로 배치되었을 때만 적용되는 속성
- align-content 기본 속성의 값이 align-items와 마찬가지로 stretch로 지정되어 있다.
  - **flex-start**: 교차축 방향에서 flex 레이아웃 시작점을 기준으로 정렬
  - **flex-end**: 교차축 방향에서 flex 레이아웃 끝점을 기준으로 정렬
  - **space-between**: `justify-content`처럼 교차축 방향 기준으로
    - 첫 번째 아이템은 시작점에, 마지막 아이템은 끝점에, 중간 아이템들은 균등하게 여백을 분배해서 정렬한다.

#### flex-wrap

- flex-container는 flex-item 넓이의 합이 컨테이너보다 크다고 해서 강제로 flex-item의 넓이를 조절하지 않는다.
  - 때문에 자식 요소를 감싸서 부모의 넓이에 따라 자식들을 줄바꿈하도록 하는 기능이 필요한데, 그것이 바로 flex-wrap이다.
  - 즉, 아이템의 크기가 컨테이너 전체 크기보다 커질 때 아이템의 줄바꿈을 어떻게 할 것인지 지정하는 속성이다.
- 속성값
  - **wrap**: 컨테이너의 공간이 부족하면 자동으로 줄바꿈한다.
  - **nowrap**: 기본 속성인 `nowrap`으로 진형을 유지하면서 줄어들거나 늘어난다.
  - **wrap-reverse**: 순서가 거꾸로 줄바꿈하게 된다.

#### flex-flow

- flex-direction과 flex-wrap은 같이 사용하는 일이 많기 때문에 flex-flow을 통해 단축하여 사용할 수 있다.

```css
.container {
  flex-flow: row wrap; /* flex-direction: row; flex-wrap: wrap; */
}
```

### flex-item에 사용하는 속성

flex-basis, flex-grow, flex-shink는 각각 flex-container의 상태에 따라 flex-item의 레이아웃을 결정히는 속성들이다.

#### flow-basis

- flex-item의 크기를 지정한다.
  - width, height와 다른 점은 axis 방향에 따라 달라진다는 것 그리고 내부의 컨텐츠에 따라 유연한 크기이다.
  - 기본값은 auto
  - 만약 flex-basis 값이 적용되어 있다면 width, height 값은 무시된다.
  - 기본적으로 px이나 em 등의 단위값을 사용하며, 0 외에 다른 상수값을 사용할 수 없다.
  - 메인축의 방향이 row(가로)일 경우에는 가로 크기를, column(세로)일 경우에는 세로 크기를 지정
- `width 속성과의 차이`
  - **flex-basis의 속성은 아이템이 표현될 때의 나타나야할 최소 크기를 설정한다고 생각하면 된다.**

```html
<head>
  <style>
    .container {
      /* 1. 주 축에 따라 basis가 넓이가 되기도 하고, 높이가 되기도 한다. */
      /* flex-direction: column; */
      /* 2. 넓이를 다 포함하지 못할 때는 개행한다. */
      flex-wrap: wrap;
    }
    .item {
      background-color: aqua;
      border: 1px solid black;
    }
    .item:nth-child(2) {
      /* 1. 주 축에 따라 basis가 넓이가 되기도 하고, 높이가 되기도 한다. */
      /* flex-basis: 150px; */

      /* 2. 2개의 값이 있었을 때 basis의 값을 우선한다. */
      /* flex-basis: 100px; */
      /* width: 150px */

      /* 3. width의 값은 넓이를 강제한다. */
      /* width: 100px; */
      /* flex-basis: 100px; */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2222222222222222</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
  </div>
</body>
```

#### flex-grow

- flex-basis의 값에서 더 늘어나도 되는지 지정하는 값으로, 할당된 값에 따라 flex-container의 남은 여백을 할당하도록 한다.
  - 0 이상의 값을 가지게 된다면 flex-basis로 `지정한 크기를 제외한 남는 공간(여백)`을 flex-grow로 지정한 숫자의 비율로 분배하게 된다.
    - **컨텐츠 크기의 비율만큼이 아닌 컨텐츠 크기를 제외한 여백의 비율만큼 값이 달라진다.**
      - 줄어들 때에도 여백의 비율만큼 줄어들고, 여백이 없어지면 `flex-basis: 0`이라면 컨텐츠 크기가 줄어든다.
    - flow-grow: 1 -> 자식 요소들이 모두 동일한 크기의 공간을 할당받는다.
    - flow-grow: 2 -> 특정한 하나의 자식에게만 줄 경우 다른 자식요소보다 두 배의 **여백 공간**을 할당받는다.
    - 만약 자식요소들의 컨텐츠 크기가 존재한다며 그 컨텐츠의 넓이에 따라 할당받는 값이 달라진다.
  - `flex-basis: 0(초깃값)`을 주게 되면 여백 공간이 아니라 전체 공간을 분할한다.(\* 늘어나지 않음을 의미)

#### flex-shrink

- flex-grow에 반대되는 개념으로 컨테이너의 공간이 줄어들때 flex-basis의 값에서 더 줄어들어도 되는지 지정하는 값이다.
  - flex-grow 속성을 사용하면 의도한 크기 이하로 줄어들지 않도록 설정해서 특정 크기를 유지할 수 있다.
  - 0의 값을 사용할 경우 컨테이너의 크기가 줄어도 값은 고정된다. 즉, 아이템은 줄어들지 않는 것을 의미한다.
  - 마이너스 숫자를 사용할 수 없으며 기본값은 1 -> 줄어들 수 있는 것을 의미
- 실무에서는 더 줄어들지 않게 하기 위해서 사용한다.

#### flex

- flex-grow, flex-shrink, flex-basis 속성의 값을 축양하여 사용할 수 있는 것이 `flex` 속성이다.
- **flex 축약 속성**을 사용하도록 권장된다!

```css
div {
  /* flex: flex-grow, flex-shrink, flex-basis */
  flex: 2; /* flex-grow:2; flex-shrink: 1; flex-basis: 0 */
  flex: 1 1; /* flex-grow: 1; flex-shrink: 1; flex-basis: 0 */
  flex: 2 300px; /* flex-grow: 2; flex-shrink: 1; flex-basis: 300px; */
  flex: 1 0 300px; /* flex-grow: 1; flex-shrink: 0; flex-basis: 300px; */
}
```

```css
.item:nth-child(2) {
  flex: 1 0 300px;
}
```

- 플렉스 안에 있는 item의 속성을 정하는데
  - flex-grow: 1(컨테이너가 늘어나면 아이템들의 여백이 1:1로 늘어난다)
  - flex-shrink: 0(컨테이너가 줄어들면 아이템들의 여백이 같이 줄다가 고정된다)
  - flex-basis: 300px(아이템들의 기본 컨텐츠 크기 결정)

#### align-self

- 부모의 `align-items` 속성을 덮어 flex-item에게 개별적인 `align-items` 속성을 부여한다.
  - 즉, `align-self`는 **교차축**에서 개별 아이템의 정렬 방법을 지정하는 속성이다.
  - **align-self 속성은 container 속성인 align-items 속성보다 우선순위가 높아 덮어쓸 수 있는 것이다!**
  - 기본값은 `align-items`와 마찬가지로 `stretch`이다.

#### order

- flex-item 들의 **시각적인** 순서를 결정한다. 수의 의미로 순서를 결정하지 않는다. 수의 크기로 결정한다.
  - 시각적인 순서라 한 이유
    - HTML 문서를 조작하는 것이 아니기 때문!
    - 보이는 순서만 바뀔 뿐 데이터 순서가 바뀌는 것이 아니다.
    - 따라서 스크린리더 같은 기능들을 사용할 때에는 `order`로 지정된 순서가 적용되지 않는다.
  - 수가 작을수록 더 높은 우선 순위를 부여 받는다.(음수도 사용 가능)
    - 기본값은 0

## Grid

### Grid 기본 개념

부모 컨테이너 요소 안에서 내부 자식 요소들의 위치를 X축과 Y축 방향 모두를 이용해 배치하는 내부 디스플레이 타입의 하나이다.

<div style="text-align: center">
  <img src="../img/grid.png" alt="grid" width="80%">
</div>

- 그리드 컨테이너: 그리드의 가장 바깥 영역
- 그리드 아이템: 그리드 컨테이너의 자식 요소들
- 그리드 트랙: 그리드의 행(row) 또는 열(column)
- 그리드 셀: 그리드의 한 칸 (개념적인 정의)
- 그리드 라인: 그리드 셀을 구분하는 선
- 그리드 넘버: 그리드 라인의 각 번호
- 그리드 갭: 그리드 셀 사이의 간격
- 그리드 에어리어: 그리드 셀의 집합

### grid-container에 사용하는 속성

- `display: grid`로 그리드 컨테이너와 아이템을 설정한다.

#### grid-template-rows

- 행방향 그리드 트랙의 사이즈를 설정한다.

#### grid-template-columns

- 열방향 그리드 트랙의 사이즈를 설정한다.
- `fr`: 비율을 의미한 **fraction**의 약자
  - grid 컨테이너 안에서 사용되는 데이터 타입으로, 상황에 따른 유연한 길이를 의미한다.

#### repeat() 함수

- row 혹은 column 방향으로 grid-track의 사이즈를 좀 더 간단한 형태로 표현하도록 도와주는 CSS 함수이다.
- 함수에 전달하는 첫 번째 인자는 반복 횟수(repeat count), 두 번째 인자는 반복할 트랙 셋팅 값이다.

#### minmax() 함수

- 최소와 최대 사이의 범위를 설정하는 함수이다. 최소와 최대값을 의미하는 두 가지 인자를 가진다.

```css
.container {
  display: grid;

  /* 열방향 그리드 트랙의 최소 넓이를 50px, 최대 넓이를 150px로 한다. */
  grid-template-columns: repeat(3, minmax(50px, 150px));

  /* 행방향 그리드 트랙의 최소 넓이를 120px, 최대 높이를 가용할 수 있는 최대 크기로 한다. */
  grid-template-columns: repeat(3, minmax(120px, auto));
}
```

#### auto-full & auto-fit

만약 repeat 함수를 사용할 때, 반복되는 카운트를 고정하지 않고 컨테이너의 넓이에 따라 **가능한 많은** 그리드 컬럼을 배치하고 싶다면 사용하는 키워드 값이다.

```css
.container {
  display: grid;

  grid-template-columns: repeat(3, minmax(50px, 150px));
  grid-template-columns: repeat(auto-fill, minmax(50px, auto));
  /* grid-template-columns: repeat(auto-fit, minmax(50px, auto)) */
}
```

- `auto-fill`과 `auto-fit` 모두 자동으로 필요한 그리드 트랙을 만들어 배치하는 동일한 기능을 하지만 배치할 수 있는 그리드 셀이 없을 때 차이가 발생한다.
- `auto-fill`과 `auto-fit` 중 어떤 키워드를 사용할지는 기획 의도나 디자인에 따라 선택하시면 된다.

#### gap

셀과 셀 사이의 간격을 설정할 때 사용할 수 있는 속성이다. 복잡한 레이아웃 안에서 마진 대신 편리하게 간격을 설정할 수 있다. **grid-gap**은 gap으로 사용할 수 있따.

- gap 속성은 IE 미지원이다.

### grid-item에 사용하는 속성

#### 그리드 아이템의 영역(grid area) 설정하기

그리드 컨테이너 안에서 그리드 아이템이 차지하는 영역의 범위와 위치를 설정하는 속성이다. 범위의 시작과 끝을 설정할 수 있으며, 컬럼과 로우 방향에 대한 축약 속성을 지원한다.  
이 때 범위의 기준이 되는 값은 바로 grid-line의 번호이다.

```css
.container {
  display: grid;
  height: 500px;
  grid-template-columns: repeat(3, 1fr);
}

.container li:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}

/* grid-colmn: 1 / 3 */
/* grid-row: 1 / 3 */

/* grid-area의 설정 값은 순서대로 각각 -> 그리드 start가 먼저인 것 주의
grid-row-start, grid-column-start, grid-row-end, grid-column-end를 의미한다. */

/* grid-area: 1/1/3/3 */

/* span 키워드를 사용하면 그리드 라인의 번호를 사용하지 않아도 된다. */
/* grid-area: 1 / 1 / span 2 / span 2; */
```

- 익숙하지만 새로운 키워드 `span`
  - 그리드에서 **span**이라는 키워드를 사용할 수 있다. span의 사전적 의미는 "한 뼘", "~을 채우다"의 의미를 가지고 있다.

#### grid area로 좀 더 직관적으로 영역 설정

```html
<head>
  <style>
    body {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-areas:
        "header header header"
        "main main aside"
        "footer footer footer";
    }

    header {
      grid-area: header;
      background-color: pink;
    }

    main {
      grid-area: main;
      background-color: lightblue;
    }
    aside {
      grid-area: aside;
      background-color: lightgreen;
    }
    footer {
      grid-area: footer;
      background-color: aquamarine;
    }
  </style>
</head>
<body>
  <header>header</header>
  <main>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error repellat
    earum iure id natus, consectetur, aut a adipisci, suscipit dolore in quam
    commodi recusandae magni excepturi sapiente quasi optio accusantium?
  </main>
  <aside>aside</aside>
  <footer>footer</footer>
</body>
```

#### 그리드 아이템의 Z축 설정하기

grid 안에서는 굳이 position 속성을 사용하지 않더라도 z-index를 사용하여 화면에 보여지는 우선수위를 설정할 수 있다.

```css
/* 위 코드의 css만 수정 */
aside {
  grid-area: aside;
  background-color: lightgreen;
  transition: 0.3s;
  transform-origin: 0 0;
}

/* aside 에 마우스를 호버하면 10% 크기를 키웁니다. */
aside:hover {
  transform: scale(1.1);
}

footer {
  /* aside 의 크기가 커져도 footer를 가리지 않게 합니다. */
  z-index: 1;
  grid-area: footer;
  background-color: aquamarine;
}
```

## CSS transition, transform

### Transition

CSS 속성값이 변할 때, 값의 변화가 일정 시간에 걸쳐 일어나도록 설정하는 것

### Transition의 속성들

#### transition-delay

- `transition`이 일어나기 전까지 얼마나 기다릴지 지정해주는 것
  - **절대값 시간**만큼 기다렸다가 시작하므로 음수값으로 작성해도 된다.

#### transition-duration

- `transition`이 얼마만큼의 시간 동안 변할지 지정해 준다.
  - 초 단위를 나타내는 `s`나 밀리 초를 나타내는 `ms`로서 값을 설정한다.

#### transition-property

- 어떤 속성에 `transition` 효과를 줄지 설정하는 것
- 속성값
  - `all`: 기본값으로 모든 속성에 `transition` 효과가 나타나게 하는 것
  - `none`: 속성들이 `transition` 효과를 받지 못하는 것
  - `property`: `transition` 효과를 적용하고 싶은 css 속성을 설정하면 지정된 속성에 `transition`이 나타난다.
  - 하나 이상의 속성에 적용하고 싶을 때는 **쉼표**로 나열한다.

#### transition-timing-function

- `transition`의 진행 속도를 설정할 수 있다.
- [TCPSchool 자세히 보기](http://www.tcpschool.com/css/css3_transform_transition)

#### transition

```css
div {
  transition: width 2s linear 1s;
}
```

`transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay` 순의 축약 속성

### transform

HTML 요소를 여러 형태로 변형할 때 사용하는 속성으로 가장 많이 사용하는 속성에는 `scale`, `rotate`, `translate`, `skew` `origin`이 있다.

#### scale

요소의 크기를 변환시킬 때 사용하는 속성으로 마치 위에 예시에서 width와 height의 크기를 늘린 것처럼 변형이 되지만 기본으로는 중심점이 가운데이기 때문에 가운데를 중심으로 커지는 효과를 나타낸다.  
scale의 값에는 2가지 인자(x축, y축)를 받을 수 있다. 한 개의 인자값만 입력할 경우 x, y 동일한 수치를 뜻한다.

#### rotate

`rotate`는 회전을 시켜주는 값이다. 괄호 안에 각도를 입력하면 입력값만큼 회전을 하며, 사용 단위는 **deg(degree)**를 사용한다.  
360deg 한 바퀴를 뜻하기에 `transform: rotate(1turn)`으로도 사용이 가능하다.

#### translate

`translate(옮기다)`는 Object를 x, y축 지점으로 이동을 시켜주는 값으로 (x축, y축)을 뜻한다.  
기준점은 가운데이며 값이 증가할 시 x축은 오른쪽으로 y축은 아래 방향으로 이동한다.  
음수 값을 적용시 반대 방향으로 이동한다.

#### skew

`skew(왜곡하다)`는 상자를 비틀기 또는 외곡을 주어 형태를 변형시키는 속성이다. 사용 단위는 **deg(degree)** 단위를 사용한다.

#### transform-origin

transform되는 Object의 기준점을 변경할 때 사용된다.  
default값은 가운데이지만 `transform-origin`을 사용하여 left, right, top, bottom, center, 숫자 등으로 기준점을 설정할 수 있다.

#### translate vs position

- 브라우저의 부담을 덜기 위해서 GPU(Graphic Processing Unit)를 이용한 그래픽 가속능력을 사용할 수 있는데 이러한 능력을 지원하는 css 속성이 바로 transform이다.
  - GPU는 여러 개의 코어가 간단한 작업을 동시에 협업하는데 특화되어 있기 때문에 애니메이션을 빠르게 처리할 수 있다.
- 결론: 정적인 사이트에서 요소의 위치를 단순 배치하는 것은 position을 사용해도 괜찮지만, 애니메이션이나 혹은 동적으로 요소의 위치를 이동해야 하는 경우 transform 속성을 사용하는 것이 성능에 좋다.

## CSS Animation 애니메이션

### Keyframe

어떤 변화가 일어나는 지점을 설정하여 특정 시간 동안 해당 Property와 Value를 변화시킨다.

#### transition과 animation의 차이점

- transition과 animation 속성은 JavaScript의 도움 없이 오브젝트에 직접 애니메이션 효과를 적용할 때 사용한다.
  - transition과 animation은 `요소 상태에 대한 의존 여부`에 대해 차이를 가진다.
  - transition은 요소의 상태가 변경되어야 애니메이션을 실행할 수 있지만,
  - animation 속성은 요소의 상태 변화와 관계없이 애니메이션을 실행할 수 있다.
    - 또한, animation 속성은 `@keyframe` 속성을 이용해 프레임을 추가할 수 있다.

### animation의 단일 속성들
* `animation-name`: 애니메이션을 재생(호출)하기 위해서 반드시 이름 정의
  * 이름 규칙: **영문 소문자, 숫자 문자열, 언더바(_), 하이픈(-)**을 사용한다. 영문 대문자, 숫자, 특수문자는 사용할 수 없다.
  * 여러 개의 animation-name을 동시에 나열할 경우 `,`를 사용한다.
  