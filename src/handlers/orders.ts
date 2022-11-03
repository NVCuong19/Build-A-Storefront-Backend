import express, {Request, Response} from 'express';
import { Order,  OrderStore} from '../models/order';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const store = new OrderStore();

const show = async (_req: Request, res: Response) => {
    try {
        const order = await store.show(Number(_req.params.order_id));
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

const addOrder = async (_req: Request, res: Response) => {
    try {
        const newOrder = await store.addOrder(_req.body);
        res.status(200).json(newOrder);
    } catch (err) {
        res.status(400).json(err);
    }
};

const orderRoutes = (app: express.Application) => {
    app.get('/orders/:order_id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, addOrder);
};

export default orderRoutes;