import pool from '../../pool';
import { tables } from './util/tables';
import toCamelCase from './util/to-camel-case';

class JoinQueries {
  static async getTotalCostByTagsByUserid(userid: number) {
    const { rows } = await pool.query(
      `SELECT tag, SUM(total_cost) as total_cost
       FROM 
          (SELECT tag, sum(cost) as total_cost
           FROM expenses
           WHERE user_id = $1
           GROUP BY tag
           UNION ALL
           SELECT tag, sum(cost) as total_cost
           FROM fixed_outgoings_monthly
           WHERE user_id = $1
           GROUP BY tag          
          ) AS total_costs_all
          GROUP BY tag`,
      [userid]
    );
    return toCamelCase(rows);
  }
}

export { JoinQueries };
