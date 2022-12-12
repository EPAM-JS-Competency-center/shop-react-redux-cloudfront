import { combineReducers } from "redux";
import products from "../Products/ProductsReducer";
import cart from "../Cart/CartReducer";

export default combineReducers({
  products,
  cart,
});
