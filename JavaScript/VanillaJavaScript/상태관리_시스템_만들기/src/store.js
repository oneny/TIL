// import { Store } from "./core/StoreVuex.js";
import { createStore } from "./core/StoreRedux.js";

// 초기 state의 값을 정의
const initState = {
  a: 10,
  b: 20,
};

// dispatch에서 사용될 type들을 정의
export const SET_A = "SET_A";
export const SET_B = "SET_B";

// reducer를 정의하여 store에 넘겨준다.
export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case "SET_A":
        return { ...state, a: action.payload };
    case "SET_B":
      return { ...state, b: action.payload };
    default:
      return state;
  }
});


// reducer에서 사용될 action 정의
export const setA = (payload) => ({ type: SET_A, payload });
export const setB = (payload) => ({ type: SET_B, payload });

// Vuex Store
// export const store = new Store({
//   state: {
//     a: 10,
//     b: 20,
//   },

//   // setState(newState) {
//   //   for (const [key, value] of Object.entries(newState)) {
//   //     if (!this.state[key]) continue;
//   //     this.state[key] = value;
//   //   }
//   // }
  
//   // state의 값은 오직 mutations를 통해서 변경할 수 있다.
//   mutations: {
//     SET_A (state, payload) {
//       state.a = payload;
//     },
//     SET_B(state, payload) {
//       state.b = payload;
//     }
//   },
// });

