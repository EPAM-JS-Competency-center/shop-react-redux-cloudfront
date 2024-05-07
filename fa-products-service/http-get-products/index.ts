import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { products } from "../shared-data";

const getProducts: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res = {
    body: products,
  };
};

export default getProducts;
