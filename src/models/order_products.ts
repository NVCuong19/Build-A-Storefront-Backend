import Client from "../database";
import {QueryResult} from "pg";

export type OrderProducts = {
    id?: Number;
    orderId: Number;
    productId: Number;
    quantity: Number;
}

export class OrderProductsStore {
    table: string = "order_products";

    async addOrderProduct(orderProduct: OrderProducts):Promise<OrderProducts> {
        const {orderId, productId, quantity} = orderProduct;
        try {
            const sql = `INSERT INTO ${this.table}(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
            //@ts-ignore
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql, [orderId, productId, quantity]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Error: Unable to add new OrderProduct: ${err}`);
        }
    }

}