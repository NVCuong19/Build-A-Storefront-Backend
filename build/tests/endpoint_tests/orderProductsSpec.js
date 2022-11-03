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
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
const orderStore = new order_1.OrderStore();
const request = (0, supertest_1.default)(server_1.default);
const adminUser = { firstName: 'A', lastName: 'B', account: 'admin', password: 'admin123' };
const token = jsonwebtoken_1.default.sign({ user: adminUser.firstName }, process.env.TOKEN_SECRET);
describe('OrderProducts Handler - Test endpoint responses - ', () => {
    it('add new OrderProduct into OrderProducts table using a RESTful route', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { firstName: 'user-6', lastName: 'user-6', account: 'user6', password: 'user6' };
        const userResult = yield userStore.create(user);
        const order = { userId: userResult.id, status: 0 };
        const orderResult = yield orderStore.addOrder(order);
        const product = { name: 'product-6', price: 1234, category: 1 };
        const productResult = yield productStore.create(product);
        const orderProduct = { productId: productResult.id, orderId: orderResult.id, quantity: 2 };
        const result = yield request.post('/order-products').set("Authorization", token).send(orderProduct);
        expect(result.status).toEqual(200);
    }));
});
