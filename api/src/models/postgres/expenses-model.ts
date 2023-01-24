import { UserProps } from '../../common/Types/types-interfaces';
import pool from '../../pool';
import { tables } from './util/tables';
import toCamelCase from './util/to-camel-case';

class Expenses {
  private static table = tables.expenses;

  static async findAll(userId: number, page: number) {
    const offset = (page - 1) * 10;
    console.log(offset);
    const { rows } = await pool.query(
      `SELECT * FROM ${this.table} LIMIT 10 OFFSET ${offset};`
    );
    const parsedRows = toCamelCase(rows);
    return parsedRows;
  }
  static async findAllByUserId(userId: number, page: number) {
    const offset = (page - 1) * 10
    const { rows } = await pool.query(
      `SELECT * FROM ${this.table} WHERE user_id = $1
       LIMIT 10 OFFSET ${offset};`,
      [userId]
    );
    return toCamelCase(rows);
  }
  static async findItemByName(item: string, userId: number) {
    const { rows } = await pool.query(
      `
        SELECT * FROM ${this.table} WHERE item = $1 AND user_id = $2
      `,
      [item, userId]
    );
    return toCamelCase(rows);
  }
  static async insertNewExpense(
    item: string,
    cost: number,
    currency: string,
    tag: string,
    dateSpent: Date,
    userId: number
  ) {
    const { rows } = await pool.query(
      `INSERT INTO ${this.table}(item, cost, currency, tag, date_spent, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [item, cost, currency, tag, dateSpent, userId]
    );
    console.log('\x1b[32m%s\x1b[0m', rows);
    return toCamelCase(rows)[0];
  }
  static async deleteExpenseRecord(item: string, userId: number, date: string) {
    const { rows } = await pool.query(
      `DELETE FROM ${this.table} WHERE item = $1 AND user_id = $2 AND date_spent = $3 RETURNING *;`,
      [item, userId, date]
    );
    return toCamelCase(rows);
  }
  static async getExpenseCountByUser(userid: number) {
    const { rows } = await pool.query(
      `
      SELECT COUNT(id) FROM ${this.table} WHERE user_id = $1;`,
      [userid]
    );
    return toCamelCase(rows)[0];
  }

  static async getExpensesInWithinDates(
    userid: number,
    startDate: string,
    endDate: string
  ) {
    const { rows } = await pool.query(
      `SELECT cost, date_spent, item, tag, id 
       FROM ${this.table} 
       WHERE user_id = $1
       AND date_spent
       BETWEEN $2 AND $3;`,
      [userid, startDate, endDate]
    );
    return toCamelCase(rows);
  }

  static async sumRecordsByUser(userId: number) {
    const { rows } = await pool.query(
      `	SELECT SUM(cost) AS total_expenses        
	      FROM ${this.table}
        WHERE user_id = $1;
      `,
      [userId]
    );
    return toCamelCase(rows)[0];
  }

  /* TODO ADD UPDATE AND DELETE QUERIES
  static async count() {
    const { rows } = await pool.query(`SELECT COUNT(*) FROM users`);
    return toCamelCase(rows)[0];
  }

  static async updateExistingUser(user: UserProps) {
    const { rows } = await pool.query(
      `UPDATE users 
       SET monthly_salary = $1,
       currency = $2,
       phone = $3,
       savings_target = $4,
       updated_at = current_timestamp
       WHERE email = $5
       RETURNING *;`,
      [user.monthlySalary, user.currency, user.phone, user.savingsTarget, user.email]
    );
    return toCamelCase(rows)[0];
  } */
}

export { Expenses };
