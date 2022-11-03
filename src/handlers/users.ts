import express, {Request, Response} from 'express';
import { User,  UserStore} from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    try {
        const userList = await store.index();
        res.status(200).json(userList);
    } catch (err) {
        res.status(400).json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    try {
        const user = await store.show(Number(_req.params.id));
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const create = async (_req: Request, res: Response) => {
    try {
        const newUser = await store.create(_req.body);
        const token = jwt.sign({user: newUser.firstName}, process.env.TOKEN_SECRET as string);
        res.status(200).json(token);
    } catch (err) {
        res.status(400).json(err);
    }
};

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
};

export default userRoutes;