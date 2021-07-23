import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import items from "./items";
import euro from "./euro";
import categories from "./categories";

export default combineReducers({
  alert,
  auth,
  items,
  euro,
  categories,
});
