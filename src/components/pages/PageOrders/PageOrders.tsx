import Orders from "~/components/pages/PageOrders/components/Orders";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PageOrders() {
  return (
    <Box py={3}>
      <Typography variant="h6" gutterBottom>
        Manage orders
      </Typography>
      <Orders />
    </Box>
  );
}
