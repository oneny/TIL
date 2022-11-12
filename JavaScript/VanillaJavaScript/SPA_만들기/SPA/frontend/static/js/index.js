import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";
import NotFound from "./views/NotFound.js";
import PostView from "./views/PostView.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  // ["/posts/2", "2", ...]에서 id값에 해당하는 두 번째 값을 가져옴
  const values = match.result.slice(1);

  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  // /posts/:id
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/posts/:id", view: PostView },
    { path: "/settings", view: Settings },
  ];

  // Test each route for potential match
  const potentialMathches = routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  // isMatch가 true인 것 반환하여 match 할당
  let match = potentialMathches.find(
    (potentialMathch) => potentialMathch.result !== null
  );

  let view;
  if (!match) {
    view = new NotFound();
  } else {
    view = new match.route.view(getParams(match));
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
