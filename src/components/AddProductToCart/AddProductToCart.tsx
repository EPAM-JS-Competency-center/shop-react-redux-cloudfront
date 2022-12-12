import Typography from "@mui/material/Typography";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/Cart/CartAction";
import { useState } from "react";

type AddProductToCartProps = {
  product;
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: any) =>
    state.cart.data.find((i) => i.product.id === product.id)
  );
  const [count, setCount] = useState(cartItem ? cartItem.count : 1);

  return (
    <>
      {cartItem ? (
        <>
          <IconButton
            onClick={() => {
              dispatch(removeFromCart(product));
              setCount(cartItem.count);
            }}
            size="large"
          >
            <Remove color={"secondary"} />
          </IconButton>
          <Typography align="center">{count}</Typography>
          <IconButton
            onClick={() => {
              dispatch(addToCart(product));
              setCount(cartItem.count);
            }}
            size="large"
          >
            <Add color={"secondary"} />
          </IconButton>
        </>
      ) : (
        <IconButton onClick={() => dispatch(addToCart(product))} size="large">
          <CartIcon color={"secondary"} />
        </IconButton>
      )}
    </>
  );
}
