import app from '../../server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { OrderProducts, OrderProductsStore } from '../../models/order_products';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const request = supertest(app);
const adminUser: User = {firstName: 'A', lastName: 'B', account: 'admin', password: 'admin123'};
const token = jwt.sign({user: adminUser.firstName}, process.env.TOKEN_SECRET as string);


describe('OrderProducts Handler - Test endpoint responses - ', () => {

    it('add new OrderProduct into OrderProducts table using a RESTful route', async () => {
        const user: User = {firstName: 'user-6', lastName: 'user-6', account: 'user6', password: 'user6'};
        const userResult = await userStore.create(user);
        const order: Order = {userId: userResult.id as number, status: 0};
        const orderResult = await orderStore.addOrder(order);
        const product: Product = {name: 'product-6', price: 1234, category: 1};  
        const productResult = await productStore.create(product);
        const orderProduct: OrderProducts = {productId: productResult.id as number, orderId: orderResult.id as number, quantity: 2}

        const result = await request.post('/order-products').set("Authorization", token).send(orderProduct);
        expect(result.status).toEqual(200);
    });
});