import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";

export function useCart() {
  return useQuery<
    {
      statusCode: number;
      data: { data: { cart: { items: CartItem[] } } };
      message: string;
    },
    AxiosError
  >("cart", async () => {
    const res = await axios.get<{
      statusCode: number;
      data: { data: { cart: { items: CartItem[] } } };
      message: string;
    }>(
      `${API_PATHS.nestRoute}/api/profile/cart/c3e78fe6-4d31-4c6b-84ff-deaa01f158e8`,
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      }
    );
    return res.data;
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation((values: CartItem) =>
    axios.put<CartItem[]>(`${API_PATHS.nestRoute}/api/profile/cart`, values, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    })
  );
}
