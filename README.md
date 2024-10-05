# Main task (70 points)
- https://d3vjjrb5k3qzb4.cloudfront.net/ -  accessible via CF distribution  deployed with stack template.

- https://m8546-aws-practitioner-for-js-cloudformation-bucket.s3.eu-north-1.amazonaws.com  - publicly inaccessible S3 bucket which is an origin for CF distribution https://d3vjjrb5k3qzb4.cloudfront.net/. Should show 'Access Denied'

- http://tutor-shop-bucket.s3-website.eu-north-1.amazonaws.com/ - another S3 bucket, but with public access, static hosting without CF (not sure if this was required for the task though).

# Additional task (30 points)
- This PR adds the ability to build and deploy the frontend app with a single npm command
### `npm run build-and-deploy` - i didn't add building of infra project as this is usually done 1 time, but in case everything needs to be build the command is 
### `build-with-infra-and-deploy`
Here is deployed with this command app - [d3f0ej3scayugn.cloudfront.net](https://d3f0ej3scayugn.cloudfront.net/)
