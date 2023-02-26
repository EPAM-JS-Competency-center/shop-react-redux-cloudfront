import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Formik, Form, Field } from "formik";
import TextField from "~/components/Form/TextField";
import { Address, AddressSchema } from "~/models/Order";

type AddressFormProps = {
  initialValues: Address;
  onBack: () => void;
  onSubmit: (values: Address) => void;
};

const AddressForm = ({ initialValues, onBack, onSubmit }: AddressFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddressSchema}
      validateOnMount={true}
      onSubmit={onSubmit}
    >
      <Form autoComplete="off">
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              name="firstName"
              label="First Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              name="address"
              label="Shipping address"
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              name="comment"
              label="Comment"
              fullWidth
              multiline
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3, ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default AddressForm;
