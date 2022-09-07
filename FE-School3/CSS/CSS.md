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

<details>
  <summary>마진 병합 다른 예시</summary>

```html
<head>
  <style>
    .wrapper {
      background-color: aqua;
      margin: 100px auto;
      width: 260px;
      /* border: 1px solid transparent; */
      /* padding: 1px; */
      display: flow-root; /* 부모에게 flow-root로 줘서 위, 아래 마진 겹침 해결 */
    }
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

</details>

- A와 B 박스가 마진 병합 현상으로 인해위 아래로 margin 60px이 돼야하는데 30px인 것을 확인할 수 있다.
- 그리고 부모의 자식의 margin 병합도 일어나 아래 이미지 같은 현상이 일어난다.
  - 해결하기 위해서는 부모 요소에 위 코드 주석처럼 `border`, `padding` 속성을 줘서 부모와 자식의 마진 겹침 현상을 해결할 수도 있지만 `display: flow-root;`로 설정해서 마진 겹침 현상을 해결할 수 있다.

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
