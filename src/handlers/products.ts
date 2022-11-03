import express, {Request, Response} from 'express';
import { Product,  ProductStore} from '../models/product';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const productList = await store.index();
        res.status(200).json(productList);
    } catch (err) {
        res.status(400).json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    try {
        const product = await store.show(Number(_req.params.id));
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};

const create = async (_req: Request, res: Response) => {
    try {
        const newProduct = await store.create(_req.body);
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(400).json(err);
    }
};

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
};

export default productRoutes;