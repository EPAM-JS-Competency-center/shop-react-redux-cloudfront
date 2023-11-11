import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment'; 
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as iam from '@aws-cdk/aws-iam'; 
import { Construct, Stack } from '@aws-cdk/core';
​
​
export class StaticSite extends Construct{
    constructor(parent: Stack, name: string) {
    super(parent, name);
​
    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, 'JSCC-OAI')
​
    const siteBucket = new s3.Bucket(this, "JSCCSStaticBucket",{
            bucketName: "js-cc-cloudfront-s3",
            websiteIndexDocument: "index.html",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
        })
​
    siteBucket.addToResourcePolicy(new iam.PolicyStatement({
        actions: ["S3:GetObject"],
        resources: [siteBucket.arnForObjects( "*")],
        principals: [new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }))
​
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'JSCC-distribution',{
        originConfigs:[
            {
                s3OriginSource: {
                    s3BucketSource: siteBucket,
                    originAccessIdentity: cloudfrontOAI
                
            },
            behaviors: [{
                isDefaultBehavior: true
            }]
    }]
    })
​
    new s3deploy.BucketDeployment(this, 'JSCC-Bucket-Deployment', {
        sources: [s3deploy.Source.asset{"./dist"}],
        destinationBucket: siteBucket,
        distribution,
        distributionPaths: ['/*']
    })
}
}