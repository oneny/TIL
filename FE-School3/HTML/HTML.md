# HTML

## Sections

> div 태그만 남발하면 검색 엔진이 시맨틱 태크로 보고 어떻게 계층적으로 이루어졌는지 보고 구글 검색시 정보를 제공할 수 있다.  
> 구획 짓는 시각적으로 보여지는 것은 없다. 절적한 위치에 넣는 적절한 태그를 사용하자.

### \<section>과 \<article>

#### \<article>

- 독립적으로 구분하거나 재사용할 수 있는 구획을 나타낸다.
- 어떤 페이지에 붙여도 독립적으로 사용 가능하다면 article 요소를 고려하는 것이 좋다.

#### \<section>

- 일반적으로 연관성 있는 문서의 구획을 나누고자 할 때 사용하는 요소

```
section vs article

* article 요소는 독립적 콘텐츠(다른 서비스에 가져다 놔도 이상하지 않음)
* section 요소는 사이트 내 연관 콘텐츠(다른 서비스에 가져다 놓으면 이상함)
* article과 section 요소는 heading 요소와 함께 사용하는 것을 권장(높이 없이 비워두기도 함)
```

### \<header>

- 특정한 컨텐츠의 시작 부분을 나타내는 요소로 일반적으로 구역의 제목을 포함한다.

### \<h1> ... \<h6>

- heading은 제목을 지정하기 위해 사용된다. 그리고 중요도에 따라 사용되며 단순히 글자를 크게하거나 굵게 하기 위해 사용하지는 않는다.
- \<h1> 요소는 페이지당 한 번만 사용할 것을 권장한다.
- heading 요소를 사용하면 익명 영역(anonymous section)을 생성한다. living standard에 sections에 해당 태그가 들어가 있으나, 이해를 돕기 위해 글자 태그로 그룹핑한다.
  - 따라서 heading 레벨을 따라 페이지의 계층구조를 쉽게 파악할 수 있도록 한다.
- \<hgroup>\</hgroup>으로 대제목과 소제목으로 나눌 수 있다.

### \<header>

- nav(네이게이션, 탐색) 요소는 현재 페이지 내, 또는 다른 페이지로의 링크를 보여주는 구획을 나타낸다. 보통 메뉴에 사용된다.
  ```html
  <nav>
    <a href="https://paullab.co.kr">바울랩</a>
    <a href="https://naver.com">네이버</a>
    <a href="https://google.com">구글</a>
  </nav>
  ```

### \<aside>

- 문서의 주요 흐름을 따라가지 않는, 간접적으로 관련있는 별개의 구획을 만들 때 사용한다.
- 보통 각주 혹은 광고 영역으로 활용한다. 이 밖에도 양쪽 사이드에 위치해야 하는 요소를 그룹 지을 때 사용한다.

<details>
<summary>aside 태그 예시</summary>

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body {
        padding: 0;
        margin: 0;
      }
      section,
      aside {
        float: left;
        padding: 10px;
        height: 500px;
      }
      section {
        width: 60%;
        background: goldenrod;
      }
      aside {
        width: 30%;
        background: greenyellow;
      }
    </style>
  </head>
  <body>
    <section>
      <h1>바울랩</h1>
      <p>
        바울랩은 제주코딩베이스캠프, 주식회사 위니브, 바울랩(학원, 연구원,
        출판사)로 이뤄져 있으며 기술교육의 보편화에 힘쓰고 있습니다.
      </p>
    </section>
    <aside>
      사이트 구경오세요. <br />
      <ul>
        <li>
          <a href="http://paullab.co.kr" target="_blank"> 홈페이지 </a>
        </li>
        <li>
          <a href="https://www.inflearn.com/users/@jejucoding" target="_blank">
            강의
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UC4GnvNKtuJ4cqWsYjxNxAEQ"
            target="_blank"
          >
            유튜브
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/weniv_official/?hl=ko"
            target="_blank"
          >
            인스타
          </a>
        </li>
      </ul>
    </aside>
  </body>
</html>
```

</details>

### \<footer>

- footer 요소가 속한 가장 가까운 구획의 작성자, 회사 등 정보, 저장권, 관련된 링크 등의 내용을 담는 구획 요소이다.

### \<address>

- 가장 가까운 부모 `article`이나 `body` 요소의 연락처 정보를 나타낸다.
- 만약 가장 가까운 부모 요소가 `body`라면 문서 전체의 연락처 정보를 의미한다.
  - 연락처 정보에는 전화번호, 메일 주소, 우편 주소 등이 있다.
  - 보통 `footer` 태그 안에 자주 사용된다.
  ```html
  <address>
    <a href="http://www.somedomain.com/contact"> 홈페이지</a>.<br />
    <a href="mailto:webmaster@somedomain.com"> 메일 주소</a>.<br />
    오시는 길:<br />
    제주특별자치도 제주시 동광로 137
  </address>
  ```

## Grouping content

### \<ol>, \<ul>, \<li>

- `<ol>`은 ordered list의 약자로 순서가 있는 목록을 뜻한다.
- `<ul>`은 unordered list의 약자로 순서가 없는 목록을 뜻한다.
- `<li>`은 각 항목들을 나열하는 태그로 list item을 뜻한다.
  - `<li>` 요소는 `<ol>` 혹은 `<ul>` 요소 안에서만 사용되어야 한다.
  - `<ol>`, `<ul>`의 직계 자식 요소로는 `<li>` 요소만 사용되어야 한다.

### \<dl>, \<dt>, \<dd>

- `<ol>`,`<ul>`,`<li>`가 목록을 정의할 때 쓰였듯이 `<dl>`, `<dt>`, `<dd>`도 목록을 정의할 때 쓰인다.
- 차이점이 있다면 `<dl>`, `<dt>`, `<dd>`는 <b>사전처럼 어떠한 것을 정의할 때 쓰이는 목록</b>이다.
  - `<dl>`는 정의 목록(definition list)
  - `<dt>`는 정의할 용어(definition term)
  - `<dd>`는 용어를 설명(definition description)

<details>
  <summary>dl, dt dd 태그 예시</summary>

```html
<dl>
  <dt>HTML</dt>
  <dd>마크업 언어입니다.</dd>
