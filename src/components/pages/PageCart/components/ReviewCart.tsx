import Typography from "@mui/material/Typography";
import CartItems from "~/components/CartItems/CartItems";
import { useSelector } from "react-redux";

export default function ReviewCart() {
  const cartItems = useSelector((state: any) => state.cart.data);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <CartItems items={cartItems} isEditable />
    </>
  );
}
