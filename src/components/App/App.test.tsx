import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import App from "~/components/App/App";
import { server } from "~/mocks/server";
import { rest } from "msw";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";
import { AvailableProduct } from "~/models/Product";
import { renderWithProviders } from "~/testUtils";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { formatAsPrice } from "~/utils/utils";

test("Renders products list", async () => {
  const products: AvailableProduct[] = [
    {
      "count": 7,
      "description": "Perfect code. Master-class - an updated edition of the time-tested bestseller. A book that makes you think and helps you create the perfect code. And it doesn't matter if you are a beginner or a pro, in this publication you will definitely find information for growth and work on your project.",
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
      "price": 23,
      "title": "Perfect code. Master Class. Steve McConnell",
      "logo": "https://r5.readrate.com/img/pictures/basic/792/792600/7926009/w800h317-da60182f.jpg"
    },
    {
      "count": 12,
      "description": "The book “At the peak. How to maintain maximum efficiency without burnout \"is especially necessary for programmers who are accustomed to plunge headlong into work, not keeping track of time and waste of resources such as strength and health. ",
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      "price": 15,
      "title": "At the peak. How to maintain maximum efficiency without burnout. Brad Stahlberg, Steve Magness",
      "logo": "https://r2.readrate.com/img/pictures/basic/792/792601/7926010/w800h317-04d81319.jpg"
    },
  ];
  server.use(
    rest.get(`${API_PATHS.bff}/product/available`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(),
        ctx.json<AvailableProduct[]>(products)
      );
    }),
    rest.get(`${API_PATHS.cart}/profile/cart`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json<CartItem[]>([]));
    })
  );
  renderWithProviders(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));
  products.forEach((product) => {
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(formatAsPrice(product.price))).toBeInTheDocument();
  });
});
