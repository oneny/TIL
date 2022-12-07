# HTML CheatSheet

## 목차

### Tag CheatSheet

- [The document element](#the-document-element)
  - [html](#html)
- [Document metadata](#document-metadata)
  - [head](#head)
  - [title](#title)
  - [meta](#meta)
  - [link](#link)
  - [style](#style)
- [Sections](#sections)
  - [body](#body)
  - [article](#article)
  - [section](#section)
  - [nav](#nav)
  - [aside](#aside)
  - [h1, h2, h3, h4, h5, h6](#h1-h2-h3-h4-h5-h6)
  - [hgroup](#hgroup)
  - [header](#header)
  - [footer](#footer)
  - [address](#address)
- [Grouping content](#grouping-content)
  - [p](#p)
  - [blockquote](#blockquote)
  - [ol](#ol)
  - [ul](#ul)
  - [li](#li)
  - [dl](#dl)
  - [dt](#dt)
  - [dd](#dd)
  - [figure](#figure)
  - [figcaption](#figcaption)
  - [main](#main)
  - [div](#div)
- [Text-level semantics](#text-level-semantics)
  - [a](#a)
  - [em](#em)
  - [strong](#strong)
  - [cite](#cite)
  - [q](#q)
  - [dfn](#dfn)
  - [abbr](#abbr)
  - [span](#span)
  - [br](#br)
  - [wbr](#wbr)
- [Embedded content](#embedded-content)
  - [img](#img)
  - [picture](#picture)
  - [source](#source)
  - [iframe](#iframe)
  - [video](#video)
  - [audio](#audio)
  - [track](#track)
  - [table](#table)
  - [caption](#caption)
  - [colgroup](#colgroup)
  - [col](#col)
  - [tbody](#tbody)
  - [thead](#tehad)
  - [tfoot](#tfoot)
  - [tr](#tr)
  - [td](#td)
  - [th](#th)
- [Forms](#forms)
  - [form](#form)
  - [fieldset](#fieldset)
  - [legend](#legend)
  - [label](#label)
  - [input](#input)
  - [button](#button)
  - [textarea](#textarea)
  - [select](#select)
  - [option](#option)
  - [details](#details)
  - [summary](#summary)
  - [dialog](#dialog)

### Form Validation

- [Form Validation](#form-validation-1)

## Tag CheatSheet

### The document element

#### html

- HTML 문서를 만들때 사용

### Document metadata

#### head

- 제목이나 표시되지 않는 정보를 설정

#### title

- 제목 표시줄에 들어가는 내용을 설정

#### meta

- 웹 서버와 웹 브라우저 간에 상호 교환되는 정보를 정의하는데 사용
  - 속성에는 `http-equiv`, `name`, `content` 3가지 속성이 있음

#### link

- 해당 문서와 외부 소스(external resource) 사이의 관계를 정의할 때 사용

#### style

- 해당 HTML 문서의 스타일 정보를 정의할 때 사용

### Sections

#### body

* 문서의 보이는 부분을 설정

#### article

* 해당 문서나 페이지 또는 사이트와는 완전히 독립적으로 구성할 수 있는 요소를 정의할 때 사용

#### section

* HTML 문서에 포함된 독립적인 섹션(section)을 정의할 때 사용

#### nav

* 다른 페이지 또는 현재 페이지의 다른 부분과 연결되는 네비게이션 링크(navigation links)들의 집합을 정의할 때 사용

#### aside

* 페이지의 다른 콘텐츠들과 약간의 연관성을 가지고 있지만, 해당 콘텐츠들로부터 분리시킬 수 있는 콘텐츠로 구성된 페이지 영역을 정의할 때 사용

#### h1, h2, h3, h4, h5, h6

* 제목 텍스트 설정, 숫자가 작아질수록 크기가 커짐

#### hgroup

* 부제목과 함꼐 다중레벨의 제목을 기본 제목으로 분류

#### header

* 특정한 컨텐츠의 시작 부분을 나타내는 요소
  * 일반적으로 구역의 제목을 포함

#### footer

* footer는 문서나 특정 섹션의 푸터를 정의할 때 사용
* 보통 아래와 같은 정보를 포함한다.
  * 저자(author) 정보, 저작권 정보, 연락처, 사이트맵(sitemap), 페이지 맨 위로 되돌아갈 수 있는 Top 버튼, 연관 페이지 등

#### address

* 문서나 글의 저자 또는 회사와 연락할 수 있는 정보를 명시할 때 사용

### Grouping content

#### p

* 새 단락을 만들 때 사용

#### blockquote

* 들여쓰기를 통해서 인용문을 만들 때 사용

#### ol

* 순서가 있는 리스트를 만들 때 사용

#### ul

* 순서가 없는 리스트를 만들 때 사용

#### li

* 각 리스트의 항목들을 포함

#### dl

* 정의 목록들을 만들 때 사용

#### dt

* 정의되는 용어의 제목을 만들 때 사용

#### dd

* 정의되는 용어의 설명을 만들 때 사용

#### figure

* 삽화나 다이어그램, 사진 등과 같은 문서의 주요 흐름과는 독립적인 콘텐츠를 정의할 때 사용

#### figcaption

* figure 요소의 캡션(caption)을 정의할 때 사용

#### main

* 해당 문서의 body 요소의 주 콘텐츠(main content)를 정의할 때 사용

#### div

* HTML 문서에서 특정 영역(division)이나 구획(section)을 정의할 때 사용

### Text-level semantics

#### a

* 링크를 연결할 때 사용

#### em

* 강조된 텍스트(emphasized text)를 표현할 때 사용
  * strong 요소와 중첩해서 중요성이나 강조의 상대적인 정도를 증가시킬 수도 있음

#### strong

* 해당 콘텐츠의 중요성이나 심각함, 긴급함을 강조할 때 사용
* strong 요소는 콘텐츠 자체의 중요성을 강조할 때 사용되는 반면, b 요소는 콘텐츠의 중요성보다는 텍스트 자체에 주의를 끌기 위해 사용된다.

#### cite

* 책이나 음악, 영화, 예술 작품 등과 같은 창작물의 제목을 정의할 때 사용

#### q

* 짧은 인용구(short quotation)를 정의할 때 사용

#### dfn

* HTML에서 용어(term)의 정의를 나타낼 때 사용

#### abbr

* 단어의 축약형(abbreviation)이나 머리글자로만 된 단어(acronym)를 정의할 때 사용

#### span

* HTML 문서에서 인라인 요소(inline-element)들을 하나로 묶을 때 사용

#### br

* 텍스트 내의 줄바꿈(line-break)을 정의할 때 사용

#### wbr

* 단어 중간에서 행바꿈될 수 있는(line-break) 위치를 정의할 때 사용

### Embedded content

#### img

* HTML 문서에서 이미지(image)를 정의할 때 사용

#### picture

* img 요소의 다중 이미지 리소스(multiple image resources)를 위한 컨테이너를 정의할 때 사용

#### source

* audio 요소나 video 요소, picture 요소에서 사용할 수 있는 다중 미디어 자원을 지원할 때 사용

#### iframe

* 인라인 프레임을 정의할 때 사용
  * 인라인 프레임은 현재 HTML 문서에 다른 문서를 포함시킬 때 사용

#### video

* 무비 클립이나 비디오 스트림과 같은 비디오를 정의할 때 사용

#### audio

* 음악이나 오디오 스트림과 같은 사운드를 정의할 때 사용

#### track

* audio나 video 요소와 같은 미디어 요소를 위한 텍스트 트랙을 정의할 때 사용

#### table

* 데이터를 포함하는 셀(cell)들과 행과 열로 구성된 2차원 테이블을 정의할 때 사용

#### caption

* 테이블의 캡션을 정의할 때 사용

#### colgroup

* 테이블에서 서식 지정을 위해 하나 이상의 열을 그룹으로 묶을 때 사용

#### col

* colgroup 요소에 속하는 각 열(column)의 속성을 정의할 때 사용

#### tbody

* HTML 테이블에서 내용 콘텐츠(body content)들을 하나의 그룹으로 묶을 때 사용

#### thead

* HTML 테이블에서 헤더 콘텐츠(header content)들을 하나의 그룹으로 묶을 때 사용

#### tfoot

* HTML 테이블에서 푸터 콘텐츠(footer content)들을 하나의 그룹으로 묶을 때 사용

#### tr

* 테이블에서 셀들로 이루어진 하나의 행(row)을 정의할 때 사용

#### td

* HTML 테이블에서 하나의 데이터 셀(data cell)을 정의할 때 사용

#### th

* HTML 테이블에서 제목이 되는 헤더 셀(header cell)을 정의할 때 사용

### Forms

#### form

* 사용자로부터 입력을 받을 수 있는 HTML 입력 폼(form)을 정의할 때 사용

#### fieldset

* form 요소에서 연관된 요소들을 하나의 그룹으로 묶을 때 사용

#### legend

* fieldset 요소의 캡션(caption)을 정의할 때 사용

#### label

* 사용자 인터페이스(UI) 요소의 라벨(label)을 정의할 때 사용

#### input

* 사용자로부터 입력을 받을 수 있는 입력 필드(input field)를 정의할 때 사용

#### button

* 클릭할 수 있는 버튼을 정의할 때 사용

#### textarea

* 사용자가 여러 줄의 텍스트를 입력할 수 있는 텍스트 입력 영역을 정의할 때 사용

#### select

* 옵션 메뉴를 제공하는 드롭다운 리스트(drop-down list)를 정의할 때 사용

#### option

* 옵션 메뉴를 제공하는 드롭다운 리스트(drop-down list)에서 사용되는 하나의 옵션을 정의할 때 사용

#### details

* 사용자가 직접 조작하여 보거나 숨길 수 있는 부가적인 세부사항(additional details)을 명시할 때 사용

#### summary

* details 요소에 의해 생성되는 대화형 위젯에서 기본적으로 보이는 제목을 정의할 때 사용

#### dialog

* 대화 상자(dialog box)나 대화 윈도우(dialog window)를 정의할 때 사용

## Form Validation

```html
<body>
  <form action="">
    <label for="txt">입력 : </label>
    <input type="email" id="txt" />
    <button>제출</button>
  </form>

  <script>
    const inp = document.querySelector('input');

    inp.addEventListener('input', () => {
      if (inp.validity.typeMismatch) {
        inp.setCustomValidity('알맞은 양식의 이메일 주소를 입력하세요');
      } else {
        inp.setCustomValidity('');
      }
    });
  </script>
</body>
```

```
inp.validity 콘솔로그에 출력하면 다음과 같은 객체를 얻을 수 있다.
ValidityState {
  badInput: false,  // 잘못된 입력
  customError: false, // 커스텀 오류
  patternMismatch: false, // 패턴 오류
  rangeOverflow: false, // 범위 초과 오류
  rangeUnderflow: false, // 범위 미달 오류
  stepMismatch: false, // 간격 오류
  tooLong: false, // 길이 오류
  tooShort: false, // 길이 오류
  typeMismatch: false, // 타입 오류
  valid: false, // 검증 결과
  valueMissing: true // 필수값 오류
}
```
