import { call, put, takeLatest } from "redux-saga/effects";
import API from "./CartApis";
import * as ACTIONS from "./CartAction";
import * as TYPES from "./CartTypes";

export function* addToCart(payload: any): any {
  try {
    //const response = yield call(API.addProductRequest);
    // yield put(ACTIONS.addProduct(response.data));
    yield put(ACTIONS.addToCartSuccess(payload));
  } catch (err) {}
}

export function* removeFromCart(payload: any): any {
  try {
    //const response = yield call(API.deleteProductRequest);
    yield put(ACTIONS.removeFromCartSuccess(payload));
  } catch (err) {}
}

export function* clearCart(): any {
  try {
    const response = yield call(API.deleteProductRequest);
    yield put(ACTIONS.clearCart());
  } catch (err) {}
}

export function* CartSaga() {
  yield takeLatest(TYPES.ADD_TO_CART, addToCart);
  yield takeLatest(TYPES.REMOVE_FROM_CART, removeFromCart);
  yield takeLatest(TYPES.CLEAR_CART, clearCart);
}
