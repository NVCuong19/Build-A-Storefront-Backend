import Client from "../database";
import {QueryResult} from "pg";
import bcrypt from 'bcrypt';


export type User = {
    id?: Number;
    firstName: string;
    lastName: string;
    account: string;
    password: string;
}

export class UserStore {
    table: string = "users";
    async index(): Promise<User[]> {
        try {
            const sql = `SELECT * From ${this.table}`;
            //@ts-ignore
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`Can't get user list ${err}`);
        }
    }

    async show(userId: number):Promise<User> {
        try {
            const sql = `SELECT * FROM ${this.table} WHERE id=${userId}`;
            //@ts-ignore
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`The required User Information could not be obtained: ${err}`);
        }
    }

    async create(_user: User):Promise<User> {
        const {firstName, lastName, account, password} = _user;
        try {
            const sql = `INSERT INTO ${this.table}(firstName, lastName, account, password) VALUES($1, $2, $3, $4) RETURNING *`;
            //@ts-ignore
            const hash = bcrypt.hashSync(password+process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
            const conn = await Client.connect();
            const result: QueryResult = await conn.query(sql, [firstName, lastName, account, hash]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Error: Unable to add new user: ${err}`);
        }
    }

}