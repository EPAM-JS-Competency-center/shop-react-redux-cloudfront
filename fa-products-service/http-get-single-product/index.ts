import { Product } from '../types';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { products } from '../constants';

const getSingleProduct: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger getSingleProduct function processed a request.');
  context.res = {
    body: products.find(
      (product) => product.id === `sku${req.params.productId}`
    ),
  };
};

export default getSingleProduct;
