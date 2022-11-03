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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    constructor() {
        this.table = "users";
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
                throw new Error(`Can't get user list ${err}`);
            }
        });
    }
    show(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM ${this.table} WHERE id=${userId}`;
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`The required User Information could not be obtained: ${err}`);
            }
        });
    }
    create(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, account, password } = _user;
            try {
                const sql = `INSERT INTO ${this.table}(firstName, lastName, account, password) VALUES($1, $2, $3, $4) RETURNING *`;
                //@ts-ignore
                const hash = bcrypt_1.default.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [firstName, lastName, account, hash]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error: Unable to add new user: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
