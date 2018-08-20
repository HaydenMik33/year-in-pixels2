import axios from "axios";

///action types
const GET_PIXEL = "GET_PIXEL";
const ADD_PIXEL ="ADD_PIXEL"

export function getPixel(date) {
  const data = axios.get(`/api/pixel/${date}`).then(res=> {return res.data})
  return {
    type: GET_PIXEL,
    payload:data
  };
}
export function addPixel(body){
  const data = axios.post(`/api/pixel`,body).then(res=> {return res.data})
  return {
    type:ADD_PIXEL,
    payload:data
  }
}

const initialState = {
  pixel: {}
};

export default function pixel(state = initialState, action) {
  switch (action.type) {
    case `${GET_PIXEL}_FULFILLED`:
      return {
        ...state,
        pixel: action.payload
      };
      case `${ADD_PIXEL}_FULFILLED`:
      return {
        ...state,
        pixel: action.payload
      };
    default:
      return state;
  }
}