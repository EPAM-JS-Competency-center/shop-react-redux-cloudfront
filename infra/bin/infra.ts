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

const app = new cdk.App();
new DeployWebAppStack(app, "DeployWebAppStack", {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

const productsApiStack = new ProductsApiStack(app, "ProductsApiStack", {});
const productsDBStack = new ProductsDBStack(app, "ProductsDBStack", {});
const productsSQSStack = new ProductsSQSStack(app, "ProductsSQSStack");
const productsSNSStack = new ProductsSNSStack(app, "ProductsSNSStack");

new ProductsLambdaStack(app, "ProductsLambdaStack", {
  productsApiStack,
  productsDBStack,
  productsSQSStack,
  productsSNSStack,
});

new ImportServiceStack(app, "ImportServiceStack", { productsSQSStack });
