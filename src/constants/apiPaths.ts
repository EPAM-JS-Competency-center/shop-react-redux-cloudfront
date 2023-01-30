const ROUTE_PREFIX = "https://";
const AWS_HASH_ROUTE = "hfmekszp10";
const FILE_EXPORT_HASH = "w2iyc1r5ma";
const NEST_ROUTE = "36jk2b2jod";
const COMMON_ROUTE = ".execute-api.eu-west-1.amazonaws.com/dev";

const API_PATHS = {
  fileImport: `${ROUTE_PREFIX}${FILE_EXPORT_HASH}${COMMON_ROUTE}`,
  base: `${ROUTE_PREFIX}${AWS_HASH_ROUTE}${COMMON_ROUTE}`,
  nestRoute: `${ROUTE_PREFIX}${NEST_ROUTE}${COMMON_ROUTE}`,
  order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  import: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  bff: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
};

export default API_PATHS;
