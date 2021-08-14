import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReviewCart from 'components/pages/PageCart/components/ReviewCart';
import ReviewOrder from 'components/pages/PageCart/components/ReviewOrder';
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems, clearCart} from "store/cartSlice";
import PaperLayout from "components/PaperLayout/PaperLayout";
import {Formik, Form, FormikProps, FormikValues, FastField} from "formik";
import Grid from "@material-ui/core/Grid";
import {TextField} from 'formik-material-ui';
import axios from "axios";
import API_PATHS from "constants/apiPaths";
import {AddressSchema, OrderSchema} from "models/Order";

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Review your cart', 'Shipping address', 'Review your order'];

const initialAddressValues: any = AddressSchema.cast({});

const CartIsEmpty = () => (
  <Typography variant="h6" gutterBottom>
    The cart is empty. Didn't you like anything in our shop?
  </Typography>
);

const Success = () => (
  <React.Fragment>
    <Typography variant="h5" gutterBottom>
      Thank you for your order.
    </Typography>
    <Typography variant="subtitle1">
      Your order is placed. Our manager will call you soon to clarify the details.
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
        <FastField
          component={TextField}
          name="lastName"
          label="Last Name"
          fullWidth
          autoComplete="off"
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FastField
          component={TextField}
          name="firstName"
          label="First Name"
          fullWidth
          autoComplete="off"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FastField
          component={TextField}
          name="address"
          label="Shipping address"
          fullWidth
          autoComplete="off"
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <FastField
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
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const cartItems = useSelector(selectCartItems);
  const isCartEmpty = !cartItems.length;
  const [address, setAddress] = useState<FormikValues>(initialAddressValues);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      const formattedValues = OrderSchema.cast({
        items: cartItems.map(i => ({productId: i.product.id, count: i.count})),
        address
      });
      axios.put(`${API_PATHS.order}/order`, formattedValues)
        .then(() => {
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
      <Stepper activeStep={activeStep} className={classes.stepper}>
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
          isInitialValid={false}
          onSubmit={() => undefined}
        >
          {(props: FormikProps<FormikValues>) => {
            const {values, isValid} = props;
            setAddress(values);
            setIsFormValid(isValid);
            return (
              <Form>
                {isCartEmpty && activeStep === 0 && <CartIsEmpty/>}
                {activeStep === 0 && !isCartEmpty && <ReviewCart/>}
                {activeStep === 1 && renderForm()}
                {activeStep === 2 && <ReviewOrder address={address} items={cartItems}/>}
                {activeStep === 3 && <Success/>}
              </Form>
            )
          }}
        </Formik>

        {activeStep <= 2 && <div className={classes.buttons}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} className={classes.button}>
              Back
            </Button>
          )}
          {!isCartEmpty && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
              disabled={activeStep === 1 && !isFormValid}
            >
              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
            </Button>)}
        </div>}
      </React.Fragment>
    </PaperLayout>
  );
}