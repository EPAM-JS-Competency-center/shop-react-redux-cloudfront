import { Product } from '../types';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { products } from '../constants';

const getAllProducts: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger getSingleProduct function processed a request.');
  context.res = {
    body: products,
  };
};

export default getAllProducts;
