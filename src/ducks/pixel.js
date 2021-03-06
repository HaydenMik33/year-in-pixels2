import axios from "axios";
import * as moment from "moment";
///action types
const GET_PIXEL = "GET_PIXEL",
  ADD_PIXEL = "ADD_PIXEL",
  GET_PIXELS = "GET_PIXELS",
  GET_FULL_PIXELS = "GET_FULL_PIXELS",
  GET_PIXELS_BYCOLOR = "GET_PIXELS_BYCOLOR",
  GET_PIXELS_BYDATE = "GET_PIXELS_BYDATE",
  PUSH_PIXEL_EDIT = "PUSH_PIXEL_EDIT",
  UPDATE_PIXEL = "UPDATE_PIXEL",
  RELOAD_YEAR = "RELOAD_YEAR",
  DELETE_PIXEL = "DELETE_PIXEL";
export function getPixel(date) {
  const data = axios.get(`/api/pixel/${date}`).then(res => {
    return res.data;
  });
  return {
    type: GET_PIXEL,
    payload: data
  };
}
export function addPixel(body) {
  const data = axios.post(`/api/pixel`, body).then(res => {
    return res.data;
  });
  return {
    type: ADD_PIXEL,
    payload: data
  };
}
export function updatePixel(body, id) {
  const data = axios.put(`/api/pixel/${id}`, body).then(res => {
    return res.data;
  });
  return {
    type: UPDATE_PIXEL,
    payload: data
  };
}
export function deletePixel(id) {
  const data = axios.delete(`/api/pixel/${id}`).then(res => {
    return res.data;
  });
  return {
    type: DELETE_PIXEL,
    payload: data
  };
}
export function getPixels(year) {
  const data = axios.get(`/api/pixels/byYear/${year}`).then(res => {
    return res.data;
  });
  return {
    type: GET_PIXELS,
    payload: data
  };
}
export function getFullPixels() {
  const data = axios.get(`/api/pixels/feed`).then(res => {
    return res.data;
  });
  return {
    type: GET_FULL_PIXELS,
    payload: data
  };
}
export function getPixelsByColor(color) {
  console.log(color);
  const data = axios.get(`/api/byColor/pixels/${color}`).then(res => {
    return res.data;
  });
  return {
    type: GET_PIXELS_BYCOLOR,
    payload: data
  };
}
export function getPixelsByDate(date) {
  const data = axios.get(`/api/byDate/pixels/${date}`).then(res => {
    return res.data;
  });
  return {
    type: GET_PIXELS_BYDATE,
    payload: data
  };
}
export function pushPixelToEdit(body) {
  return {
    type: PUSH_PIXEL_EDIT,
    payload: body
  };
}
export function reloadYear(newYear) {
  return {
    type: RELOAD_YEAR,
    payload: newYear
  };
}

const initialState = {
  pixel: {},
  pixels: [],
  pixelsForFeed: [],
  isLoading: false,
  year: moment().year()
};

export default function pixel(state = initialState, action) {
  switch (action.type) {
    case `${GET_PIXEL}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PIXEL}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        pixel: action.payload
      };
    case `${GET_PIXELS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        pixels: action.payload
      };
    case `${GET_FULL_PIXELS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FULL_PIXELS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        pixelsForFeed: action.payload
      };
    case `${DELETE_PIXEL}_FULFILLED`:
      return {
        ...state,
        pixelsForFeed: action.payload
      };
    case `${GET_PIXELS_BYCOLOR}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PIXELS_BYCOLOR}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        pixelsForFeed: action.payload
      };
    case `${GET_PIXELS_BYDATE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PIXELS_BYDATE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        pixelsForFeed: action.payload
      };
    case `${ADD_PIXEL}_FULFILLED`:
      return {
        ...state,
        pixel: action.payload
      };
    case `${UPDATE_PIXEL}_FULFILLED`:
      return {
        ...state,
        pixel: action.payload
      };
    case PUSH_PIXEL_EDIT:
      return {
        ...state,
        pixel: action.payload
      };
    case RELOAD_YEAR:
      return {
        ...state,
        year: action.payload
      };
    default:
      return state;
  }
}
