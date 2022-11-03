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
const order_1 = require("./../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const order_products_1 = require("../../models/order_products");
const orderProductsStore = new order_products_1.OrderProductsStore();
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
const orderStore = new order_1.OrderStore();
describe('OrderProducts Model - ', () => {
    it('should have a addOrderProduct method', () => {
        expect(orderProductsStore.addOrderProduct).toBeDefined();
    });
    it('add new info into OrderProducts table using addOrderProduct method', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { firstName: 'user-3', lastName: 'user-3', account: 'user3', password: 'user-3' };
        const userResult = yield userStore.create(user);
        const order = { userId: userResult.id, status: 0 };
        const orderResult = yield orderStore.addOrder(order);
        const product = { name: 'product-3', price: 1234, category: 1 };
        const productResult = yield productStore.create(product);
        const orderProduct = { productId: productResult.id, orderId: orderResult.id, quantity: 2 };
        const orderProductResult = yield orderProductsStore.addOrderProduct(orderProduct);
        expect(orderProductResult.id).toBeGreaterThan(0);
    }));
});
