# Task 2 (Serve SPA in AWS S3 and Cloudfront Services)

## Prerequisites
* [x] Install the latest version of Serverless Framework (https://www.serverless.com/).
* [ ] Configure credentials for AWS to make them accessible by Serverless.
* [x] Fork Any (React, Angular, Vue) Shop single page app from https://github.com/EPAM-JS-Competency-center
  * The [React](https://github.com/sasarik/aws-training-react-cloudfront) boilerplate choosen
* [x] Install dependencies…
* [x] Check if everything works for you

## Tasks

---

### Task 2.1 **Manual Deployment**

1. * [x] In the AWS Console **create** and **configure** an S3 bucket where you will host your app (follow instructions in training materials).
1. * [x] **Build** and **manually upload** the MyShop! app to the created S3 bucket. **Check** if the app is available through the Internet over `http://{your-bucket-name}.s3-website-{aws-region}.amazonaws.com` .
1. * [x] **Create** a CloudFront distribution for your app as it was described in training materials. **Check** your S3 bucket policy changes. **Check** if the app is available through the Internet over given CloudFront URL.
1. * [x] **Make** some minor but visible changes in the app, **build** and **upload** them to your bucket, and create CloudFront distribution invalidation.

### Bucket name
```
aws-training-static-bucket
```

#### Bucket website endpoint 

```
http://aws-training-static-bucket.s3-website-eu-west-1.amazonaws.com/
```

#### With use CloudFront Distribution 
```
https://d5alop7eke0n3.cloudfront.net
```

Bucket policy (initial):
```json
{
    "Version": "2012-10-17",
    "Id": "Policy1676040942657",
    "Statement": [
        {
            "Sid": "Stmt1676040922561",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::aws-training-static-bucket/*"
        }
    ]
}
```

Bucket policy (with CloudFront access only):
```json
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::aws-training-static-bucket/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::064582090880:distribution/E3375TC7B0WR6X"
                }
            }
        }
    ]
}
```

---  

### Task 2.2 **Automated Deployment, using serverless framework command(s)**

### Bucket name
```
aws-training-react-cloudfront-bucket
```

### Bucket website endpoint
```
http://aws-training-react-cloudfront-bucket.s3-website-eu-west-1.amazonaws.com
```

#### With use CloudFront Distribution
```
https://d177vmkb52wotz.cloudfront.net/
```
