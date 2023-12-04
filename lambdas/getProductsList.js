const products = require("./mockProducts");

exports.handler = async (event, context, callback) => {
    const respose = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products),
    };
    callback(null, respose);
    
};
