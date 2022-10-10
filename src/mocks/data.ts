import { OrderStatus } from "~/constants/order";
import { CartItem } from "~/models/CartItem";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";

export const products: Product[] = [
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    product_name: "ProductOne",
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    product_name: "Productproduct_name",
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    product_name: "Product",
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    product_name: "ProductTest",
  },
  {
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    product_name: "Product2",
  },
  {
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    product_name: "ProductName",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);

export const cart: CartItem[] = [
  {
    product: {
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 24,
      product_name: "ProductOne",
    },
    count: 2,
  },
  {
    product: {
      id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
      price: 15,
      product_name: "ProductName",
    },
    count: 5,
  },
];

export const orders: Order[] = [
  {
    id: "1",
    address: {
      address: "some address",
      firstName: "Name",
      lastName: "Surname",
      comment: "",
    },
    items: [
      { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 2 },
      { productId: "7567ec4b-b10c-45c5-9345-fc73c48a80a1", count: 5 },
    ],
    statusHistory: [
      { status: OrderStatus.Open, timestamp: Date.now(), comment: "New order" },
    ],
  },
  {
    id: "2",
    address: {
      address: "another address",
      firstName: "John",
      lastName: "Doe",
      comment: "Ship fast!",
    },
    items: [{ productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 3 }],
    statusHistory: [
      {
        status: OrderStatus.Sent,
        timestamp: Date.now(),
        comment: "Fancy order",
      },
    ],
  },
];