</dl>
```

</details>

### \<div>

- `<div>`는 디자인적 니즈나 레이아웃을 나눌 때 사용하는 태그이다. 이 태그는 컨텐츠의 형태를 변형시키지는 않지만 하위에 있는 여러 요소를 묶어 스타일을 변경시킬 수 있다.
- `<article>`, `<section>`, `<header>`, `<nav>`는 기본적으로 `<div>`와 같은 역할을 한다.
  - 차이점이 있다면 태그에 의미를 부여하는 것!
  - 예를 들어 내용이 하나의 독립된 컨텐츠라면 `<div>`대신 `<article>`를 사용한다.
  - 바꿔 말해 `<article>`, `<section>`, `<header>`, `<nav>` 모두 `<div>`로 대신 사용할 수 있으나 보다 적합한 요소를 찾은 후 대용할 태그가 없을 경우 사용하는 것이 좋다.

### \<figure>, \<figcaption>

- 웹페이지를 탐색하다보면 가끔 캡션(자막, 설명)이 있는 이미지를 접할 때가 있다.
- 이러한 콘텐츠의 경우 이미지와 캡션이 연결되도록 `<figure>` 요소를 도입할 수 있다.
- `<figcaption>` 요소는 이미지 캡션을 추가하기 위해 도입되었으며 `<figure>`, `<figcaption>` 요소가 나오기 이전에는 `<img>` 요소와 해당하는 캡션을 연결할 방법이 없었다.

<details>
  <summary>figure, figcaption 태그 예시</summary>

```html
<figure>
  <img src="images/baby.jpg" alt="엄마 코끼리와 아기 코끼리" />
  <figcaption>관심 받고싶어하는 아기</figcaption>
</figure>
```

</details>

### \<p>

- 태그는 단락을 표시하는 태그이다.
- 하나의 완결된 문단을 의미하기 때문에 `<p>` 태그 안에 자식으로 `<p>`를 또 사용하지 않으며, <b>줄바꿈의 용도로 사용해서도 안된다.</b>
  - `<p>` 안에 `<p>` 태그 쓰는 것 비추 -> `<br>` 태그를 사용하도록

### \<pre>

- HTML에 작성한 내용 그대로 화면에 표현한다. 주로 컴퓨터 코드를 표현할 때 사용한다.

<details>
  <summary>pre 태그 예시</summary>

```html
<pre>
<code>
  let val= 1;
  function myFunc(value){
    return value;
  }
  myFunc(val);
</code>
</pre>
```

</details>

### \<blockquote>

- 인용 블록이다. `<q>`는 인용구로 주로 문장 안에서 사용된다.
  - 여러 줄: \<blockquote>
  - 한 줄: \<q>

<details>
  <summary>blockquote 태그 예시</summary>

```html
<blockquote>
  <p>제발 그만해.. 이러다가 다~~ 죽어!</p>
  <cite>영화 오징어게임중에서. 오일남</cite>
</blockquote>

<p><q>제발 그만해.. 이러다 다~~ 죽어!</q>라고 오일남이 소리쳤습니다.</p>
```

</details>

### \<main>

<b>문서의 주요 콘텐츠</b>를 나타낸다.

주요 컨텐츠 영역이란 문서의 핵심 주제나 웹어플리케이션의 핵심 기능에 직접적으로 연결되어 있는 부분을 뜻한다. 메인 요소 안에 들어가는 내용은 문서의 유일한 내용이어야 한다. 메인의 범위는 굉장히 크다.

<b>웹페이지 내 유일해야 하므로 보통 header, main, footer 세 영역으로 나눌 수 있다.</b>

다른 페이지나 섹션에서 반복적으로 표시될 수 있는 정보, 예를 들어 사이트 로고, 검색 폼, 저작권 정보 등은 들어가지 않는다.

IE에서는 지원하지 않는 비교적 최근에 등장한 요소임으로 사용에 주의가 필요하다

### \<hr>

`<hr>` 태그는 원래는 가로줄을 표현하기 위해 사용했으나 HTML5에 오면서 의미가 생긴 요소이다.

이야기에서의 장면 전환 혹은 문단 안에서 주제가 변경되었을 때 그 구별을 위해 사용한다.

단락을 구분할 때 사용하므로 `<p>` 태그 내 사용은 웹 표준에 어긋난다.

<details>
  <summary>blockquote 태그 예시</summary>

```html
<p>
  근대란 그렇듯 각자의 능력이 타고난 신분의 제약에서 벗어나 인생역전의 기회를
  갖게 해주는 시대를 가리킨다. 그렇다면 쥘리앵의 인생역전은 어디까지 가능했던가.
</p>

<hr />

<p>
  포괄적으로 ‘근대’라고 적었지만 &#60;적과 흑&#62;의 시대적 배경은 프랑스의
  왕정복고기다. 1789년 대혁명 이후 구체제가 붕괴되었지만 1815년 워털루 전투에서
  패배한 나폴레옹이 완전히 몰락한 이후에 프랑스...
</p>
```

</details>

### Entity

- `엔티티`는 &로 시작해서 ;로 끝나는 문자열
- 보통 HTML 안에서 예약어로 사용되고 있는 문자를 대체하기 위한 용도로 사용한다.
- 참고: [Named character reference](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references)

```
* &: &amp;
* <: $lt;
* >: $gt;
* ": $quot;
```

## Text-level semantics

> [inline elements vs block-level elements](https://www.w3schools.com/html/html_blocks.asp)

### 텍스트 레벨 요소의 특징

1. 요소 안의 컨텐츠의 크기만큼만 영역을 점유한다.
2. 자식으로 Sections, Grouping Contents를 배치할 수 없다.

### \<br>, \<wbr>

\<br> 태그는 줄바꿈을 위한 태그이다. \<wbr> 태그도 간혹 사용하는데 \<wbr>은 텍스트 박스에서 한 줄로 모두 표시가 안될 때에만 줄바꿈이 일어나게 하는 역할을 한다.

```html
<p>
  <!-- 공백병합 -->
  Lorem ipsum <br />
  <br />
  <br />
  dolor sit amet
