"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../../models/user");
const store = new user_1.UserStore();
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
    it('create user using create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { firstName: 'user-1', lastName: 'user-1', account: 'user1', password: 'user1' };
        const result = yield store.create(user);
        expect(result.account).toEqual('user1');
    }));
    it('should return all user using index method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        const haveUser = result.length > 0;
        expect(haveUser).toBeTrue();
    }));
    it('should return the correct user using show method', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 1;
        const result = yield store.show(id);
        expect(result.id).toEqual(1);
    }));
});
