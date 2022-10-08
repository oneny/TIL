import { observable } from "./observer.js";

export class Store {
  #state; // private으로 지정하여 외부에서는 접근이 안되도록 한다.
  #mutations;
  #actions;
  state = {};

  constructor({ state, mutations, actions }) {
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    // state를 직접적으로 수정하지 못하도록 다음과 같이 정의
    Object.keys(state).forEach(key => {
      Object.defineProperty(
        this.state,
        key,
        { get: () => this.#state[key] }, // set 접근자 프로퍼티가 없으므로 직접 값 갱신 불가
      )
    });
  }

  commit(action, payload) {
    // state는 오직 commit을 통해서 수정할 수 있다.
    this.#mutations[action](this.#state, payload);
  }

  dispatch(action, payload) {
    return this.#actions[action]({
      state: this.#state,
      commit: this.commit.bind(this),
      dispatch: this.dispatch.bind(this),
    }, payload);
  }
}