</p>
<p style="word-break:keep-all">
  풀밭에같지전인노년에게서<wbr />노년에게서청춘의청춘의청춘의
</p>
<!-- CJK언어의 word-break 속성은 기본적으로 break-all로 되어 있습니다. 영어와 차이를 비교해 보세요 :) -->
<p style="word-break:break-all">
  Lorem ipsum, dolor sit amet <wbr />consecteturadipisicing elit
</p>
```

### \<a href="경로">

- \<a> 요소는 HTML의 핵심적인 요소로써 하이퍼 텍스트 즉, 링크를 만들 때 사용한다.
- href 속성을 통해 경로를 지정할 수 있다. href 속성을 사용하지 않고 자바스크립트로 경로를 지정할 수도 있지만 이는 웹 접근성에 위배됨으로 href 속성을 사용해주는게 좋다.
- **html 문법상 sections, grouping content 요소들은 텍스트 레벨 요소의 자식으로 사용되지 않지만, 앵커 태그만 예외적으로 sections, grouping content 요소를 자식으로 하는 것이 허용된다.**
- 또한 \<a> 요소 안의 자식으로는 \<a> 요소나 \<button>과 같이 사용자와 인터렉션이 가능한 요소를 자식으로 두지 않기 때문에 주의가 필요하다.
- Internet Explorer는 download 속성을 지원하지 않는다.

```html
<a href="https://www.naver.com">click</a>
<!-- 새로운 탭 -->
<a href="https://www.naver.com" target="_blank">click</a>
<a href="./index.html">click</a>
<!-- 해쉬 링크(페이지 내부에서 이동하고 싶을 때 사용)(내부 링크) -->
<a href="#three">click</a>
<a href="./index.html" download>click</a>
<br />
<a href="./hello.hwp">hwp click</a>
<br />
<a href="./hello.hwp" download="a.hwp">hwp download click</a>
<br />
<a href="./hello.pdf">pdf click</a>
<br />
<a href="./hello.pdf" download="a.pdf">pdf download click</a>
<a href="tel:+82027777777">(02)777-7777</a> /
<a href="mailto:hello@gmail.com">hello@gmail.com</a>
```

### \<b>, \<strong>

- \<b> 태그는 굵은 글꼴을 표현하고 싶을 때 사용한다. 별 다른 의미는 없으며 오직 텍스트를 굵은 글씨로 표현하기 위한 용도이기 때문에 더 이상 사용하지 않는 요소이다.
- \<strong> 태그는 굵은 굵은 글꼴에 중요도를 더해 강조할 때 사용합니다. 중요도를 더 강조하고 싶을 때에는 \<strong>을 중첩하기도 한다.

```html
<p>
  <strong>공지사항</strong>
  adipisicing <b>elit</b>.
</p>
```

### \<i>, \<em>

- \<i> 태그는 기울임 글꼴을 나타낸다. HTML5에서는 전문 용어, 문단에서 주 언어와 다른 언어로 표현된 부분(주언어가 한글이지만 영어로 표기되었을 경우), 소설이라면 등장인물의 생각이 표기되어 있는 부분 등 어떤 이유로 주위와 구분해야 하는 부분을 표현하기 위해 사용한다.
- \<em> 태그는 같은 기울임 글꼴로 표현되지만 강조의 의미가 있다.
  - `<strong>`: 강한 강조
  - `<em>`: 약한 강조

```html
<p>시장안은 사람들의 활기로 가득차 있었다.</p>
<p>
  상인 : 이 상품은 현재 <em>30%</em> 할인중입니다! 나 : 아하 그렇군요!
  <i> '흠.. 왜 하필 지금 할인하는걸까?!' </i> 좀 더 구경하고 올게요!
</p>
<p>나는 상인의 의도를 의심할 수 밖에 없었다.</p>
```

### \<dfn>

- 현재 문맥에서 정의하고 있는 용어를 나타낸다. \<dfn>의 가장 가까운 부모가 \<p> 혹은 \<dt>\<dd> 쌍, \<section> 요소일 경우 그 컨텐츠를 dfn의 정의에 대한 설명으로 간주한다. 문서에서 최초로 나타났을 때 사용한다.

```html
<dl>
  <dt>WWW</dt>
  <dd>
    <dfn>WWW</dfn>는 인터넷에 연결된 컴퓨터를 통해 사람들이 정보를 공유할 수
    있는 전 세계적인 정보 공간을 말한다. - 위키백과
  </dd>
</dl>
```

### \<abbr>

- 준말, 약자를 나타내고 싶을 때 사용한다. 보통은 홀로 쓰이고 \<dfn> 태그로 감싸주기도 한다.
- title 속성과 같이 사용하면 tooltip 기능도 제공한다.

```html
<dl>
  <dt>WWW</dt>
  <dd>
    <dfn><abbr title="World Wide Web">WWW</abbr></dfn
    >는 인터넷에 연결된 컴퓨터를 통해 사람들이 정보를 공유할 수 있는 전 세계적인
    정보 공간을 말한다. - 위키백과
  </dd>
</dl>
```

### \<sup>, \<sub>

- \<sup> 태그는 윗첨자, \<sub> 태그는 아랫첨자를 나타낸다. 작은 글자를 표현하는 용도로는 사용하지 않으며 화학기호나 수학공식 등 첨자 기호를 이용해야 하는 곳에서만 사용한다.

```html
<p>H<sub>2</sub>0</p>
<p>x<sup>2</sup>=4</p>
```

### \<span>

- 별다른 의미가 없다. 보통 줄 바꿈 없이 영역을 묶는 용도로 사용한다.
- 여러 요소를 묶어 컨트롤하기 위한 영역으로 id를 주거나 클래스를 사용하기도 한다.
- div와 마찬가지로 최후 수단으로 사용한다.

```html
...중략...
<style>
  #명언 {
    color: red;
  }
