import Products from "~/components/pages/PageProducts/components/Products";
import Box from "@mui/material/Box";

export default function PageProducts() {
  return (
    <Box py={3}>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        My Test Change
      </h1>
      <Products />
    </Box>
  );
}
