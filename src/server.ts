import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';
import orderProductsRoutes from './handlers/order_products';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const {
  SERVER_PORT
} = process.env;

const app: express.Application = express();
const port: number = 3000;

const corsOptions = {
  origin: "http://someotherdomain.com",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!")
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);
orderProductsRoutes(app);

app.listen(SERVER_PORT, () => {
    console.log(`Example app listening on port ${SERVER_PORT}`);
});
  
export default app;
