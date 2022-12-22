/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from "./ProductsTypes";

const INITIAL_STATE: any = {
  data: [],
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      state.data = action.payload;
      return {
        ...state,
      };
    case types.ADD_PRODUCT_SUCCESS:
      state.data.push(action.payload.data);
      return {
        ...state,
      };
    // case types.ADD_PRODUCT_SUCCESS:
    //   const existingItemIndex = state.data.findIndex(
    //     (x) => x.id === action.payload.payload.id
    //   );
    //   if (existingItemIndex > -1) {
    //     Object.assign(state.data[existingItemIndex], action.payload.payload);
    //   } else {
    //     state.data.push(action.payload);
    //   }
    //   return {
    //     ...state,
    //   };
    case types.DELETE_PRODUCT_SUCCESS:
      state.data = state.data.filter((x) => x.id !== action.payload.payload);
      return {
        ...state,
      };
    default:
      return state;
  }
};
