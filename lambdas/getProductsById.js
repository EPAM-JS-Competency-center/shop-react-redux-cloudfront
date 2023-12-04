const products = require("./mockProducts");

exports.handler = async (event) => {
  const productId = event.pathParameters?.productId;
  const product = products.find(poduct => poduct.id === productId);

  if (!product) {
      return { statusCode: 404, body: 'Product not found' };
  }

  return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(product),
  };
};