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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    constructor() {
        this.table = "products";
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * From ${this.table}`;
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                console.log(database_1.default);
                throw new Error(`Cannot get products ${err}`);
            }
        });
    }
    show(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM ${this.table} WHERE id=${productId}`;
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`The required product could not be obtained: ${err}`);
            }
        });
    }
    create(_product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, category } = _product;
            try {
                const sql = `INSERT INTO ${this.table}(name, price, category) VALUES($1, $2, $3) RETURNING *`;
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [name, price, category]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error: Unable to add new product: ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
