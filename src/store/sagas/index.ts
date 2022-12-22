import { ProductsSaga } from "../Products/ProductsSagas";
import { CartSaga } from "../Cart/CartSagas";
import { fork, all } from "redux-saga/effects";

export function* watchSagas() {
  yield all([fork(ProductsSaga), fork(CartSaga)]);
}