</style>
...중략...
<p>
  <span id="명언">제발 그만해.. 이러다 다~~ 죽어!</span>라고 오일남이
  소리쳤습니다.
</p>
```

## Embedded content

### \<img>

- \<img> 태그는 HTML 페이지에 이미지를 삽입할 때 사용하는 태그이다.

#### src(source)

- \<img> 태그는 `scr`라는 필수 속성이 었어야 한다. `src` 속성은 브라우저에게 이미지 파일의 위치 및 파일명을 알려준다. 큰따옴표 안에 들어가는 경로는 절대경로이거나 상대경로이어야 한다.

#### alt (alternative text)

- `alt` 속성은 이미가 보이지 않을 때 `alt` 속성에 적힌 텍스트를 이미지 대신 보여준다. 또한 스크린리더와 같은 접근성을 위한 프로그램에 정보를 제공하기 위한 용도로 사용되며, 브라우저에 이미지에 대한 정보를 전달함으로써 SEO(Search Engine Optimization)에 도움을 주기도 한다.

#### \<img> 차이

```html
<!-- 스크린리더가 읽지 않는다. -->
<img src="a.jpg" alt="" />
<!-- 스크린리더가 "a 이미지" 라고 읽는다. -->
<img src="a.jpg" />
<!-- 스크린리더가 "이미지"를 읽는다. -->
<img src="a.jpg" alt="이미지" />
<!-- 상대경로 : 현재 폴더에 jeju.jpg -->
<img src="./jeju.jpg" alt="이미지" />
<!-- 상대경로 : 상위 폴더 > img폴더 > jeju.jpg -->
<img src="../img/jeju.jpg" alt="이미지" />
<!-- 절대경로 -->
<img src="http://www.paullab.co.kr/images/ceo.png" alt="이미지" />
<img src="C:\Users\paullab\Desktop\FE3\HTML\jeju.jpg" alt="이미지" />
```

### 반응형을 위한 `scrset`

- `srcset` 속성을 사용하면 여러 해상도에 대응하여 브라우저가 최상의 이미지를 로딩하는데 도움을 줄 수 있다.
- `srcset` 속성은 다양한 크기를 가지는 동일 이미지를 최소 2개 이상 사용할 때 사용하며, 브라우저에게 이미지의 선택권을 위힘하는 속성이다.

#### x 서술자, w 서술자, sizes 속성

- x서술자는 `화소의 밀도(pixel density)`를 나타낸다. 디바이스의 화소 밀도에 따른 이미지를 로딩하도록 브라우저에 알려준다.
- Pixel density
  - 동일한 면적에 들어가는 화소의 수를 의미한다. 화소의 갯수가 많을수록 더 높은 해상도의 기기임을 알 수 있다.
  - 여러분이 보고있는 화면의 화소 밀도를 알고 싶다면 브라우저 api를 이용해서 볼 수 있다. 개발자 화면의 콘솔창에 `window.devicePixelRatio` 명령어 입력.

```html
<img
  width="200px"
  srcset="img/logo_1.png 2x, img/logo_2.png 3x"
  src="a.png"
  alt="test"
/>
```

- w 서술자는 원본 이미지의 넓이가 차례대로 300px, 600px, 700px 임을 브라우저에게 알려준다.
  - px이 아닌 w로 표기하는 것에 주의해야 한다.
  - w서술자와 x서술자는 동시에 사용할 수 없다. 또한 `src` 속성을 유지하는 것은 필수이다.
  - `srcset`을 사용할 수 없는 브라우저(Internet Explorer)를 대비해 사용하는 이미지이다.

```html
<img
  width="200px"
  srcset="img/logo_3.png 700w, img/logo_2.png 600w, img/logo_1.png 300w"
  src="a.png"
  alt="test"
/>
```

- `sizes` 속성은 뷰포트의 조건에 따라 이미지가 UI 안에서 차지하게 될 사이즈를 브라우저에 알려준다.

```html
<img
  srcset="img/logo_3.png 700w, img/logo_2.png 600w, img/logo_1.png 300w"
  sizes="(min-width: 960px) 250px,
			 (min-width: 620px) 150px,
			 300px"
  src="a.png"
  alt="test"
/>
```

- 브라우저는 우리가 제공한 이미지의 원본 사이즈와 뷰포트에 따른 이미지의 사이즈 정보를 통합해 가장 적절한 이미지를 로딩하게 된다.
- 물론 `srcset` 속성은 `sizes` 속성이 없다고 해도 잘 동작하겠지만, 웹표준을 준수하기 위해서는 `srcset` 속성을 사용하면 그에 맞는 `sizes` 속성도 반드시 명시되어야 한다.
  - `sizes` 속성을 사용할 때 주의할 점은 CSS를 통한 이미지의 사이즈를 컨트롤하는 방법과 충돌할 수 있다는 점이다. (CSS 스타일이 `sizes` 속성에 우선한다.) 협업할 때는 사전에 반드시 동료들에게 어떠한 방법으로 반응형 이미지를 처리했는지 공유한다.

### \<picture>

- \<picture> 요소는 `<source>` 요소와 `<img>` 요소를 통해 각기 다른 디스플레이 혹은 디바이스에 따라 조건에 맞는 이미지를 보여주는 요소이다. `<img>` 요소의 `srcset` 이 화면에 따른 이미지의 크기를 조절한다면 `<picture>` 요소는 이미지 포맷 자체를 변경할 수 있다.

```html
<picture>
  <!-- window.innerWidth가 960px 이상이면 아래 이미지 업로드 -->
  <source srcset="babies_large.jpeg" media="(min-width:960px)" />

  <!-- window.innerWidth가 620px 이상 960 미만이면 아래 이미지 업로드 -->
  <source srcset="babies.jpeg" media="(min-width:620px)" />

  <!-- window.innerWidth가 960px 미만이면 아래 이미지 업로드 -->
  <img src="babies_small.jpeg" alt="귀여운 아기 팽귄들" />
