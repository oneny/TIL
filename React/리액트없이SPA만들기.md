# 라이브러리 도움없이 SPA 만들기

## 01. 페이지 하나 만들기

> 출처: [(리뉴얼)JavaScript 3부 SPA](https://www.youtube.com/watch?v=YMih35bOSI4&t=1s)

```javascript
<body>
  <div id="root"></div>
</body>
```

div 태그 안에 코드를 작서하는 것이 아니라 script를 작성해 script를 통해 div 태그를 컨트롤해서 페이지를 만들어야 한다.

```javascript
<body>
  <div id="root"></div>
  <script>
    const root = document.getElementById("root");

    async function getProductData() {
      const response = await fetch("http://test.api.weniv.co.kr/mall");
      const product = await response.json();
      return product; // json 형태의 값을 반환
    }

    getProductData().then((product) => {
      const mainElement = document.createElement("main");
      mainElement.classList.add("product");

      // 1 (쉽게 이해하기 위한 코드)
      mainElement.innerHTML = `
          <h1 class="ir">상품목록 페이지</h1>
          <ul class="product-list"></ul>
      `;

      const productList = mainElement.querySelector(".product-list");
      product.forEach((item) => {
        const productDetailLink = document.createElement("a");
        // SPA가 Single Page이므로 다른페이지로 이동하지 않고 링크로 이동하는 이벤트를 막고 들어온 url을 파싱해서 그 페이지를 재로드해야 하는 작업을 해야 한다.
        productDetailLink.href = `/detail/${item.id}`;
        productDetailLink.innerHTML = `
          <li class="product-item">
              <div class="product-img">
                  <img src="http://test.api.weniv.co.kr/${item.thumbnailImg}">
              </div>
              <strong class="product-name sl-ellipsis">${item.productName}</strong>
              <button class="like-btn"></button>
              <div class="product-price">
                  <strong class="price m-price">${item.price}<span>원</span></strong>
              </div
          </li>
        `;

        productList.append(productDetailLink);
      });

      const cart = document.createElement("a");
      cart.setAttribute("class", "link-btn cart-link");
      mainElement.append(cart);

      // console.log(mainElement);

      // 2 (실무에서 작성하는 코드)
      // 위 코드는 querySelector로 요소들을 다시 선택해야 하므로 아래 코드가 일관성이나 모듈화해서 재사용하기 좋다.
      // const productPageHeader = document.createElement("h1");
      // productPageHeader.classList.add("ir"); // = productPageHeader.setAttribute("class", "ir");
      // productPageHeader.innerText = "상품목록";
      // mainElement.appendChild(productPageHeader);

      // const productList = document.createElement("ul");
      // productList.setAttribute("class", "product-list");
      // mainElement.appendChild(productList);

      // const productItem = document.createElement("li");

      // const productCard = document.createElement("a");
      // productCard.setAttribute("href", `/detail/${item.id}`);
      // productCard.setAttribute("class", "product-item");

      // const productImageContainer = document.createElement("div");
      // productImageContainer.setAttribute("class", "product-img");

      // const productImage = document.createElement("img");
      // productImage.setAttribute("src", `http://test.api.weniv.co.kr/${this.item.thumbnailImg}`);
      // productImage.setAttribute("alt", `상품이미지`);
      // productImageContainer.appendChild(productImage);

      // const productName = document.createElement("strong");
      // productName.setAttribute("class", "product-name");
      // productName.innerText = this.item.productName;

      // const productPriceContainer = document.createElement("div");
      // productPriceContainer.setAttribute("class", "product-price");

      // const productPrice = document.createElement("strong");
      // productPrice.setAttribute("class", "price m-price");
      // productPrice.innerText = this.item.price;

      // const priceType = document.createElement("span");
      // priceType.innerText = "원";

      // productPrice.appendChild(priceType);

      // productPriceContainer.appendChild(productPrice);

      // productCard.appendChild(productImageContainer);
      // productCard.appendChild(productName);
      // productCard.appendChild(productPriceContainer);

      // productItem.appendChild(productCard);

      root.append(mainElement);
    });
  </script>
