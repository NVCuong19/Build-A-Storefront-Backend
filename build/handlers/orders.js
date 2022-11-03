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
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
const store = new order_1.OrderStore();
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(Number(_req.params.order_id));
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const addOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield store.addOrder(_req.body);
        res.status(200).json(newOrder);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const orderRoutes = (app) => {
    app.get('/orders/:order_id', verifyAuthToken_1.default, show);
    app.post('/orders', verifyAuthToken_1.default, addOrder);
};
exports.default = orderRoutes;
