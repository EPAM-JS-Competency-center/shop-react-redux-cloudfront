import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import { watchSagas } from "./sagas";
const saga = createSagaMiddleware();

const store = configureStore({ reducer, middleware: [saga] });

saga.run(watchSagas);

export default store;
