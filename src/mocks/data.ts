import { OrderStatus } from "~/constants/order";
import { CartItem } from "~/models/CartItem";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";

export const products: Product[] = [
  {
    count: 4,
    description:
      "Improving the Design of Existing Code ”shed light on the refactoring process, describing the principles and best practices for its implementation.",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 2.4,
    title: "Refactoring by M. Fowler",
    logo: "https://r5.readrate.com/img/pictures/basic/792/792600/7926007/w800h317-76be96b9.jpg",
  },
  {
    count: 6,
    description:
      "“Pragmatic programmer. The path from apprentice to master” will tell you everything a person needs to know, starting his way in the field of IT projects. Almost a cult book. You will learn how to deal with software shortcomings, how to create a dynamic, effective and adaptable program, how to form a successful team of programmers.",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
    price: 10,
    title:
      "Pragmatic programmer. The path from apprentice to master. Andrew Hunt, David Thomas",
    logo: "https://r2.readrate.com/img/pictures/basic/792/792600/7926008/w800h317-89405d1d.jpg",
  },
  {
    count: 7,
    description:
      "Perfect code. Master-class - an updated edition of the time-tested bestseller. A book that makes you think and helps you create the perfect code. And it doesn't matter if you are a beginner or a pro, in this publication you will definitely find information for growth and work on your project.",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
    price: 23,
    title: "Perfect code. Master Class. Steve McConnell",
    logo: "https://r5.readrate.com/img/pictures/basic/792/792600/7926009/w800h317-da60182f.jpg",
  },
  {
    count: 12,
    description:
      'The book “At the peak. How to maintain maximum efficiency without burnout "is especially necessary for programmers who are accustomed to plunge headlong into work, not keeping track of time and waste of resources such as strength and health. ',
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title:
      "At the peak. How to maintain maximum efficiency without burnout. Brad Stahlberg, Steve Magness",
    logo: "https://r2.readrate.com/img/pictures/basic/792/792601/7926010/w800h317-04d81319.jpg",
  },
  {
    count: 7,
    description:
      "This book is interesting to read for both a beginner and an experienced programmer. The authors clearly and humorously talk about the fact that programming is in many ways communication. Programming style, naming, commenting, working with someone else's code - often agreements develop exactly where there is strict regulation at the programming language level.",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a6",
    price: 23,
    title: "Programming without fools. Katrin Passig, Johannes Jander",
    logo: "https://r2.readrate.com/img/pictures/basic/792/792601/7926014/w800h317-a1bf3137.jpg",
  },
  {
    count: 8,
    description:
      'Updated anniversary edition of the legendary book "Design Patterns". Many programming problems tend to be repetitive and duplicative. Developers around the world are solving completely identical problems and finding similar solutions. If you don\'t want to reinvent the wheel, use the ready-made design patterns that this book is about to work with.',
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "Head First. Design patterns. Eric Freeman, Elizabeth Freeman",
    logo: "https://r5.readrate.com/img/pictures/basic/792/792601/7926015/w800h317-8f4d4f25.jpg",
  },
  {
    count: 2,
    description:
      "Can you easily change the code and get immediate feedback on the changes you make? How clear is this code? If you come across legacy code, Michael K. Feathers's book on working with it comes in handy.\n\nIn the book Effectively Working with Legacy Code, you will find information about mechanisms for making changes to software, porting legacy code to testing tools, writing tests that prevent new errors from being introduced into the code, and applying methods suitable for any language or platform. sample code in Java, C ++, C, and C #. In addition, you will learn how to pinpoint where changes need to be made in your code, how to work with legacy code that is not object-oriented, and much more.",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "Effective work with legacy code. Michael K. Feathers",
    logo: "https://r2.readrate.com/img/pictures/basic/792/792600/7926006/w800h317-535b11eb.jpg",
  },
  {
    count: 3,
    description:
      "This publication is a collection of useful tips, many of which can only be formulated on our own experience after many years of work in the industry. There is no description of specific technologies, algorithms and programming languages - this is not the value of the Fanatic Programmer. The book will tell you how to overcome lack of motivation, choose the right priorities, understand the psychology of programming, build relationships with management and colleagues, etc.",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "Fanatic programmer. Chad Fowler",
    logo: "https://r5.readrate.com/img/pictures/basic/792/792601/7926011/w800h317-16272c40.jpg",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);

export const cart: CartItem[] = [
  {
    product: {
      "count": 7,
      "description": "Perfect code. Master-class - an updated edition of the time-tested bestseller. A book that makes you think and helps you create the perfect code. And it doesn't matter if you are a beginner or a pro, in this publication you will definitely find information for growth and work on your project.",
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
      "price": 23,
      "title": "Perfect code. Master Class. Steve McConnell",
      "logo": "https://r5.readrate.com/img/pictures/basic/792/792600/7926009/w800h317-da60182f.jpg"
    },
    count: 2,
  },
  {
    product: {
      "count": 12,
      "description": "The book “At the peak. How to maintain maximum efficiency without burnout \"is especially necessary for programmers who are accustomed to plunge headlong into work, not keeping track of time and waste of resources such as strength and health. ",
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      "price": 15,
      "title": "At the peak. How to maintain maximum efficiency without burnout. Brad Stahlberg, Steve Magness",
      "logo": "https://r2.readrate.com/img/pictures/basic/792/792601/7926010/w800h317-04d81319.jpg"
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
