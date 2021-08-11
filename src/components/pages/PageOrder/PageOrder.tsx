import React, {useEffect, useState} from 'react';
import {OrderItem} from "models/Order";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import PaperLayout from "components/PaperLayout/PaperLayout";
import Typography from "@material-ui/core/Typography";
import API_PATHS from "constants/apiPaths";
import {CartItem} from "models/CartItem";
import {Product} from "models/Product";
import ReviewOrder from "components/pages/PageCart/components/ReviewOrder";
import {ORDER_STATUS, ORDER_STATUS_FLOW} from "constants/order";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import {Field, Formik, FormikProps, FormikValues} from "formik";
import Grid from "@material-ui/core/Grid";
import {TextField} from "formik-material-ui";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const Form = (props: FormikProps<FormikValues>) => {
  const {
    values,
    // touched,
    // errors,
    dirty,
    isSubmitting,
    isValid,
    // handleChange,
    // handleBlur,
    handleSubmit,
    // handleReset,
    // setFieldValue,
    // isEditMode,
    // onCancel,
    // isButtonContact,
    // setTouched,
    // isButtonAddAndRedirect,
    // setShouldRedirect,
    // submitForm,
    // onGetCitizen,
    // shouldConfirmLeave,
  } = props;
  let helperText = '';
  if ((values.status) === ORDER_STATUS.approved) {
    helperText = 'Setting status to APPROVED will decrease products count from stock!!!';
  }
  // TODO add check if status was changed from approved to cancelled
  //  to increase product count back again
  // if ((values.status) === ORDER_STATUS.cancelled) {
  //   helperText = 'Setting status to CANCELLED will increase products count in stock!!!';
  // }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="status"
            label="Status"
            select
            fullWidth
            helperText={helperText}
          >
            {ORDER_STATUS_FLOW.map((status,index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Field>
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
        <Grid item container xs={12} justify="space-between">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!dirty || isSubmitting || !isValid}
          >
            Change status
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default function PageOrder() {
  const {id} = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onChangeStatus = (values: FormikValues) => {
    return axios.put(`${API_PATHS.order}/order/${order.id}/status`, values)
      .then(({data}) => setOrder(data));
  };

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    const promises: any[] = [
      axios.get(`${API_PATHS.product}/product`),
      axios.get(`${API_PATHS.order}/order/${id}`)
    ];
    Promise.all(promises)
      .then(([{data: products}, {data: order}]) => {
        const cartItems: CartItem[] = order.items.map((i: OrderItem) => ({
          product: products.find((p: Product) => p.id === i.productId),
          count: i.count
        }));
        setOrder(order);
        setCartItems(cartItems);
        setIsLoading(false);
      });
  }, [id])

  if (isLoading) return <p>loading...</p>;

  const statusHistory = order.statusHistory || [];

  const lastStatusItem = statusHistory[statusHistory.length - 1];

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        Manage order
      </Typography>
      <ReviewOrder address={order.address} items={cartItems}/>
      <Typography variant="h6">
        Status:
      </Typography>
      <Typography variant="h6" color="primary">
        {lastStatusItem?.status.toUpperCase()}
      </Typography>
      <Typography variant="h6">
        Change status:
      </Typography>
      <Formik
        initialValues={{status: lastStatusItem.status, comment: ''}}
        enableReinitialize
        onSubmit={onChangeStatus}
      >
        {(props: FormikProps<FormikValues>) => <Form {...props} />}
      </Formik>
      <Typography variant="h6">
        Status history:
      </Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">Date and Time</TableCell>
              <TableCell align="right">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statusHistory.map((statusHistoryItem: any) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {statusHistoryItem.status.toUpperCase()}
                </TableCell>
                <TableCell align="right">{(new Date(statusHistoryItem.timestamp)).toString()}</TableCell>
                <TableCell align="right">{statusHistoryItem.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperLayout>
  );
}