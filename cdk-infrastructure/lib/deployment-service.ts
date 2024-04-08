import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { BlockPublicAccess } from "aws-cdk-lib/aws-s3";
import { aws_s3 as s3, Stack, aws_s3_deployment, CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { aws_cloudfront as cloudFront } from "aws-cdk-lib";
import { aws_cloudfront_origins as origins } from "aws-cdk-lib";

export class DeploymentService extends Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostingBucket = new s3.Bucket(this, "FrontendBucket", {
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const distribution = new cloudFront.Distribution(this, 'CloudfrontDistribution', {
      defaultBehavior: {
          origin: new origins.S3Origin(hostingBucket),
          viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
          {
              httpStatus: 404,
              responseHttpStatus: 200,
              responsePagePath: '/index.html',
          },
      ],
    });

    // Add to your Stack
    new aws_s3_deployment.BucketDeployment(this, "BucketDeployment", {
      sources: [aws_s3_deployment.Source.asset('./resources/build/')],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    // Add this to your Stack
    new CfnOutput(this, "CloudFrontURL", {
      value: distribution.domainName,
      description: "The distribution URL",
      exportName: "CloudfrontURL",
    });

    new CfnOutput(this, "BucketName", {
      value: hostingBucket.bucketName,
      description: "The name of the S3 bucket",
      exportName: "BucketName",
    });
  }
}
