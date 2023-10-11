import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CartItems from "~/components/CartItems/CartItems";
import { FormikValues } from "formik";
import { CartItem } from "~/models/CartItem";

type ReviewOrderProps = {
  address: FormikValues;
  items: CartItem[];
};

export default function ReviewOrder({ address, items }: ReviewOrderProps) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <CartItems items={items} isEditable={false} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {address.firstName} {address.lastName}
          </Typography>
          <Typography gutterBottom>{address.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Comment
          </Typography>
          <Typography gutterBottom>{address.comment}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
