import Client from "../database";
import {QueryResult} from "pg";

export type Product = {
    id?: Number;
    name: string;
    price: Number;
    category: Number;
}

export class ProductStore {
    table: string = "products";
    async index(): Promise<Product[]> {
        try {
            const sql = `SELECT * From ${this.table}`;
            //@ts-ignore
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            console.log(Client)
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async show(productId: number):Promise<Product> {
        try {
            const sql = `SELECT * FROM ${this.table} WHERE id=${productId}`;
            //@ts-ignore
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`The required product could not be obtained: ${err}`);
        }
    }

    async create(_product: Product):Promise<Product> {
        const {name, price, category} = _product;
        try {
            const sql = `INSERT INTO ${this.table}(name, price, category) VALUES($1, $2, $3) RETURNING *`;
            //@ts-ignore
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql, [name, price, category]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Error: Unable to add new product: ${err}`);
        }
    }


}