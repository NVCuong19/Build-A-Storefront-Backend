import supertest from 'supertest';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

const adminUser: User = {firstName: 'A', lastName: 'B', account: 'admin', password: 'admin123'};
let token = jwt.sign({user: adminUser.firstName}, process.env.TOKEN_SECRET as string);

describe('Product Handler - Test endpoint responses -', () => {
    it('new product added', async () => {
        const product: Product = {name: 'product-4', price: 100, category: 1};
        const result = await request.post('/products').set("Authorization", token).send(product);
        expect(result.status).toEqual(200);
    });

    it('get all products with api endpoint', async () => {
        const result = await request.get('/products');
        expect(result.status).toEqual(200);
    });

    it('show selected product', async () => {
        const result = await request.get('/products/4');
        expect(result.status).toEqual(200);
    });

});