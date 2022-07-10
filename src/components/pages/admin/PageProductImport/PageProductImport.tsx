import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import API_PATHS from "constants/apiPaths";
import ProductsTable from "components/pages/admin/PageProductImport/components/ProductsTable";
import CSVFileImport from "components/pages/admin/PageProductImport/components/CSVFileImport";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

export default function PageProductImport() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Box display="flex" alignItems="center">
        <CSVFileImport
          url={`${API_PATHS.import}/import`}
          title="Import Products CSV"
        />
        <Button
          size="small"
          color="primary"
          variant="contained"
          component={Link}
          to={"/admin/product-form/"}
        >
          create product
        </Button>
      </Box>
      <ProductsTable />
    </div>
  );
}
