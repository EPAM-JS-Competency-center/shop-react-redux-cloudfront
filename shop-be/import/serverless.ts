import type { AWS } from "@serverless/typescript";

import importFile from "@functions/import";
import parser from "@functions/parser";

const serverlessConfiguration: AWS = {
  service: "import",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  custom: {
    // @ts-ignore
    stage: `${("opt:stage", "dev")}`,
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    bucketName: "import-service-storage",
    autoswagger: {
      title: "Import service",
      apiType: "http",
      // @ts-ignore
      basePath: `/${("opt:stage", "dev")}`,
      excludeStages: ["production"],
    },
    authorizerArn: { "Fn::ImportValue": "BasicAuthorizerArn" },
  },
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    region: "eu-west-1",
    profile: "awsTraining",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      SQS_FILE_IMPORT: { Ref: "SQSQueue" },
      REGION: "${self:provider.region}",
      BUCKET_NAME: "${self:custom.bucketName}",
      TOPIC_ARN: {
        Ref: "SNSTopic",
      },
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: "arn:aws:s3:::${self:custom.bucketName}/*",
      },
      {
        Effect: "Allow",
        Action: ["s3:ListBucket"],
        Resource: "arn:aws:s3:::${self:custom.bucketName}",
      },
      {
        Effect: "Allow",
        Action: ["sqs:*"],
        Resource: {
          "Fn::GetAtt": ["SQSQueue", "Arn"],
        },
      },
      {
        Effect: "Allow",
        Action: ["sns:*"],
        Resource: {
          Ref: "SNSTopic",
        },
      },
    ],
  },
  resources: {
    Resources: {
      WebAppS3Bucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:custom.bucketName}",
          AccessControl: "Private",
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedHeaders: ["*"],
                AllowedMethods: ["PUT"],
                AllowedOrigins: ["*"],
              },
            ],
          },
        },
      },
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "aws-training-sqs-queue",
        },
      },
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "aws-training-sns-topic",
        },
      },
      SNSSubscriptionString: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "foltivarka@gufum.com",
          Protocol: "email",
          TopicArn: { Ref: "SNSTopic" },
          FilterPolicy: {
            ProductsLength: ["ShortList"],
          },
        },
      },
      SNSSubscriptionBoolean: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "yudeibautibru-5363@yopmail.com",
          Protocol: "email",
          TopicArn: { Ref: "SNSTopic" },
          FilterPolicy: {
            ProductsLength: ["LongList"],
          },
        },
      },
      GatewayResponse: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
          },
          ResponseType: "DEFAULT_4XX",
          RestApiId: { Ref: "ApiGatewayRestApi" },
        },
      },
    },
    Outputs: {
      ImportProductQueueUrl: {
        Value: { Ref: "SQSQueue" },
        Export: {
          Name: "ImportProductQueueUrl",
        },
      },
      ImportProductQueueArn: {
        Value: { "Fn::GetAtt": ["SQSQueue", "Arn"] },
        Export: {
          Name: "ImportProductQueueArn",
        },
      },
    },
  },
  functions: { importFile, parser },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
