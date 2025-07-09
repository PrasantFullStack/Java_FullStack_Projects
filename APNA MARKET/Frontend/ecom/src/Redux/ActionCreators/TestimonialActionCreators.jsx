import {
  CREATE_TESTIMONIAL,
  DELETE_TESTIMONIAL,
  GET_TESTIMONIAL,
  UPDATE_TESTIMONIAL,
} from "../Constants";

// export function createTestimonial(data) {
//     return {
//         type: CREATE_TESTIMONIAL,
//         payload: data
//     }
// }

export function createMultipartRecord(formData) {
  return {
    type: CREATE_TESTIMONIAL,
    payload: formData,
  };
}

export function getTestimonial() {
  return {
    type: GET_TESTIMONIAL,
  };
}

export function updateMultipartRecord(formData) {
  return {
    type: UPDATE_TESTIMONIAL,
    payload: formData,
  };
}

export function deleteTestimonial(data) {
  return {
    type: DELETE_TESTIMONIAL,
    payload: data,
  };
}
