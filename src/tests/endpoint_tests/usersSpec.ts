import supertest from 'supertest';
import {User} from '../../models/user';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

const adminUser: User = {firstName: 'A', lastName: 'B', account: 'admin', password: 'admin123'};
let token = jwt.sign({user: adminUser.firstName}, process.env.TOKEN_SECRET as string);

describe('User Handler - Test endpoint responses - ', () => {
    it('new user added', async () => {
        const user: User = {firstName: 'user-4', lastName: 'user-4', account: 'user4', password: 'usser4'};
        const result = await request.post('/users').set("Authorization", token).send(user);
        expect(result.status).toEqual(200);
    });

    it('get all users with api endpoint', async () => {
        const result = await request.get('/users').set("Authorization", token);
        expect(result.status).toEqual(200);
    });

    it('show selected users', async () => {
        const result = await request.get('/users/4').set("Authorization", token);
        expect(result.status).toEqual(200);
    });

});