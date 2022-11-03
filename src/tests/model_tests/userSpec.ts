import { User, UserStore } from './../../models/user';

const store = new UserStore();

describe('User Model - ', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create user using create method', async () => {
        const user: User = {firstName: 'user-1', lastName: 'user-1', account: 'user1', password: 'user1'};
        const result: User = await store.create(user);
        expect(result.account).toEqual('user1');
    });

    it('should return all user using index method', async () => {
        const result: User[] = await store.index();
        const haveUser: Boolean = result.length > 0;
        expect(haveUser).toBeTrue();
    });

    it('should return the correct user using show method', async () => {
        const id = 1;
        const result: User = await store.show(id);
        expect(result.id).toEqual(1);
    });

});