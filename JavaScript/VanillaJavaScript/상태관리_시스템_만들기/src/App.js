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
      // dispatch를 통해서 값을 변경시킨다.
      store.dispatch({ type: SET_B, payload: Number(target.value) });
      // commit을 통해서 값을 변경시킨다.
      // store.commit("SET_B", Number(target.value));
      // store.setState({ b: Number(target.value) });
      // state.b = Number(target.value);
    });
  }
}