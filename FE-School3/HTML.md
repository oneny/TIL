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
