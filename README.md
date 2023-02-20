
## Homework for Serve SPA in AWS S3 and Cloudfront Services

`Task 2.1 Manual deployment`
   What was done:
   1) An  s3 bucket was created through aws console.  http://comersialshopta.s3-website-eu-west-1.amazonaws.com
2) The built project was uploaded to the bucket.
3) The public access was unblocked for the bucket.
4) A permission was added to the bucket.  {
   "Version": "2012-10-17",
   "Statement": [
   {
   "Sid": "GetObjects",
   "Effect": "Allow",
   "Principal": "*",
   "Action": "s3:GetObject",
   "Resource": "arn:aws:s3:::comersialshopta/*"
   }
   ]
   }
4) A static website hosting was turned on for the bucket to have access to.


  `Task 2.2 Automated Deployment` What was done:
   1) Using serverless-finch plugin  a new bucket has been created and the project built was uploaded to the bucket
     with the command "sls client deploy --no-config-change --no-policy-change --no-cors-change".
     Before it the new bucket name was added to the servless.yml (bucketName: comersialshopta2)
     As we just use the only serverless-finch plugin command  the bucket was just created without any other adjustments.
2)  To fully complete the task 2.2 the [serverless-single-page-app-plugin.js](.serverless_plugins%2Fserverless-single-page-app-plugin.js)along with the serverless-finch were used along with other adjustments from yml file:
    a) "sls deploy" - to use serverlees framework to start creating new resources (through CloudFormation) like S3 and CloudFront.
    b)  "sls client deploy --no-config-change --no-policy-change --no-cors-change"  - to update the changes made in the project.
    c) "sls invalidateCloudFrontCache" - invalidate cache to update changes at the CloudFront. 
3)  As API does not work at AWS yet, and thus it is not possible to get product available some notice has been added to the main page. Like " Sorry API is still being developed."
4) To update changes now it is enough to call  "sls client deploy" and "sls invalidateCloudFrontCache".
   https://d359ghg4pp7ul2.cloudfront.net/ - the link for the CloudFront.  

# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Serverless](https://serverless.com/) as a serverless framework
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.

### `client:deploy`, `client:deploy:nc`

Deploy the project build from `dist` folder to configured in `serverless.yml` AWS S3 bucket with or without confirmation.

### `client:build:deploy`, `client:build:deploy:nc`

Combination of `build` and `client:deploy` commands with or without confirmation.

### `cloudfront:setup`

Deploy configured in `serverless.yml` stack via CloudFormation.

### `cloudfront:domainInfo`

Display cloudfront domain information in console.

### `cloudfront:invalidateCache`

Invalidate cloudfront cache.

### `cloudfront:build:deploy`, `cloudfront:build:deploy:nc`

Combination of `client:build:deploy` and `cloudfront:invalidateCache` commands with or without confirmation.

### `cloudfront:update:build:deploy`, `cloudfront:update:build:deploy:nc`

Combination of `cloudfront:setup` and `cloudfront:build:deploy` commands with or without confirmation.

### `serverless:remove`

Remove an entire stack configured in `serverless.yml` via CloudFormation.
