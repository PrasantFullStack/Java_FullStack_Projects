import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_CHECKOUT,
  CREATE_CHECKOUT_RED,
  DELETE_CHECKOUT,
  DELETE_CHECKOUT_RED,
  GET_CHECKOUT,
  GET_CHECKOUT_RED,
  UPDATE_CHECKOUT,
  UPDATE_CHECKOUT_RED,
} from "../Constants";

import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services";
// Checkout Sagas are used to handle asynchronous actions related to the checkout process in a Redux application. They listen for specific action types (like CREATE_CHECKOUT, GET_CHECKOUT, UPDATE_CHECKOUT, DELETE_CHECKOUT) and perform side effects such as making API calls to create, retrieve, update, or delete checkout information. After completing these operations, they dispatch corresponding actions (like CREATE_CHECKOUT_RED, GET_CHECKOUT_RED, etc.) to update the Redux store with the results of the operations.
function* createSaga(action) {
  let response = yield createRecord("checkout", action.payload);
  yield put({ type: CREATE_CHECKOUT_RED, payload: response });
}
function* getSaga() {
  let response = yield getRecord("checkout");
  yield put({ type: GET_CHECKOUT_RED, payload: response });
}
function* updateSaga(action) {
  yield updateRecord("checkout", action.payload);
  yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord("checkout", action.payload);
  yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload });
}
//why use saga?
//1. Side effect management: Redux Saga is designed to handle side effects (like data fetching, API calls, and asynchronous operations) in a more manageable way compared to traditional Redux Thunk. It uses generator functions to make the code more readable and easier to test.
//2. Better control over async flow: Sagas allow for more complex async flows, such as sequencing, parallel execution, and cancellation of tasks, which can be challenging with other middleware.
//3. Improved error handling: Redux Saga provides a structured way to handle errors in asynchronous operations, making it easier to manage failures and retries.
//4. Decoupling of business logic: By separating side effects from the UI components and Redux actions, Sagas help keep the codebase cleaner and more maintainable.
//5. Testability: Sagas are easier to test because they are just generator functions, allowing you to step through the code and assert on the yielded effects without needing to mock the entire Redux store or middleware.
export default function* checkoutSaga() {
  yield takeEvery(CREATE_CHECKOUT, createSaga);
  yield takeEvery(GET_CHECKOUT, getSaga);
  yield takeEvery(UPDATE_CHECKOUT, updateSaga);
  yield takeEvery(DELETE_CHECKOUT, deleteSaga);
}
