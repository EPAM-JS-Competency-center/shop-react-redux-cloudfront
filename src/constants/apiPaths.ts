console.log(import.meta.env);
const API_PATHS = {
  products: `${import.meta.env.VITE_API_URL}/products`,
  order: `${import.meta.env}`,
  import: `${import.meta.env}`,
  bff: `${import.meta.env}`,
  cart: `${import.meta.env}`,
};

export default API_PATHS;
