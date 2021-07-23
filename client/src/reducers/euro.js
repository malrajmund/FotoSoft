import { GET_CURRENCY } from "../actions/types";

const initialState = {
  loadingEuro: true,
  euroPrice: 4.5,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENCY:
      return {
        ...state,
        euroPrice: payload,
        loadingEuro: false,
      };
    default:
      return state;
  }
}
