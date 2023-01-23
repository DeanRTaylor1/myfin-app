import { UserProps } from '../../common/Types/types-interfaces';
import pool from '../../pool';
import { tables } from './util/tables';
import toCamelCase from './util/to-camel-case';

class User {
  private static table = tables.users;

  static async find() {
    const { rows } = await pool.query(`SELECT * FROM users;`);
    const parsedRows = toCamelCase(rows);
    return parsedRows;
  }
  static async findByEmail(email: string) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    return toCamelCase(rows)[0];
  }
  static async insertNewUser(email: string, username: string) {
    const { rows } = await pool.query(
      `INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *;`,
      [email, username]
    );
    console.log('\x1b[32m%s\x1b[0m', rows);
    return toCamelCase(rows)[0];
  }
  static async insertNewUserOAuth(
    email: string,
    username: string,
    auth_strategy: string,
    auth_id: string
  ) {
    const { rows } = await pool.query(
      `INSERT INTO users (email, username, auth_strategy, auth_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [email, username, auth_strategy, auth_id]
    );
    console.log('\x1b[32m%s\x1b[0m', rows);
    return toCamelCase(rows)[0];
  }
  static async count() {
    const { rows } = await pool.query(`SELECT COUNT(*) FROM users`);
    return toCamelCase(rows)[0];
  }

  static async updateExistingUser(user: UserProps) {
    const { rows } = await pool.query(
      `UPDATE ${this.table} 
       SET monthly_salary = $1,
       currency = $2,
       phone = $3,
       savings_target = $4,
       updated_at = current_timestamp,
       savings_rate = $5,
       current_savings = $6
       WHERE email = $7
       RETURNING *;`,
      [
        user.monthlySalary,
        user.currency,
        user.phone,
        user.savingsTarget,
        user.savingsRate,
        user.currentSavings,
        user.email,
      ]
    );
    return toCamelCase(rows)[0];
  }

  static async deleteUserByEmail(email: string) {
    const { rows } = await pool.query(
      `DELETE FROM ${this.table}
      WHERE email = $1
      RETURNING *;
      `,
      [email]
    );
    return toCamelCase(rows);
  }
}

export { User };
