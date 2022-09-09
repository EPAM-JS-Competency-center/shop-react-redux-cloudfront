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
import axios from 'axios';
import API_PATHS from "constants/apiPaths";
import {getData} from "./ProductService";

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
    const config = {
        headers: {
            Authorization: ''
        }
    }

    useEffect(() => {
        getProducts().then(r => console.log(r));
        // getData().then(r => console.log(r));
    }, [])

    const getProducts = async () => {
        const ps = await getData().then((data: any) => data);
        setProducts(ps);
    }

    /*const getData = async () => {
        debugger;
        const ps = await getProduct();
        config.headers.Authorization += localStorage.getItem('Basic');
        for (let product of ps) {
            const image = await getImage(product.title).then(image => image);
            console.log(image);
            product.image = image;
        }

        setProducts(ps);
    }

    const getProduct = async () => {
        debugger
        config.headers.Authorization += localStorage.getItem('token');
        return await axios.get(`${API_PATHS.product}/products`, config)
            .then(res => res.data);
    }*/

    /*const getImage = async (image: string) => {
        return await axios.get(`${API_PATHS.import}/${image}`, config)
            .then((res) => res.data.url)
            .catch((error) => console.log(error));
    }*/

    return (
        <Grid container spacing={4}>
            {
                products.map((product: Product, index: number) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>

                            <CardMedia
                                className={classes.cardMedia}
                                image={product.image}
                                title="Image title"
                            />


                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
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
                ))
            }
        </Grid>
    );
}
