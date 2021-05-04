import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import items from "./items";

export default combineReducers({
  alert,
  auth,
  items,
});
