const API_PATHS = {
  products:
    "https://bceuqnc4ec.execute-api.eu-west-1.amazonaws.com/dev/products",
  getProduct: (id?: string) =>
    `https://bceuqnc4ec.execute-api.eu-west-1.amazonaws.com/dev/products/${id}`,
  product: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  import: "https://3ay0nb5f8f.execute-api.eu-west-1.amazonaws.com/dev",
  bff: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
};

export default API_PATHS;
