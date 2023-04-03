import { OrderStatus } from "~/constants/order";
import { CartItem } from "~/models/CartItem";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";

export const products: Product[] = [
  {
    description: "Short Product Description1",
    productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    productName: "ProductOne",
    currency: "USD",
    productType: "",
  },
  {
    description: "Short Product Description7",
    productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    productName: "ProductTitle",
    currency: "USD",
    productType: "",
  },
  {
    description: "Short Product Description2",
    productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    productName: "Product",
    currency: "USD",
    productType: "",
  },
  {
    description: "Short Product Description4",
    productId: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    productName: "ProductTest",
    currency: "USD",
    productType: "",
  },
  {
    description: "Short Product Descriptio1",
    productId: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    productName: "Product2",
    currency: "USD",
    productType: "",
  },
  {
    description: "Short Product Description7",
    productId: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    productName: "ProductName",
    currency: "USD",
    productType: "",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);

export const cart: CartItem[] = [
  {
    product: {
      description: "Short Product Description1",
      productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 24,
      productName: "ProductOne",
      currency: "USD",
      productType: "",
    },
    count: 2,
  },
  {
    product: {
      description: "Short Product Description7",
      productId: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
      price: 15,
      productName: "ProductName",
      currency: "USD",
      productType: "",
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
