import Products from "~/components/pages/PageProducts/components/Products";
import Box from "@mui/material/Box";

export default function PageProducts() {
  return (
    <>
      <h1>Page Is Deployed on CloudFront with API</h1>
      <Box py={3}>
        <Products />
      </Box>
    </>
  );
}
