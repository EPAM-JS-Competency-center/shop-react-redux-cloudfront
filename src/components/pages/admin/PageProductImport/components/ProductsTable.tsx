import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { formatAsPrice } from "~/utils/utils";
import { useSelector } from "react-redux";
import { deleteProduct } from "~/store/Products/ProductsAction";
import { useDispatch } from "react-redux";
import { getProducts } from "~/store/Products/ProductsAction";
import { useEffect } from "react";

export default function ProductsTable() {
  const dispatch = useDispatch();
  const { data = [] } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(getProducts(null)); // task 3 related
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.title}
              </TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align="right">
                {formatAsPrice(product.price)}
              </TableCell>
              <TableCell align="right">{product.count}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/admin/product-form/${product.id}`}
                >
                  Manage
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => {
                    if (product.id) {
                      dispatch(deleteProduct(product.id));
                    }
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
