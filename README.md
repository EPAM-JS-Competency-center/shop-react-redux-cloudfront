1. Task https://github.com/EPAM-JS-Competency-center/cloud-development-course-initial/tree/main/2_serving_spa
2. Screenshot:
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/23727250/178113708-ff377622-72e0-455a-abdf-9f98b43ee438.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/23727250/178113721-27f4b65c-3d25-45f5-b13c-ab11f9ac9186.png">

3. Deployment:
  - Cloudfront https://d1cyh2r46e2bzb.cloudfront.net
  - S3 http://rs-react-app-vitaliibogdaniuk-autobuild.s3-website-us-east-1.amazonaws.com (Will have access denied erro due to access limit by CloudFront only)
  
4. Done 2022-07-09 / deadline 2022-07-11

5. Score 5/5
  Serve SPA in AWS S3 and CloudFront Services (5/5)
  - S3 bucket has been created and configured properly. (manually and with serverless)
  - CloudFront distibution is created and configured properly and the site is served now with CloudFront and is available through the internet over CloundFront URL, S3-website link has 403 Access
  - Serverless-finch and serverless-single-page-app plugins are added and configured. The app can be built and deployed by running npm script command
