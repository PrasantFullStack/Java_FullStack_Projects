import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
} from "../Constants";

export function createMultipartRecord(formData) {
  return {
    type: CREATE_PRODUCT,
    payload: formData,
  };
}

export function getProduct() {
  return {
    type: GET_PRODUCT,
  };
}

export function updateMultipartRecord(formData) {
  return {
    type: UPDATE_PRODUCT,
    payload: formData,
  };
}

export function deleteProduct(data) {
  return {
    type: DELETE_PRODUCT,
    payload: data,
  };
}
