import pool from '../../pool';
import { User } from './user-model';
import { tables } from './util/tables';
import toCamelCase from './util/to-camel-case';

/* TODO IMPLEMENT POSTGRES ABSTRACT CLASS FOR BASIC METHODS */

class Outgoings {
  private static table = tables.outgoings;

  static async findAll() {
    const { rows } = await pool.query(`SELECT * FROM ${this.table};`);
    const parsedRows = toCamelCase(rows);
    return parsedRows;
  }

  static async findExistingItemByName(item: string) {
    const { rows } = await pool.query(
      `SELECT * FROM ${this.table} WHERE item = $1;`,
      [item]
    );
    console.log(rows);
    return toCamelCase(rows)[0];
  }

  static async insertNewRecord(
    item: string,
    currency: string,
    userId: number,
    tag: string,
    cost: number
  ) {
    const { rows } = await pool.query(
      `INSERT INTO ${this.table} (item, currency, user_id, tag, cost)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *;`,
      [item, currency, userId, tag, cost]
    );

    return toCamelCase(rows)[0];
  }

  static async deleteOutgoingRecords(item: string, userId: number) {
    const { rows } = await pool.query(
      `DELETE FROM ${this.table} WHERE user_id = $1 AND item = $2 RETURNING *;`,
      [userId, item]
    );
    return toCamelCase(rows)[0];
  }

  static async updateExistingRecord(
    email: string,
    item: string,
    currency: string,
    tag: string,
    cost: number
  ) {
    const { id } = await User.findByEmail(email);
    console.log(id);

    const { rows } = await pool.query(
      `UPDATE ${this.table} 
        SET currency = $1,
        tag = $2,
        cost = $3,
        updated_at = current_timestamp
        WHERE user_id = $4 AND item = $5
        RETURNING *;`,
      [currency, tag, cost, id, item]
    );
    return toCamelCase(rows)[0];
  }

  static async getRecordsByUser(email: string, page: number) {
    const { id } = await User.findByEmail(email);
    console.log(id);
    const offset = (page - 1) * 10;

    const { rows } = await pool.query(
      `SELECT * FROM ${this.table} WHERE user_id = $1 LIMIT 10 OFFSET ${offset};`,
      [id]
    );
    // console.log(rows)
    return toCamelCase(rows);
  }

  static async countRecordsByUser(userId: number) {
    const { rows } = await pool.query(
      `	SELECT tag, COUNT(*) AS count
        FROM fixed_outgoings_monthly  
        WHERE user_id = $1
      	GROUP BY tag
      	ORDER BY count DESC;

    `,
      [userId]
    );
    return toCamelCase(rows);
  }

  static async sumRecordsByUser(userId: number) {
    const { rows } = await pool.query(
      `	SELECT SUM(cost) AS total_outgoings        
	      FROM fixed_outgoings_monthly
        WHERE user_id = $1;
      `,
      [userId]
    );
    return toCamelCase(rows)[0];
  }
}

export { Outgoings };