</picture>
```

#### media 속성

- 위의 코드에서 \<source> 요소 안의 `media` 속성을 볼 수 있다.
- `<picture>` 요소는 `media` 속성의 값을 통해 조건에 알맞는 이미지를 찾게 된다. 조건에 맞는 `<source>` 요소 안의 `srcset` 속성값을 찾아 `<img>` 태그의 `src`에 넣어 화면에 보여주게 된다. 이러한 구조로 작동하기 때문에 `<img>` 요소가 없다면 이미지가 화면에 나타나지 않는다는 점에 주의해야 한다.
- `<picuture>`와 `<source>` 요소 자체는 이미지를 표현하지 않는다.

#### type 속성

- 이미지의 포맷 타입을 브라우저에게 알려준다.

```html
<picture>
  <source srcset="babies.webp" type="image/webp" />
  <source srcset="babies.avif" type="image/avif" />
  <img src="babies.jpeg" alt="귀여운 아기 팽귄들" />
</picture>
```

- 위에서부터 차례대로 브라우저가 지원하는 포맷인지 탐색하며 만약 지원하지 않는 포맷이라고 판단되면 다음 `<source>` 요소로 넘어간다.
- 만약 모든 `<source>` 요소의 이미지 사용이 불가능하면 최후에 `<img>` 요소의 이미지를 렌더링한다.
  - 때문에 WebP나 AVIF와 같은 최신 포맷의 이미지를 지원하고 싶다면 크로스브라우징을 위해 `<picture>` 요소와 함께 사용하는 것이 좋다.
- 이러한 방식의 크로스브라우징 기법을 **점진적 향상기법**이라고 한다.
  - 기본적으로 예전 기술 환경에서 동작할 수 있는 기능을 구현해두고, 최신 기술을 사용할 수 있는 환경에서는 최신 기술을 제공하여 더 나은 사용자 경험을 제공할 수 있는 방법이다.

<details>
  <summary>이미지 포맷의 종류</summary>

  <div>
    <em>GIF(Graphics Interchange Format)</em>
    256
  </div>
</details>

### \<iframe>

- iframe은 현재 HTML 페이지에서 또 다른 HTML 페이지를 보여주고 싶을 때 사용한다. `<iframe>`은 width 또는 height 속성으로 크기를 조절한다.
  - 기본값: height(150px), width(300px)

```html
<iframe
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/c1mzlGjb0gQ?showinfo=0&rel=0&autoplay=1&mute=1&loop=1&controls=0;playlist=c1mzlGjb0gQ"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

- `src` 속성으로 불러올 HTML 링르클 설정할 수 있으며 보통 youtube 영상을 불러올 때 많이 사용한다.
  - ? 뒤에 쿼리스트링으로 autoplay, mute, controls 등의 설정을 추가할 수 있다.
- `frameborder`: 테두리를 그려줄지 결정한다. 0 혹은 1의 값을 가진다. 이제 더는 사용하지 않는 값이며 CSS의 border 속성으로 대체되었다.
- `allow`: iframe 에서 허용할 기능들을 지정한다.
- `allowfullscreen`: 전체화면을 지원한다.
- `autoplay`
  - 브라우저 정책 상 일부 모바일 브라우저에 작동하지 않을 수 있으며, 항상 `mute` 속성과 함께 사용되어야 한다.
  - **이는 모바일 환경에서 autoplay 기능으로 인한 의도하지 않은 트래픽 유발을 방지하고 접근성 측면에서 좋지 않기 때문이다.**
    - `<video>` 같은 경우에 유튜브로 재생되게 해서 link 속성 이용해 트래픽 같은데 방지하는 것이 좋다.
- MITM(중간자공격) 같은데에 사용될 수 있어 `1. 유저 인증`, `2. 유저 접속 지역 설정`, `iframe 같은 태그 지원 방지`하도록 한다.

### /<audio>

- `<audio>`는 음악 컨텐츠를 재생하기 위한 태그이다. src 속성은 브라우저에게 오디오 파일의 위치 및 파일명을 알려준다.

```html
<audio controls>
  <source src="flow.ogg" type="audio/ogg" />
  <source src="flow.mp3" type="audio/mpeg" />
</audio>
```

- `control`: 음악 파일을 제어할 수 있는 컨트롤러를 불러온다.
- `autoplay`: 로딩이 완료된 파일을 자동으로 재생한다.
  - Chrome 정책 상 autoplay가 안된다. 간혹 되는 경우가 있으나 정책상 안되는 것이 맞아 JS로 컨트롤한다.
- `loop`: 음악을 반복한다.
- `<audios>` 요소 역시 `<source>` 요소를 자식으로 사용할 수 있다. 다른 요소와 마찬가지로 크로스 브라우징을 위해 여러 포맷의 파일을 지원할 수 있다.

### /<video>

- 동영상 파일을 재생하기 위한 태그이다.

```html
<video controls poster="batman.jpeg" preload="auto" width="450" height="300">
  <source src="batman.mp4" type="video/mp4" />
  <source src="batman.ogv" type="video/ogg" />
  <source src="batman.webm" type="video/webm" />
  <track kind="subtitles" src="foo.en.vtt" srclang="ko" label="batman" />
</video>
```

- `src`:브라우저에게 비디오 파일의 위치 및 파일명을 알려준다.
- `controls`: 영상 파일을 재생하는데 필요한 컨트롤러를 불러온다.
- `autoplay`: 로딩이 완료되면 자동으로 영상 파일을 재생시킨다.
- `loop`: 영상이 종료되면 다시 반복해서 재생한다.
- 아래는 크로스브라우징과 사용자 친화적인 비디오 구현을 위한 속성
- `preload`: 좋은 사용자 경험을 위해 고려해 볼 수 있는 속성(기본값 브라우저마다 다름)
  - **none**: 비디오 파일을 미리 로딩하지 않는다. 서버가 최소한의 트래픽을 유지하며 페이지 로딩이 좀 더 빨라진다.
  - **metadata**: 비디오 파일을 미리 로딩하지 않지만 파일의 메타데이터(영상 길이 같은)를 미리 가져오도록 한다.
  - **auto**: 비디오 파일ㅇㄹ 미리 로딩하여 사용자가 바로 영상을 볼 수 있도록 지정한다.
