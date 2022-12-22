import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { AvailableProduct, AvailableProductSchema } from "~/models/Product";
import { Formik, Field, FormikProps, Form } from "formik";
import TextField from "~/components/Form/TextField";
import { useNavigate, useParams } from "react-router-dom";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../store/Products/ProductsAction";
import { useSelector } from "react-redux";

const initialValues: AvailableProduct = AvailableProductSchema.cast({});

export default function PageProductForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const data = useSelector((state: any) =>
    state.products.data.find((i) => i.id === id)
  );
  const isLoading = false;

  const onSubmit = (values: AvailableProduct) => {
    const formattedValues = AvailableProductSchema.cast(values);
    const productToSave = id
      ? {
          ...formattedValues,
          id,
        }
      : formattedValues;
    dispatch(addProduct(productToSave));
    navigate("/admin/products");
  };

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center" mb={2}>
        {id ? "Edit product" : "Create new product"}
      </Typography>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Formik
          initialValues={data ?? initialValues}
          validationSchema={AvailableProductSchema}
          onSubmit={onSubmit}
        >
          {({ dirty, isSubmitting }: FormikProps<AvailableProduct>) => (
            <Form autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="title"
                    label="Title"
                    fullWidth
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="description"
                    label="Description"
                    fullWidth
                    autoComplete="off"
                    multiline
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Field
                    component={TextField}
                    name="price"
                    label="Price ($)"
                    fullWidth
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Field
                    component={TextField}
                    name="count"
                    label="Count"
                    fullWidth
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid item container xs={12} justifyContent="space-between">
                  <Button
                    color="primary"
                    onClick={() => navigate("/admin/products")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!dirty || isSubmitting}
                  >
                    Save Product
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </PaperLayout>
  );
}
