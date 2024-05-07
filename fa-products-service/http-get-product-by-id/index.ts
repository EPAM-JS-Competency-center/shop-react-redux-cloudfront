import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { products } from "../shared-data";

const getProductById: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
  const productId = context.bindingData.productId.toString();

  const product = products.find(p => p.id === productId);

  if (product) {
    context.res = {
      body: product
    };
  } else {
    context.res = {
      status: 404,
      body: `Product with ID: ${productId} not found`
    };
  }
};

export default getProductById;

