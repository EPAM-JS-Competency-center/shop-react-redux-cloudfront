import * as types from "./ProductsTypes";

export const getProducts = (payload: any) => ({
  type: types.GET_PRODUCTS,
  payload,
});

export const getProductsSuccess = (payload: any) => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload,
});

export const getProductById = (payload: any) => ({
  type: types.GET_PRODUCTS_BY_ID,
  payload,
});

export const getProductByIdSuccess = (payload: any) => ({
  type: types.GET_PRODUCTS_BY_ID_SUCCESS,
  payload,
});

export const addProduct = (payload: any) => ({
  type: types.ADD_PRODUCT,
  payload,
});

export const addProductSuccess = (payload: any) => ({
  type: types.ADD_PRODUCT_SUCCESS,
  payload,
});

export const deleteProduct = (payload: any) => ({
  type: types.DELETE_PRODUCT,
  payload,
});

export const deleteProductSuccess = (payload: any) => ({
  type: types.DELETE_PRODUCT_SUCCESS,
  payload,
});
