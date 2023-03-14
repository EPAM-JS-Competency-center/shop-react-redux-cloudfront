import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { withCors } from "../cors";
import products from "../mocks/products.json";

export const handler: APIGatewayProxyHandler = withCors(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      return {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    } catch (err: unknown) {
      return {
        statusCode: 500,

        body: "Error occured",
      };
    }
  }
);
