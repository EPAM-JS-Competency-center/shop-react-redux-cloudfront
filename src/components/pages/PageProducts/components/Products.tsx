import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Product} from "models/Product";
import {formatAsPrice} from "utils/utils";
import AddProductToCart from "components/AddProductToCart/AddProductToCart";
// import axios from 'axios';
// import API_PATHS from "constants/apiPaths";
import productList from "./productList.json";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // axios.get(`${API_PATHS.bff}/product/available/`)
    //   .then(res => setProducts(res.data));
    setProducts(productList);
  }, [])

  return (
    <Grid container spacing={4}>
      {products.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`https://source.unsplash.com/random?sig=${index}`}
              title="Product Title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h4" component="h3">
                {product.title}
              </Typography>
              <Typography>
                {formatAsPrice(product.price)}
              </Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product}/>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
