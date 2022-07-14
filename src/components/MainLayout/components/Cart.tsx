import Badge from "@material-ui/core/Badge";
import CartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import React, { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateFromApi } from "store/cartSlice";
import { Link } from 'react-router-dom';
import API_PATHS from "../../../constants/apiPaths";

export default function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(
        `${API_PATHS.cart}/profile/cart`,
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem('authorization_token')}`
          }
        }
    ).then(({ data: { data: { cart } } }) => {
      dispatch(updateFromApi(cart))
    });
  }, [dispatch]);
  const cartItems = useSelector(selectCartItems);
  const badgeContent = cartItems.length || undefined;

  return (
    <IconButton
      aria-label="show 4 new mails"
      color="inherit"
      component={Link}
      to="/cart"
    >
      <Badge badgeContent={badgeContent} color="secondary" overlap="rectangular">
        <CartIcon/>
      </Badge>
    </IconButton>
  );
}
