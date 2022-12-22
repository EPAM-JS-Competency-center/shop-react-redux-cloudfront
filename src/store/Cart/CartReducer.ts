/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from "./CartTypes";
import { cart } from "../../mocks/data";

const INITIAL_STATE: any = {
  data: [...cart],
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.ADD_TO_CART_SUCCESS:
      const productInCart = state.data.filter(
        (x) => x.product.id === action.payload.payload.id
      );
      if (productInCart.length === 0) {
        state.data.push({ product: action.payload.payload, count: 1 });
      } else {
        productInCart[0].count++;
      }
      return {
        ...state,
      };
    case types.CLEAR_CART:
      state.data = [];
      return {
        ...state,
      };
    case types.REMOVE_FROM_CART_SUCCESS:
      const removedProduct = state.data.filter(
        (x) => x.product.id === action.payload.payload.id
      );
      if (removedProduct.length && removedProduct[0].count === 1) {
        state.data = state.data.filter(
          (x) => x.product.id !== action.payload.payload.id
        );
      } else {
        removedProduct[0].count--;
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};
