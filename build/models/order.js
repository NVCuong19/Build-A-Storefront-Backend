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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    constructor() {
        this.ordersTable = "orders";
    }
    show(_orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `
                SELECT order_id, users.id as user_id, users.firstName as username, product_id, products.name as product, quantity
                FROM orders 
                INNER JOIN order_products ON orders.id = order_products.order_id 
                INNER JOIN users ON users.id = orders.user_id 
                INNER JOIN products ON order_products.product_id = products.id 
                WHERE orders.id = ${_orderId}
            `;
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Current Order could not be obtained: ${err}`);
            }
        });
    }
    addOrder(_order) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, status } = _order;
            try {
                const sql = `INSERT INTO ${this.ordersTable}(user_id, status) VALUES($1, $2) RETURNING *`;
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [userId, status]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error: Unable to add new order: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
