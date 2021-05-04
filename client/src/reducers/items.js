import {
  GET_ALL_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  GET_ITEM,
  UPDATE_ITEM,
  GET_DATE,
} from "../actions/types";

const initialState = {
  items: null,
  loading: true,
  updatedAt: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ITEMS:
    case GET_ITEM:
    case UPDATE_ITEM:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: payload, //state.items.filter((item) => item._id !== payload.id),
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, payload],
        loading: false,
      };
    case GET_DATE:
      return {
        ...state,
        updatedAt: payload,
      };
    default:
      return state;
  }
}
