import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const PRODUCT = {
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        title: "ProductOne",
        description: "Short Product Description1",
        price: 24,
    };


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        // body: responseMessage
        body: JSON.stringify(PRODUCT)
    };

};

export default httpTrigger;
