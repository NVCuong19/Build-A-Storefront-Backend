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
const orderStore = new order_1.OrderStore();
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
const orderProductsStore = new order_products_1.OrderProductsStore();
let selectedOrderId = 0;
describe('Order Model - ', () => {
    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });
    it('should have a addOrder method', () => {
        expect(orderStore.addOrder).toBeDefined();
    });
    it('create a new order using addOrder method', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { firstName: 'user-2', lastName: 'user-2', account: 'user2', password: 'user2' };
        const userResult = yield userStore.create(user);
        const order = { userId: userResult.id, status: 0 };
        const orderResult = yield orderStore.addOrder(order);
        const product = { name: 'product-2', price: 1234, category: 1 };
        const productResult = yield productStore.create(product);
        const orderProduct = { productId: productResult.id, orderId: orderResult.id, quantity: 2 };
        const orderProductResult = yield orderProductsStore.addOrderProduct(orderProduct);
        selectedOrderId = orderResult.id;
        expect(orderResult.id).toBeGreaterThan(0);
    }));
    it('should return the correct order using show method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderStore.show(selectedOrderId);
        expect(result[0].order_id).toBeGreaterThan(0);
    }));
});
