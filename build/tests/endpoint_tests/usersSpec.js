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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
const adminUser = { firstName: 'A', lastName: 'B', account: 'admin', password: 'admin123' };
let token = jsonwebtoken_1.default.sign({ user: adminUser.firstName }, process.env.TOKEN_SECRET);
describe('User Handler - Test endpoint responses - ', () => {
    it('new user added', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { firstName: 'user-4', lastName: 'user-4', account: 'user4', password: 'usser4' };
        const result = yield request.post('/users').set("Authorization", token).send(user);
        expect(result.status).toEqual(200);
    }));
    it('get all users with api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get('/users').set("Authorization", token);
        expect(result.status).toEqual(200);
    }));
    it('show selected users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get('/users/4').set("Authorization", token);
        expect(result.status).toEqual(200);
    }));
});
