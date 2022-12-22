import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReviewCart from "~/components/pages/PageCart/components/ReviewCart";
import ReviewOrder from "~/components/pages/PageCart/components/ReviewOrder";
import { useDispatch, useSelector } from "react-redux";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import { Formik, Form, FormikProps, FormikValues, Field } from "formik";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { API_PATHS } from "~/constants/apiPaths";
import { AddressSchema, OrderSchema } from "~/models/Order";
import Box from "@mui/material/Box";
import TextField from "~/components/Form/TextField";
import { clearCart } from "../../../store/Cart/CartAction";

const steps = ["Review your cart", "Shipping address", "Review your order"];

const initialAddressValues = AddressSchema.cast({});

const CartIsEmpty = () => (
  <Typography variant="h6" gutterBottom>
    The cart is empty. Didn&apos;t you like anything in our shop?
  </Typography>
);

const Success = () => (
  <React.Fragment>
    <Typography variant="h5" gutterBottom>
      Thank you for your order.
    </Typography>
    <Typography variant="subtitle1">
      Your order is placed. Our manager will call you soon to clarify the
      details.
    </Typography>
  </React.Fragment>
);

const renderForm = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Shipping address
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Field
          component={TextField}
          name="lastName"
          label="Last Name"
          fullWidth
          autoComplete="off"
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          component={TextField}
          name="firstName"
          label="First Name"
          fullWidth
          autoComplete="off"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          name="address"
          label="Shipping address"
          fullWidth
          autoComplete="off"
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          name="comment"
          label="Comment"
          fullWidth
          autoComplete="off"
          multiline
        />
      </Grid>
    </Grid>
  </>
);

export default function PageCart() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const cartItems = useSelector((state: any) => state.cart.data);
  const isCartEmpty = !cartItems.length;
  const [address, setAddress] = useState<FormikValues>(initialAddressValues);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      const formattedValues = OrderSchema.cast({
        items: cartItems.map((i) => ({
          productId: i.product.id,
          count: i.count,
        })),
        address,
      });
      axios.put(`${API_PATHS.order}/order`, formattedValues).then(() => {
        dispatch(clearCart());
        setActiveStep(activeStep + 1);
      });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper
        activeStep={activeStep}
        sx={{ padding: (theme) => theme.spacing(3, 0, 5) }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        <Formik
          enableReinitialize={false}
          initialValues={initialAddressValues}
          validationSchema={AddressSchema}
          validateOnMount
          onSubmit={() => undefined}
        >
          {(props: FormikProps<FormikValues>) => {
            const { values, isValid } = props;
            setAddress(values);
            setIsFormValid(isValid);
            return (
              <Form>
                {isCartEmpty && activeStep === 0 && <CartIsEmpty />}
                {activeStep === 0 && !isCartEmpty && <ReviewCart />}
                {activeStep === 1 && renderForm()}
                {activeStep === 2 && (
                  <ReviewOrder address={address} items={cartItems} />
                )}
                {activeStep === 3 && <Success />}
              </Form>
            );
          }}
        </Formik>

        {activeStep <= 2 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            {!isCartEmpty && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
                disabled={activeStep === 1 && !isFormValid}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            )}
          </Box>
        )}
      </React.Fragment>
    </PaperLayout>
  );
}
