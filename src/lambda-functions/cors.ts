import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Callback,
  Context,
} from "aws-lambda";

export const withCors = (
  lambda: APIGatewayProxyHandler
): APIGatewayProxyHandler => {
  return async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback<APIGatewayProxyResult>
  ) => {
    const lambdaResult = await lambda(event, context, callback);

    return {
      ...lambdaResult,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    } as APIGatewayProxyResult;
  };
};
