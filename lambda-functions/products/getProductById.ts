import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { withCors } from "../cors";
import products from "../mocks/products.json";

export const handler: APIGatewayProxyHandler = withCors(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const product = products.find(
        ({ id }) => id === event.pathParameters?.id
      );

      if (!product) {
        return {
          statusCode: 404,
          body: JSON.stringify(product),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (err: unknown) {
      return {
        statusCode: 500,
        body: "Error occured",
      };
    }
  }
);