- `poster`: 영상이 로딩 중일 때 대신해서 화면에 보여줄 이미지를 지정한다.
- `<source>`: 다른 embedded 요소들과 마찬가지로 source 요소를 통해 브라우저가 지원하는 파일 포맷을 여러 가지 지정할 수 있다.
- `<track>`: `<audio>` 혹은 `<video>` 요소의 자식으로 자막과 같은 시간 기반 텍스트 데이터(텍스트 트랙)을 보여주고자 할 때 사용한다.
  - **kind**: subtitles(자막), captions(설명) 등 텍스트 트랙의 종류를 지정
  - **srclang**: 텍스트 트랙의 언어를 지정
  - **label**: 텍스트 트랙의 제목을 지정
  - **WebVTT**(Web Video Text Tracks): \<track> 요소에서 사용할 자막 파일 포맷으로 .vtt로 표시
    - [자막 작성법 참고](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)

## Forms

### \<Form> 기본 속성

- 폼은 정보를 입력하는 영역
  - 로그인 화면에서 아이디와 비밀번호를 입력, 회원 가입할 때 정보를 입력하는 양식 등에 모두 폼을 이용한다.
- 폼에 입력을 하고 제출(submit)하게 되면 데이터는 서버로 전송되고, 전송한 데이터는 웹 서버가 처리하며, 처리 후 로그인 결과 화면 같은 다른 웹 페이지를 클라이언트에 전송한다.

#### 폼 동작 방식

1. 웹 페이지에 있는 form에 데이터를 입력한다.
2. 웹 페이지 내 액션이 일어나게 되면 데이터는 웹 서버로 이동하게 된다.
3. 웹 서버는 데이터를 처리하기 위해 APP을 호출한다. 이때 APP은 물리적으로 별도의 서버일 수 있다.
4. 필요에 따라 APP은 DB로 데이터를 전송한다. 이때 DB는 물리적으로 별도의 서버일 수 있다.
5. DB에서 CRUD 작업이 일어나고 작업 결과를 APP으로, WEB으로 전송한다.
6. 웹 서버는 받은 결과를 Client 브라우저에게 보낸다.
7. 사용자 브라우저는 Response 받은 페이지를 렌더링하여 사용자에게 보여준다.

- CRUD

  | 이름   | 조작 | SQL    | method |
  | ------ | ---- | ------ | ------ |
  | Create | 생성 | INSERT | POST   |
  | Read   | 읽기 | SELECT | GET    |
  | Update | 갱신 | UPDATE | PUT    |
  | Delete | 삭제 | DELETE | DELETE |

#### 폼(form)의 속성

- action

  - **입력값을 전송할 페이지를 나타낸다.**

