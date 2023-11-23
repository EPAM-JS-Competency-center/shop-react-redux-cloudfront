require('dotenv').config();
const AWS = require ('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const { v4: uuid } = require('uuid');


exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const newID = uuid();
  const productParams = {
    TableName: process.env.PRODUCTS_TABLE_NAME,
    Item: {
      id: newID,
      price: data.price,
      title: data.title,
      description: data.description,
      urlImage: data.urlImage || ''
    },
  }
  const stockParams = {
    TableName: process.env.STOCKS_TABLE_NAME,
    Item: {
      productId: newID, 
      sku: data.sku || 'default_sku',
      stock: data.count || 0,
    },
  };

  const transactWriteParams = {
    TransactItems: [
      {
        Put: productParams,
      },
      {
        Put: stockParams,
      },
    ],
  };

  try {
    await dynamo.transactWrite(transactWriteParams).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `Product ${newID} created`,
        product: productParams.Item,
      })
    };
  } catch (error) {
    console.error("Transaction Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        error: error.message
      })
    };
  }
} 