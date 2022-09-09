import axios from "axios";
import API_PATHS from "../../../../constants/apiPaths";
import {Product} from "models/Product";

const config = {
    headers: {
        Authorization: ''
    }
}

export const getData = async (): Promise<Product[]> => {
    const products = await getProduct().then(data => data);
    console.log(products);
    // config.headers.Authorization += localStorage.getItem('Basic');
    config.headers.Authorization = `${localStorage.getItem('Basic')}`;
    for (let product of products) {
        const image = await getImage(product.title).then(image => image);
        console.log(image);
        product.image = image;
    }

    return products;
}

const getProduct = async (): Promise<Product[]> => {
    debugger;
    config.headers.Authorization += localStorage.getItem('token');
    return await axios.get(`${API_PATHS.product}/products`, config)
        .then(res => res.data);
}

const getImage = async (image: string) => {
    return await axios.get(`${API_PATHS.import}/${image}`, config)
        .then((res) => res.data.url)
        .catch((error) => console.log(error));
}