- method
  - **폼의 데이터를 전송할 방법을 정의한다.**
  - method의 속성에는 `get`과 `post`가 있다.
    - `get`은 웹 서버에 데이터를 요청할 때 사용하며, 주소에 데이터를 입력하는 방식
      - URL로 데이터를 전달할 때 사용(file같은 큰 파일은 GET으로 전송X, id와 pw와 같은 민감 데이터X)
      - 남들에게 공유해야 하는 게시글 같은 경우에는 post로는 쿼리스트링이 남지 않아 get 방식으로 해야한다.
    - `post`는 파일을 올리거나, 보안이 필요한 데이터를 전송할 때 등 사용된다.
      - 패킷 안에 데이터를 넣어 전달할 때 사용한다.(민감 데이터 O, 큰 데이터 O)
      - 또 한, 주소에 입력 내용이 나타나지 않도록 한다.
  - [form에서 put, delete를 지원하지 않는 이유](https://c3epmos.tistory.com/61)
  - [PUT, PATCH, DELETE 미지원 처리](https://velog.io/@ette9844/REST-PUT-PATCH-DELETE-%EB%AF%B8%EC%A7%80%EC%9B%90-%EC%B2%98%EB%A6%AC)

## \<input>

- `<input>`은 사용자가 다양하게 폼 태그에 입력할 수 있는 공간을 만들어 주고, 사용자에게 정보를 입력 받는다.

### \<input>의 속성

| 이름        | 설명                                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| type        | 태그 모양을 다양하게 변경할 수 있다. Type에는 text, radio, checkbox, password, button 등을 지정 가능 |
| name        | 태그 이름을 지정                                                                                     |
| readonly    | 태그를 읽기 전용으로 함                                                                              |
| maxlength   | 최대 글자 수를 지정                                                                                  |
| minlength   | 최소 글자 수를 지정                                                                                  |
| required    | 필수 태그로 지정. 입력안하고 submit 버튼을 누르면 에러가 떠 데이터가 전송되지 않음                   |
| autofocus   | 웹 페이지가 로딩되면 이 속성을 지정한 태그로 포커스가 바뀜                                           |
| placeholder | 입력할 값에 대한 힌트를 줌                                                                           |
| pattern     | 정규표현식을 사용하여 특정 범위 내의 유효한 값을 입력 받을 때 사용                                   |

### \<input> 타입

- `text`: 입력한 text를 그대로 표현해주는 input
- `button`: 누를 수 있는 간단한 버튼을 만드는 input
- `password`: 마스크 처리된 text input
- `search`: 검색 창으로 사용할 수 있는 input
- `date`: 날짜를 입력할 때 사용할 수 있는 input
- `time`: 시간을 입력할 때 사용할 수 있는 input
- `range`: 슬라이드 바 형식의 input
- `number`: 수를 선택할 수 있게 하는 input
- `color`: 색을 선택할 수 있는 input
- `radio`: 선택 항목 중 하나만 선택 가능한 input/
- `checkbox`: 선택 항목 중 0개 이상 선택 가능한 input
- `file`: 파일을 업로드할 수 있는 input
- `email`: 이메일 주소를 입력하게 하는 input
- `url`: 웹페이지 주소를 입력하게 하는 input
- `tel`: 전화번호를 입력하게 하는 input
- `hidden`
  - form에 제출되는 data를 javascript로 수정하는 일을 가능하면 하지 않는다. (input으로 해결 가능!)
  - form에 없는 데이터를 추가하고 싶다면 hidden으로 input 하나 더 만들어 value를 javascript로 추가하는 방식을 사용한다.

### \<label>

- 단순히 `<input>` 태그를 설명하는 텍스트를 옆에 붙여 무엇을 입력해야 하는지 설명할 수 있겠지만, 시각 장애인들도 폼을 사용할 수 있도록 시멘틱한 `<label>` 요소를 사용해야 한다.

#### `<label>`의 사용법

- 텍스트의 설명과 폼 입력 모두를 포함하는 방식

  ```html
  <label>
    이름 :
    <input type="text" name="name" />
  </label>
  ```

- 폼 입력에서 분리하여 `for` 속성을 이용해 레이블을 지정하는 방식

```html
<label for="myName">이름 : </label>
<input type="text" name="name" id="myName" />
```

#### `for` 속성

- `for` 속성은 레이블이 속한 `input`과 같은 폼 컨트롤(`input`, `select`, `textarea`와 같은 요소들)을 의미한다.
- 위의 예시처럼 `for` 속성의 값은 해당 레이블이 속할 폼 컨트롤의 `id`값과 일치해야 한다.
- 레이블과 폼 컨트롤이 연결되면 레이블을 선택해도 해당하는 폼 컨트롤이 선택된 것과 같이 동작한다.
  - 이러한 점 때문에 사용자는 클릭할 수 있는 영역이 넓어져 폼을 쉽게 사용할 수 있게 된다.

### \<select>

- \<select> 요소는 드롭다운 리스트 박스를 생성한다. 이때 사용자가 선택해야 하는 리스트 박스 안의 아이템을 만들 때에는 `<option>` 태그를 사용한다.

```html
<form action="">
  <label for="myDevice"
    >현재 사용하고 있는 스마트폰의 제조사를 선택해주세요</label
  >
  <select name="device" id="myDevice">
    <option value="iphone">아이폰</option>
    <option value="galaxy">갤럭시폰</option>
    <option value="ㅜㅜ">LG폰</option>
  </select>
</form>
```

#### \<select>의 속성들

1. multiple="multiple": `multiple` 속성을 사용하면 여러개의 `option` 요소를 선택할 수 있게 된다. 단, 단순 클릭으로는 선택되지 않으며 windows에서는 `crtl`, OSX에서는 `command` 버튼을 누르고 클릭해야 여러 개를 선택할 수 있다.
2. size: `size` 속성을 통해 드롭다운 리스트에서 한 번에 보여줄 수 있는 `option`의 갯수를 조절할 수 있다.

#### \<option>의 속성들

1. value: `<option>` 요소는 `value` 속성을 사용하여 선택값에 따라 서버에 어떠한 값을 전송할지 설정할 수 있다.
2. selected: `selected` 속성은 페이지가 로딩되고 난 뒤 기본으로 선택되는 옵션을 나타내는데 사용한다. `selected` 옵션을 사용하지 않으면 첫번째 `<option>` 이 페이지 로드 시 선택되고, 아무것도 선택하지 않고 데이터를 서버로 전송하면 첫 번째 `<option>` 값의 `value`가 전송된다.

### \<fieldset>

`fieldset` 요소를 사용하면 그 자식 요소로 사용되는 폼 컨트롤들을 그룹화할 수 있다. 특히 폼 내용이 방대하여 섹션별로 나눌 필요성이 있을 경우 유용하게 상요된다. 브라우저가 기본적으로 구현하는 스타일을 보면 그 의미가 더 명확하다.

```html
<!-- 브라우저에서 어떻게 표현되는지 확인해보세요 -->
<form action="">
  <fieldset>
    <legend>개인정보</legend>
    <label for="myName">이름</label>
    <input type="text" name="name" id="myName" />
    <label for="myTel">전화번호</label>
    <input type="tel" name="tel" id="myTel" />
    <label for="myEmail">이메일</label>
    <input type="email" name="email" id="myEmail" />
  </fieldset>
  <fieldset>
    <legend>개인정보 제공 동의</legend>
    <label for="checkAgree">개인정보 제공에 동의하십니까?</label>
    <input type="checkbox" name="agree" id="checkAgree" />
  </fieldset>
</form>
```

### \<legend>

`<legend>` 요소는 `<fieldset>` 태그 바로 뒤에 위치하며 폼 그룹의 목적을 나타내는 제목을 의미한다. 반드시 `<fieldset>`의 첫 번째 자식으로 사용해야 한다.

### \<button>

type은 버튼의 행동 방식을 설정하는 속성이다.

- `submit`: 버튼이 서버로 양식 데이터를 제출한다. 지정하지 않은 경우 기본값이며, 유효하지 않은 값일 때도 사용한다. 때문에 form 양식을 제출하기 위한 용도가 아니라면 반드시 type을 선언해줘야 한다.
- `reset`: `<input type="reset">`처럼, form의 모든 값을 초기화시킨다.
- `button`: 클릭 가능한 버튼이다. 사용자가 기능을 부여하기 전까지는 별 다른 작동을 하지 않는다.

```html
<!-- 네이버 메인 화면의 검색 버튼 html 구조 -->
<button id="search_btn" type="submit" title="검색">
  <span class="blind">검색</span>
  <span class="ico_search_submit"></span>
</button>
```

#### Input vs button 무엇을 써야할까?

`<button>` 요소는 `<input>` 요소보다 스타일을 적용하기 훨씬 수월하다. `<input>`은 닫는 태그가 없기 때문에 `value` 특성에 텍스트 값 밖에 지정할 수 없지만, `<button>`은 내부에 여러가지 자식 컨텐츠를 추가할 수 있고 여기 더해 `::after`와 `::before`와 같은 가상 요소를 사용하는 것도 가능하다. 더 다채롭고 멋진 스타일을 적용해야 한다면 `<button>` 요소를 우선적으로 고려해 보는 것이 좋다.

- 띠리사 버텅 `<button>`쓰는 경우가 많다.

### \<textarea>

여러 줄의 text를 입력받을 수 있다.

#### `<textarea>`의 주요 속성

1. cols: textarea가 보여줄 입력창의 넓이이다. 문자의 평균적인 넓이를 기준으로 한다. 양수 값만 사용할 수 있으며 기본값은 20이다.
2. rows: textarea 입력 창이 기본적으로 보여줄 입력 줄 수를 의미한다.

```html
<textarea
  name=""
  id=""
  cols="40"
  rows="10"
  maxlength="10"
  minlength="5"
></textarea>
```

### \<datalist>

- `<datalist>`는 `<select>`와 `<input>`을 섞어서 사용할 수 있도록 한다. `<input>`의 `list` 속성을 이용해 `<datalist>` 요소의 `id` 속성과 연결하여 사용한다.
- 사용자에게 기본적으로 선택할 수 있는 옵션을 제공함과 동시에, 만약 옵션에 선택하고 싶은 값이 없는 경우 사용자가 원하는 임의의 값을 입력 받을 수 있도록 편의성을 제공한다.

```js
<label for="solasystem">원하는 행성을 선택하세요 : </label>
<input type="text" id="solasystem" list="planets" name="planets">
<datalist id="planets">
    <option value="수성">수성</option>
    <option value="금성">금성</option>
    <option value="지구">지구</option>
    <option value="화성">화성</option>
</datalist>
```

## Tabular data

### \<table>

- `<table>` 태그는 테이블을 생성할 때 사용. 하나의 테이블을 정의한다.
- `<table>` 태그는 컨테이너 요소로서 그 내부에는 제목(caption)과 행(tr), 열(col) 그리고 셀(td)과 셀의 제목(th) 역할을 하는 여러 요소들이 자식으로 사용된다.

### \<caption>

`<caption>`은 테이블의 제목이나 설명을 의미한다. `<table>` 요소의 첫 번재 자식으로 사용해야 한다.

### \<thead>, \<tbody>, \<tfoot>

`<thead>`, `<tbody>`, `<tfoot>`태그는 각각 머리글, 본문, 바닥 글을 의미한다. 테이블의 내용이 많을 때 `<thead>`와 `<tbody>`는 머리글과 바닥 글, 본문으로 테이블의 구역을 나누는 요소로 사용한다. 이 요소들은 테이블의 레이아웃에 영향을 미치지 않는다. 하지만 CSS를 사용하여 디자인의 스타일을 지정할 수 있다.

### \<tr>, \<th>, \<td>

`<tr>`태그는 테이블의 행을 나눌 때 사용한다. `<td>` 태그는 `<tr>` 태그로 나눈 행에서 셀을 분리할 때 사용한다. HTML 요소의 모든 종류(텍스트, 이미지, 목록, 테이블 등)를 포함할 수 있다. `<th>` 태그는 행, 열의 머리말을 나타내는데 사용한다. 글씨를 굵게, 가운데 정렬하여 보여준다.

### colspan, rowspan 속성

`<td>` 또는 `<th>` 태그 요소에 `colspan` 속성을 사용하면 열간 병합을 할 수 있다. 즉, 열과 열을 병합하기 때문에 가로 방향으로 셀들을 병합할 수 있다. 또한 `rowspan` 속성을 사용하면 행간 병합이 가능하다. 즉, 행과 행을 병합하기 때문에 세로 방향으로 셀들을 병합할 수 있다. 이때 병합하고 싶은 셀의 개수를 지정해 준다.

```html
<table>
  <caption>
    이달의 책 판매량
  </caption>
  <tr>
    <th>구분</th>
    <th colspan="2">이름</th>
    <!-- <th>판매량</th> -->
  </tr>
  <tr>
    <td>1</td>
    <td>해리포터</td>
    <td rowspan="2">100</td>
  </tr>
  <tr>
    <td>1</td>
    <td>해리포터2</td>
    <!-- <td>100</td> -->
  </tr>
</table>
```

### \<colgroup>, \<col>

`<colgroup>`과 그 자식 요소로 쓰이는 `<col>` 요소를 통해 한 열에 공통적인 스타일을 주는 것도 가능하다. `<colgroup>` 안의 `<col>` 요소는 각각 테이블의 '열'을 의미한다.

### scope

`<th>` 요소에 `scope` 속성을 사용해 `<td>`와의 연결 관계를 설정할 수 있다.

- row: 행 방향 진행이다. 내용의 흐름이 왼쪽에서 오른쪽으로 연결되어 있음을 알 수 있다.
- col: 열 방향 진행이다. 내용의 흐름이 위에서 아래로 연결되어 있음을 알 수 있다.

```html
<!-- 직접 구현하여 결과를 확인해 보세요 -->
<table>
  <caption>
    요일별 급식 만족도
  </caption>
  <tbody>
    <tr>
      <th></th>
      <th scope="col">월요일</th>
      <th scope="col">화요일</th>
      <th scope="col">수요일</th>
      <th scope="col">목요일</th>
      <th scope="col">금요일</th>
      <th scope="col">토요일</th>
    </tr>
    <tr>
      <th scope="row">메뉴</th>
      <td>돈까스</td>
      <td>짜장면</td>
      <td>볶음밥</td>
      <td>해물라면</td>
      <td>잔치국수</td>
      <td>떡볶이</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">만족도</th>
      <td>3/5</td>
      <td>4/5</td>
      <td>1/5</td>
      <td>5/5</td>
      <td>2/5</td>
      <td>3/5</td>
    </tr>
  </tfoot>
</table>
```

#### scope, colgroup에 대한 보강 설명

- [\<colgroup> MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/colgroup)
- [scope&\<colgroup> MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/table#%ED%96%89%EA%B3%BC_%EC%97%B4_%EB%B2%94%EC%9C%84_%EC%A7%80%EC%A0%95)
