import { observable } from "./observer.js";

export const createStore = (reducer) => {
  // reducer가 실행될 때 반환하는 객체(state)를 observable로 만들어야 한다.
  const state = observable(reducer());

  // getState가 실제 state를 반환하는 것이 아니라 frozenState를 반환하도록 만들어야 한다.
  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    });
  });

  // 직접적으로 접근하지 못하고
  // dispatch로만 state의 값을 변경할 수 있도록 한다.
  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      // state의 key가 아닐 경우 변경 생략
      if (!state[key]) continue;
      state[key] = value;
    }
  }

  // 값을 반환받을 수 있는 접근자 프로퍼티만 있는 객체 반환
  const getState = () => frozenState;

  // sbuscribe는 observe로 대체
  return { getState, dispatch };
};