</body>
```

- innerHTML을 사용하는 것 보다는 모듈화해서 재사용성이 좋은 2번 코드가 좋다.

## 02. history를 사용하여 SPA 구현하기

> 출처: [Build a Single Page Application with JavaScript (No Frameworks)](https://www.youtube.com/watch?v=6BozpmSjk-Y&t=1009s)

- 서버에 ajax나 fetch 요청으로 자바스크립트 사용해서 동적으로 페이지를 로드

### SPA 폴더구조

```
- SPA
  - fronted
    - index.html
    - static
      - css
        - index.css
      - js
        - index.js
        - views
          - Dashboard.js
          - Posts.js
          - Settings.js
  - server.js
  - node_modules
  - package-lock.json
  - package.json
```

### index.html 만들기

프로젝트 폴더에 `frontend` 폴더를 만들고 화면에 보여질 `index.html` 파일을 만든다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Single Page App</title>
    <link rel="stylesheet" href="/static/css/index.css" />
  </head>
  <body>
    <nav class="nav">
      <a href="/" class="nav__link" data-link>Dashboard</a>
      <a href="/posts" class="nav__link" data-link>Posts</a>
      <a href="/settings" class="nav__link" data-link>Settings</a>
    </nav>
    <div id="root"></div>
    <script type="module" src="/static/js/index.js"></script>
  </body>
</html>
```

- 페이지 이동을 하기 위해 3개의 a 태그로 구성된 메뉴를 `nav`로 감싸주고,
- ES6의 module을 사용하기 위해서 `sciprt` 태그에 `type="module"`을 추가했다.
- id가 root인 div 태그가 client-side를 한다.

### express 서버 구축하기

express를 사용하여 간단하게 서버를 구축한다.

```javascript
// server.js
const express = require("express");
const path = require("path");

const app = express();

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
```

#### app.get으로 응답

```javascript
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
});
```

- 어느 경로든 요청이 들어와도 index.html을 사용자에게 sendFile한다.
  - 이 부분이 Single Page Application을 만드는 요점이다.

#### express에서 정적 파일 제공

express의 미들웨어 함수인 `express.static`을 사용하여 정적 파일을 제공한다

```javascript
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);
```

- frontend나 client-side의 entry-point(진입점)가 된다.

### Router 구현하기

위 폴더 구조처럼 `index.js`를 만들고 `Home`, `Posts`, `Settings` 페이지 이동할 수 있는 라우터 구현하기

```javascript
const router = async () => {
  // 서버에 비동기 요청
  const routes = [
    { path: "/", view: () => console.log("Viewing Dashboard") },
    { path: "/posts", view: () => console.log("Viewing Posts") },
    { path: "/settings", view: () => console.log("Viewing Settings") },
  ];

  // Test each route for potential match
  const potentialMathches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname, // location.pathname으로 브라우저 url에 접근
    };
  });

  // isMatch가 true인 것 반환하여 match 할당
  let match = potentialMathches.find(
    (potentialMathch) => potentialMathch.isMatch
  );

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  console.log(match.route.view());
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }
  });
});
```

- `view`는 해당 경로에서 나타내는 html을 의미하는데 작동 잘하는지 콘솔로 먼저 확인

#### router 함수 구현

- location.pathname으로 브라우저의 url에 접근하여 route와 일치하는지 판별 후 새로운 배열 반환
- match 변수는 isMatch가 true인 것을 찾아 해당 인덱스의 값 반환
  - 만약 없다면, undefined으로 Dashboard가 isMatch: true되도록 작성

#### 이벤트 리스너 구현

```javascript
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }
  });
});
```

> History.pushState() - MDN  
> 세 번째 파라미터는 브라우저가 pushState() 호출 이후에 주어진 URL로 탐색하지 않는다.

- 페이지가 업로드됐을 때, 각각의 페이지들을 클릭할 때 마다 router() 함수를 실행시켜 해당 페이지에 대한 정보를 렌더링하는 것이다.
  - HTML이 모두 로드됐을 때 페이지를 보여주기 위한 이벤트 `DOMCOntentLoaded`를 사용
