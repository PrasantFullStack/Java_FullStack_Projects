import {
  CREATE_BRAND,
  DELETE_BRAND,
  GET_BRAND,
  UPDATE_BRAND,
} from "../Constants";
//What is action creator?
//Action creators are functions that create and return action objects in Redux. They help encapsulate the process of creating actions, making the code more organized and easier to maintain. Action creators can also handle any necessary data preparation before dispatching the action to the Redux store.
//Why use action creators?
//1. Code organization: Action creators help keep the codebase organized by separating the action creation logic from the components that dispatch actions.
//2. Reusability: Action creators can be reused across different components, reducing code duplication and promoting consistency in action creation.
//3. Easier maintenance: If the structure of an action needs to change, it can be updated in one place (the action creator) rather than in every component that dispatches the action.
//4. Improved readability: Using action creators makes the code more readable and self-documenting, as the purpose of the action is clear from the function name.
//5. Middleware compatibility: Action creators can be easily integrated with middleware like Redux Thunk or Redux Saga to handle asynchronous actions.
export function createMutipartRecord(formData) {
  return {
    type: CREATE_BRAND,
    payload: formData,
  };
}

export function getBrand() {
  return {
    type: GET_BRAND,
  };
}

export function updateMultipartRecord(formData) {
  return {
    type: UPDATE_BRAND,
    payload: formData,
  };
}

export function deleteBrand(data) {
  return {
    type: DELETE_BRAND,
    payload: data,
  };
}
