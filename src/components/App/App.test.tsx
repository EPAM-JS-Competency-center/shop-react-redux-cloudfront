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

const testCurrency = "USD";

test("Renders products list", async () => {
  const products: AvailableProduct[] = [
    {
      productId: "1",
      productName: "Product 1",
      description: "Product 1 description",
      price: 1,
      currency: testCurrency,
      productType: "",
      count: 1,
    },
    {
      productId: "2",
      productName: "Product 2",
      description: "Product 2 description",
      price: 2,
      currency: testCurrency,
      productType: "",
      count: 2,
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
    expect(screen.getByText(product.productName)).toBeInTheDocument();
    expect(
      screen.getByText(formatAsPrice(product.price, testCurrency))
    ).toBeInTheDocument();
  });
});
