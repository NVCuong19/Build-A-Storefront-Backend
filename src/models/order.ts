import Client from "../database";
import {QueryResult} from "pg";

export type Order = {
    id?: Number;
    userId: Number;
    status: Number;
}

export class OrderStore {
    ordersTable: string = "orders";


    async show(_orderId: number):Promise<any[]> {
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
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`Current Order could not be obtained: ${err}`);
        }
    }

    async addOrder(_order: Order):Promise<Order> {
        const {userId, status} = _order;
        try {
            const sql = `INSERT INTO ${this.ordersTable}(user_id, status) VALUES($1, $2) RETURNING *`;
            //@ts-ignore
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql, [userId, status]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Error: Unable to add new order: ${err}`);
        }
    }

}