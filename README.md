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


# CloudFront and S3 links
CloudFront: https://dblh0zfovrq4v.cloudfront.net/index.html

S3: https://my-shop-aws.s3.amazonaws.com/index.html

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
