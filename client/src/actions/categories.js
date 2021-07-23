import axios from "axios";
import { setAlert } from "./alert";
import { GET_CATEGORIES } from "./types";

export const getCategories = () => async (dispatch) => {
  try {
    let res = await axios.get("/api/items/getCategories/unique");
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.msg);
  }
};
