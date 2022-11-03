import express, {Request, Response} from 'express';
import { OrderProducts,  OrderProductsStore} from '../models/order_products';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const store = new OrderProductsStore();

const addOrderProduct = async (_req: Request, res: Response) => {
    try {
        const newOrder = await store.addOrderProduct(_req.body);
        res.status(200).json(newOrder);
    } catch (err) {
        res.status(400).json(err);
    }
};

const orderProductsRoutes = (app: express.Application) => {
    app.post('/order-products', verifyAuthToken, addOrderProduct);
};

export default orderProductsRoutes;