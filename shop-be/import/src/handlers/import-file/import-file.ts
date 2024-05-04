import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";

import * as serverlessConfiguration from "../../../serverless";

export const importFile: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const {
    queryStringParameters: { name },
  } = event;

  if (!name) {
    return formatJSONResponse._404("Required query parameter name is empty");
  }

  console.log(`importFile request with fileName: ${name}`);
  console.log(
    `importFile request user with Id: ${event.requestContext.authorizer?.userId}`,
  );

  const s3Client = new S3Client({
    // @ts-ignore
    region: serverlessConfiguration.provider.region,
  });

  const command = new PutObjectCommand({
    // @ts-ignore
    Bucket: serverlessConfiguration.custom.bucketName,
    Key: `upload/${name}`,
  });

  try {
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return formatJSONResponse._200({ uploadUrl });
  } catch (error) {
    console.error(error);

    return formatJSONResponse._500();
  }
};
