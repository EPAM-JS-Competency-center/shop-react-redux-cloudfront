import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { withCors } from "../cors";

const handler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    try {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify([]),
      };
    } catch (err: unknown) {
      return {
        statusCode: 500,
        body: "Error occured",
      };
    }
  };

export default withCors(handler);
