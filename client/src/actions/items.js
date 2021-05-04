import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_ALL_ITEMS,
  ITEM_ERROR,
  GET_ITEM,
  UPDATE_ITEM,
  GET_DATE,
} from "./types";

export const getAllItems = () => async (dispatch) => {
  try {
    let res = await axios.get("/api/items/allItems");
    dispatch({
      type: GET_ALL_ITEMS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.msg);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/items/${id}`);
    console.log("test1");
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
    console.log("test2");
    dispatch(setAlert("Pomyślnie usunięto pozycję.", "success"));
  } catch (error) {
    console.log(error.msg);
  }
};

export const addItem = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let res = await axios.post("/api/items/addItem", formData, config);
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
    dispatch(setAlert("Dodano pozycję.", "success"));
  } catch (error) {
    console.log(error.msg);
  }
};

export const getItem = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/items/${id}`);
    dispatch({
      type: GET_ITEM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.msg);
  }
};

export const updateItem = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/items/${id}`, formData, config);
    dispatch({
      type: UPDATE_ITEM,
      payload: res.data,
    });
    dispatch(setAlert("Zedytowano pozycję.", "success"));
  } catch (error) {
    console.log(error.msg);
  }
};

export const getDate = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/items/getDate/last");
    dispatch({
      type: GET_DATE,
      payload: res.data.updatedAt,
    });
  } catch (error) {
    console.log(error.msg);
  }
};
