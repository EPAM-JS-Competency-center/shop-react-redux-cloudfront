import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import API_PATHS from "constants/apiPaths";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {formatAsPrice} from "utils/utils";

export default function ProductsTable() {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    axios.get(`${API_PATHS.product}`)
      .then(res => setProducts(res.data));
  }, []);

  const onDelete = (id: string) => {
    axios.delete(`${API_PATHS.bff}/product/${id}`)
      .then(() => {
        axios.get(`${API_PATHS.bff}/product`)
          .then(res => setProducts(res.data));
        }
      );
  };


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
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.title}
              </TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align="right">{formatAsPrice(product.price)}</TableCell>
              <TableCell align="right">{product.count}</TableCell>
              <TableCell align="right">
                <Button size="small" color="primary" component={Link} to={`/admin/product-form/${product.id}`}>
                  Manage
                </Button>
                <Button size="small" color="secondary" onClick={() => onDelete(product.id)}>
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