import { OrderStatus } from "~/constants/order";
import { CartItem } from "~/models/CartItem";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";

export const products: Product[] = [
  {
    description: "Short Product Description1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "ProductOne",
    img: "https://soccershop.by/image/cache/catalog/Footwear/Nike/new/FirmGround/data-images-butsi-nike-db5611-611-693x465-1024x1024.jpg",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductTitle",
    img: "https://soccershop.by/image/cache/catalog/Footwear/Nike/FG/new/data-images-butsi-nike-cq7635-600-693x465-1024x1024.jpg",
  },
  {
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "Product",
    img: "https://soccershop.by/image/cache/catalog/Footwear/Nike/FG/new/data-images-butsi-nike-cq7635-090-693x465-1024x1024.jpg",
  },
  {
    description: "Short Product Description4",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "ProductTest",
    img: "https://soccershop.by/image/cache/catalog/Footwear/Nike/new/FirmGround/unnamed-1024x1024.jpg",
  },
  {
    description: "Short Product Descriptio1",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "Product2",
    img: "https://soccershop.by/image/cache/catalog/Footwear/Nike/new/FirmGround/unnamed31414-1024x1024.jpg",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductName",
    img: "https://soccershop.by/image/cache/catalog/Footwear/Nike/FG/new/data-images-butsi-nike-aq4176-060-693x465-1024x1024.jpg",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);

export const cart: CartItem[] = [
  {
    product: {
      description: "Short Product Description1",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 24,
      title: "ProductOne",
      img: "https://soccershop.by/image/cache/catalog/Footwear/Nike/new/FirmGround/data-images-butsi-nike-db5611-611-693x465-1024x1024.jpg", 
    },
    count: 2,
  },
  {
    product: {
      description: "Short Product Description7",
      id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
      price: 15,
      title: "ProductName",
      img: "https://soccershop.by/image/cache/catalog/Footwear/Nike/new/FirmGround/data-images-butsi-nike-db5611-611-693x465-1024x1024.jpg",
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
