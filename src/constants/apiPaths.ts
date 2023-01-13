const ROUTE_PREFIX = "https://";
const AWS_HASH_ROUTE = "zi0rwocv9a";
const COMMON_ROUTE = ".execute-api.eu-west-1.amazonaws.com/dev";

const API_PATHS = {
  base: `${ROUTE_PREFIX}${AWS_HASH_ROUTE}${COMMON_ROUTE}`,
  order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  import: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  bff: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
};

export default API_PATHS;
