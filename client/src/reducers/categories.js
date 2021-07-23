import { GET_CATEGORIES } from "../actions/types";

const initialState = {
  categories: null,
  loadingCategories: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loadingCategories: false,
      };
    default:
      return state;
  }
}
