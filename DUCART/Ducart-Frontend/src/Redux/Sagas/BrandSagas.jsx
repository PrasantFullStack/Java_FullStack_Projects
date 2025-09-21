//what is saga?
//Redux Saga is a middleware library used in Redux applications to handle side effects, such as asynchronous operations (e.g., data fetching, API calls) and complex state management logic. It leverages ES6 generator functions to make the code more readable and easier to manage.
//why use saga?
//1. Side effect management: Redux Saga is designed to handle side effects (like data fetching, API calls, and asynchronous operations) in a more manageable way compared to traditional Redux Thunk. It uses generator functions to make the code more readable and easier to test.
//2. Better control over async flow: Sagas allow for more complex async flows, such as sequencing, parallel execution, and cancellation of tasks, which can be challenging with other middleware.
//3. Improved error handling: Redux Saga provides a structured way to handle errors in asynchronous operations, making it easier to manage failures and retries.
//4. Decoupling of business logic: By separating side effects from the UI components and Redux actions, Sagas help keep the codebase cleaner and more maintainable.
//5. Testability: Sagas are easier to test because they are just generator functions, allowing you to step through the code and assert on the yielded effects without needing to mock the entire Redux store or middleware.

import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_BRAND,
  CREATE_BRAND_RED,
  DELETE_BRAND,
  DELETE_BRAND_RED,
  GET_BRAND,
  GET_BRAND_RED,
  UPDATE_BRAND,
  UPDATE_BRAND_RED,
} from "../Constants";

import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Services";

function* createSaga(action) {
  try {
    let response = yield createMultipartRecord("brand", action.payload);
    yield put({ type: CREATE_BRAND_RED, payload: response });
  } catch (error) {
    console.error("Error creating brand:", error);
  }
}
function* getSaga() {
  let response = yield getRecord("brand");
  yield put({ type: GET_BRAND_RED, payload: response });
}
function* updateSaga(action) {
  const formData = action.payload;
  try {
    const id = formData.get("id"); // id yaha se milega ab
    yield updateMultipartRecord("brand", formData, id);
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload });
  } catch (error) {
    console.error("Error creating brand:", error);
  }
}

function* deleteSaga(action) {
  yield deleteRecord("brand", action.payload);
  yield put({ type: DELETE_BRAND_RED, payload: action.payload });
}

export default function* brandSaga() {
  yield takeEvery(CREATE_BRAND, createSaga);
  yield takeEvery(GET_BRAND, getSaga);
  yield takeEvery(UPDATE_BRAND, updateSaga);
  yield takeEvery(DELETE_BRAND, deleteSaga);
}
