import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { Order } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { OrderProducts, OrderProductsStore } from '../../models/order_products';
import app from '../../server';

const request = supertest(app);
const adminUser: User = {firstName: 'A', lastName: 'B', account: 'admin', password: 'admin123'};
const token = jwt.sign({user: adminUser.firstName}, process.env.TOKEN_SECRET as string);

const productStore = new ProductStore();
const userStore = new UserStore();
const orderProductsStore = new OrderProductsStore();


describe('Order Handler - Test endpoint responses - ', () => {
    it('add new order using a RESTful route', async () => {
        const user: User = {firstName: 'user-5', lastName: 'user-5', account: 'user5', password: 'user5'};
        const userResult = await userStore.create(user);
        const order: Order = {userId: userResult.id as number, status: 0};
        const orderResult = await request.post('/orders').set("Authorization", token).send(order);
        const product: Product = {name: 'product-5', price: 1234, category: 1};  
        const productResult = await productStore.create(product);
        const orderProduct: OrderProducts = {productId: productResult.id as number, orderId: orderResult.body.id as number, quantity: 2}
        const orderProductResult = await orderProductsStore.addOrderProduct(orderProduct);
        expect(orderResult.status).toEqual(200);
    });


});