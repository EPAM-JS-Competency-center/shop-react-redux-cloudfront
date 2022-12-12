import * as types from "./CartTypes";

export const addToCart = (payload: any) => ({
  type: types.ADD_TO_CART,
  payload,
});

export const addToCartSuccess = (payload: any) => ({
  type: types.ADD_TO_CART_SUCCESS,
  payload,
});

export const removeFromCart = (payload: any) => ({
  type: types.REMOVE_FROM_CART,
  payload,
});

export const removeFromCartSuccess = (payload: any) => ({
  type: types.REMOVE_FROM_CART_SUCCESS,
  payload,
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
});
