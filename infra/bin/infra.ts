#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DeployWebAppStack } from "../lib/deploy-web-app-stack";
import { ProductsLambdaStack } from "../lib/products-lambda-stack";
import { ProductsApiStack } from "../lib/products-api-stack";
import { ProductsDBStack } from "../lib/products-db-stack";
import { ImportServiceStack } from "../lib/import-service-stack";
import { ProductsSQSStack } from "../lib/products-sqs-stack";
import { ProductsSNSStack } from "../lib/products-sns-stack";
import { BackendIntegrationStack } from "../lib/backend-integration-stack";

const envVars = {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_ACCOUNT_REGION
  }
}

const app = new cdk.App({ context: { '@aws-cdk/core:environment': `account=${process.env.AWS_ACCOUNT_ID},region=${process.env.AWS_ACCOUNT_REGION}` } });
new DeployWebAppStack(app, "DeployWebAppStack", envVars);

const productsApiStack = new ProductsApiStack(app, "ProductsApiStack", envVars);
const productsDBStack = new ProductsDBStack(app, "ProductsDBStack", envVars);
const productsSQSStack = new ProductsSQSStack(app, "ProductsSQSStack", envVars);
const productsSNSStack = new ProductsSNSStack(app, "ProductsSNSStack", envVars);

new ProductsLambdaStack(app, "ProductsLambdaStack", {
  productsApiStack,
  productsDBStack,
  productsSQSStack,
  productsSNSStack,
  ...envVars
});

new ImportServiceStack(app, "ImportServiceStack", { productsSQSStack, ...envVars });

new BackendIntegrationStack(app, 'BackendIntegrationStack', {})
