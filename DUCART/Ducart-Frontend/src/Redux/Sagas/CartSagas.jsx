import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_CART,
  CREATE_CART_RED,
  DELETE_CART,
  DELETE_CART_RED,
  GET_CART,
  GET_CART_RED,
  UPDATE_CART,
  UPDATE_CART_RED,
} from "../Constants";

import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services";
//Cart Sagas are used to handle asynchronous actions related to the shopping cart in a Redux application. They listen for specific action types (like CREATE_CART, GET_CART, UPDATE_CART, DELETE_CART) and perform side effects such as making API calls to create, retrieve, update, or delete cart items. After completing these operations, they dispatch corresponding actions (like CREATE_CART_RED, GET_CART_RED, etc.) to update the Redux store with the results of the operations.
function* createSaga(action) {
  let response = yield createRecord("cart", action.payload);
  yield put({ type: CREATE_CART_RED, payload: response });
}
function* getSaga() {
  let response = yield getRecord("cart");
  yield put({ type: GET_CART_RED, payload: response });
}
function* updateSaga(action) {
  yield updateRecord("cart", action.payload);
  yield put({ type: UPDATE_CART_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord("cart", action.payload);
  yield put({ type: DELETE_CART_RED, payload: action.payload });
}

export default function* cartSaga() {
  yield takeEvery(CREATE_CART, createSaga);
  yield takeEvery(GET_CART, getSaga);
  yield takeEvery(UPDATE_CART, updateSaga);
  yield takeEvery(DELETE_CART, deleteSaga);
}
