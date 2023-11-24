'use strict';
// AWS
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// CSV
const csv = require('csv-parser');

require('dotenv').config();

module.exports.importProductsFile  = async (event) => {
  const body = JSON.parse(event.body);
  const fileName = body.name; 
  
    const params = {
      Bucket: process.env.BUCKET_UPLOAD_NAME,
      Key: `uploaded/${fileName}`,
      Expires: 60, 
    };

    const signedUrl = s3.getSignedUrl('putObject', params);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: signedUrl }),
    };
  };

  module.exports.importFileParser = async (event) => {
    for (const record of event.Records) {
      const s3Stream = s3.getObject({
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key,
      }).createReadStream();
  
      s3Stream.pipe(csv())
        .on('data', (data) => console.log(data))
        .on('end', () => console.log('CSV processing completed'));
    }
  
    return { statusCode: 200 };
  };