import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/storeOld/store";
import { Product } from "~/models/Product";
import { CartItem } from "~/models/CartItem";
import { API_PATHS } from "~/constants/apiPaths";
import axios from "axios";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateFromApi: (state, { payload }: PayloadAction<CartState>) => {
      state.items = payload.items;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToCart: (state, action: PayloadAction<Product>) => {
      const { items } = state;
      const { payload: product } = action;
      const existingItem = items.find((i) => i.product.id === product.id);
      if (existingItem) {
        existingItem.count++;
        return;
      }
      items.push({ product, count: 1 });
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const { items } = state;
      const { payload: product } = action;
      const existingItem = items.find((i) => i.product.id === product.id);
      if (!existingItem) return;
      if (existingItem.count > 1) {
        existingItem.count--;
        return;
      }
      state.items = items.filter((i) => i.product.id !== product.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const addToCart =
  (product: Product) => async (dispatch: any, getState: any) => {
    dispatch(cartSlice.actions.addToCart(product));
    const {
      cart: { items },
    } = getState();
    await axios.put(
      `${API_PATHS.cart}/profile/cart`,
      { items },
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      }
    );
  };

export const removeFromCart =
  (product: Product) => async (dispatch: any, getState: any) => {
    dispatch(cartSlice.actions.removeFromCart(product));
    const {
      cart: { items },
    } = getState();
    await axios.put(
      `${API_PATHS.cart}/profile/cart`,
      { items },
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      }
    );
  };

export const clearCart = () => async (dispatch: any, getState: any) => {
  dispatch(cartSlice.actions.clearCart());
  const {
    cart: { items },
  } = getState();
  await axios.put(
    `${API_PATHS.cart}/profile/cart`,
    { items },
    {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    }
  );
};

export const { updateFromApi } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cart.value)`
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