- `click` 이벤트를 등록하고 `a`태그의 `data-link` 라는 속성이 있는 곳에서만 동작하도록 서렂
- `history.pushState`를 사용해서 url을 변경할 수 있게 만들어준다.
  - `a`태그로 페이지를 이동해도 새로고침이 아닌 바로 console.log(match.route.view())가 실행되는 것 확인이 가능하다.
  - 정확히 말하자면 페이지 이동 보다는 이동한 것처럼 만든 눈속임이다.

#### 한 가지 문제 발생

뒤로/앞으로 버튼 클릭 시에는 콘솔에 출력이 안된다는 점이다.  
그 이유는 `body`에만 클릭 이벤트를 주었기 때문인데 `popstate` 이벤트를 사용해서 해결할 수 있다.

> popstate - MDN  
> popstate 이벤트는 브라우저의 백 버튼이나 history.back() 호출 등을 통해서만 발생된다.  
> 그리고 그 이벤트는 같은 document에서 두 히스토리 엔트리 간의 이동이 있을 때만 발생이 된다.

```javascript
window.addEventListener("popstate", router);
```

### View 구현하기

위 파일 구조대로 Home.js, Posts.js, Settings.js를 만든다.

- Not Found도 만들어 봤다.

```javascript
// frontend/static/js/pages/Dashboard.js
export default class {
  constructor() {
    document.title = "Dashboard";
  }

  async getHtml() {
    return `
      <h1>Welcom back, Dom</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <p>
        <a href="/posts" data-link>View recent posts</a>.
      </p>
    `;
  }
}
```

<details>
  <summary>Posts 페이지</summary>

```javascript
// frontend/static/js/pages/Posts.js
export default class {
  constructor() {
    document.title = "Posts";
  }

  async getHtml() {
    return `<h1>This is Posts</h1>`;
  }
}
```

</details>

<details>
  <summary>Settings 페이지</summary>

```javascript
// frontend/static/js/pages/Settings.js
export default class {
  constructor() {
    document.title = "Settings";
  }

  async getHtml() {
    return `
    <h1>This is Settings</h1>
  `;
  }
}
```

</details>

<details>
  <summary>Settings 페이지</summary>

```javascript
// frontend/static/js/pages/NotFound.js
export default class {
  constructor() {
    document.title = "404 Not Found";
  }

  async getHtml() {
    return `
      <h1>404 Not Found</h1>
    `;
  }
}
```

</details>

### View 렌더링하기

index.js에서 콘솔 찍었던 부분을 각 페이지에 해당하는 클래스로 바꿔준다.

```javascript
import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";
import NotFound from "./views/NotFound.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  // 서버에 비동기 요청
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Settings },
  ];

  // Test each route for potential match
  const potentialMathches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname, // location.pathname으로 브라우저 url에 접근
    };
  });

  // isMatch가 true인 것 반환하여 match 할당
  let match = potentialMathches.find(
    (potentialMathch) => potentialMathch.isMatch
  );

  let view;
  if (!match) {
    match = {
      route: location.pathname,
      isMatch: true,
    };
    view = new NotFound();
  } else {
    view = new match.route.view();
  }

  document.querySelector("#root").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
```

- 해당 클래스의 getHtml()을 호출하여 root가 id인 태그에 innerHTML 되도록 작성하면
  - server 요청이 안가고 document.body.addEventListener("click", function)으로
  - client 측에서 렌더링을 하게 된다.

<details>
  <summary>css</summary>

```css
body {
  --nav-width: 200px;
  margin: 0 0 0 calc(10px + var(--nav-width));
  font-family: "Quicksand", sans-serif;
  font-size: 18px;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--nav-width);
  height: 100vh;
  background: #222222;
}

.nav__link {
  display: block;
  padding: 12px 18px;
  text-decoration: none;
  color: #eee;
  font-weight: 500;
}

.nav__link:hover {
  background: rgba(255, 255, 255, 0.05);
}

#app {
  margin: 2em;
  line-height: 1.5;
  font-weight: 500;
}

a {
  color: #009579;
}
```
</details>
