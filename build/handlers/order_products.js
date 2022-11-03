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
const order_products_1 = require("../models/order_products");
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
const store = new order_products_1.OrderProductsStore();
const addOrderProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield store.addOrderProduct(_req.body);
        res.status(200).json(newOrder);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const orderProductsRoutes = (app) => {
    app.post('/order-products', verifyAuthToken_1.default, addOrderProduct);
};
exports.default = orderProductsRoutes;
