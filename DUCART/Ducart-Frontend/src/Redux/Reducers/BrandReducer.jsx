import {
  CREATE_BRAND_RED,
  DELETE_BRAND_RED,
  GET_BRAND_RED,
  UPDATE_BRAND_RED,
} from "../Constants";
//what is reducer?
//A reducer is a pure function in Redux that takes the current state and an action as arguments and returns a new state based on the action type and payload. Reducers are responsible for updating the state in response to dispatched actions, ensuring that the state remains immutable by creating and returning a new state object rather than modifying the existing one.

//why use reducer?
//1. State management: Reducers are a core concept in Redux, which is a popular state management library for JavaScript applications. They help manage the application's state in a predictable way.
//2. Pure functions: Reducers are pure functions, meaning they always produce the same output for the same input and do not have side effects. This makes them easier to test and reason about.
//3. Immutability: Reducers ensure that the state remains immutable by creating and returning a new state object rather than modifying the existing one. This helps prevent unintended side effects and makes it easier to track state changes.
//4. Centralized state updates: By using reducers, all state updates are centralized in one place, making it easier to understand how the state changes in response to different actions.
//5. Time-travel debugging: Since reducers produce a new state for each action, it becomes possible to implement features like time-travel debugging, where developers can step through previous states and actions to identify issues.

export default function BrandReducer(state = [], action) {
  switch (action.type) {
    case CREATE_BRAND_RED:
      let newState = [...state];
      newState.push(action.payload);
      return newState;

    case GET_BRAND_RED:
      return action.payload;

    case UPDATE_BRAND_RED:
      let index = state.findIndex((x) => x.id === action.payload.id);
      state[index].name = action.payload.name;
      state[index].pic = action.payload.pic;
      state[index].active = action.payload.active;
      return state;

    case DELETE_BRAND_RED:
      return state.filter((x) => x.id !== action.payload.id);

    default:
      return state;
  }
}
