import { APIGatewayProxyResult } from "aws-lambda";

export interface LambdaAPIGatewayProxyResult extends APIGatewayProxyResult {
  headers: {
    "Access-Control-Allow-Origin": string;
  };
}
