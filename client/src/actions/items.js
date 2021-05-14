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
  GET_CURRENCY,
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

export const deleteItem = (id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/items/${id}`);

    dispatch({
      type: DELETE_ITEM,
      payload: res.data,
    });
    history.push("/");
    dispatch(setAlert("Pomyślnie usunięto pozycję.", "info"));
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

export const updateItem = (id, formData, history) => async (dispatch) => {
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
    dispatch(setAlert("Zedytowano pozycję: " + formData.name, "info"));
    history.push("/");
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

export const getCurrency = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://api.nbp.pl/api/exchangerates/rates/a/eur"
    );
    console.log(res);

    dispatch({
      type: GET_CURRENCY,
      payload: res.data.rates[0].mid,
    });
  } catch (error) {
    console.log(error);
  }
};
