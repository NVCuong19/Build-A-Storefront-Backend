import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (_req: Request, res: Response, next: NextFunction) => {
    try {
        jwt.verify(_req.headers.authorization as string, process.env.TOKEN_SECRET as string);
        next();
    } catch(error) {
        res.status(401).json(`Invalid Token.`)
        return;
    }
};

export default verifyAuthToken;
