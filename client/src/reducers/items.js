import {
  GET_ALL_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  GET_ITEM,
  UPDATE_ITEM,
  GET_DATE,
  GET_CURRENCY,
} from "../actions/types";

const initialState = {
  items: null,
  loading: true,
  updatedAt: null,
  euroPrice: 4.5,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ITEMS:
    case GET_ITEM:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: payload,
        //items: state.items.filter((item) => item._id !== payload),
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
        updatedAt: payload.replace(",", "\t"),
      };
    case GET_CURRENCY:
      return {
        ...state,
        euroPrice: payload,
      };
    default:
      return state;
  }
}
