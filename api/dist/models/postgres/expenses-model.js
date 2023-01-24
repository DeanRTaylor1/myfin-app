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
exports.Expenses = void 0;
const pool_1 = __importDefault(require("../../pool"));
const tables_1 = require("./util/tables");
const to_camel_case_1 = __importDefault(require("./util/to-camel-case"));
class Expenses {
    static findAll(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * 10;
            console.log(offset);
            const { rows } = yield pool_1.default.query(`SELECT * FROM ${this.table} LIMIT 10 OFFSET ${offset};`);
            const parsedRows = (0, to_camel_case_1.default)(rows);
            return parsedRows;
        });
    }
    static findAllByUserId(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * 10;
            const { rows } = yield pool_1.default.query(`SELECT * FROM ${this.table} WHERE user_id = $1
       LIMIT 10 OFFSET ${offset};`, [userId]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static findItemByName(item, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`
        SELECT * FROM ${this.table} WHERE item = $1 AND user_id = $2
      `, [item, userId]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static insertNewExpense(item, cost, currency, tag, dateSpent, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`INSERT INTO ${this.table}(item, cost, currency, tag, date_spent, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [item, cost, currency, tag, dateSpent, userId]);
            console.log('\x1b[32m%s\x1b[0m', rows);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteExpenseRecord(item, userId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`DELETE FROM ${this.table} WHERE item = $1 AND user_id = $2 AND date_spent = $3 RETURNING *;`, [item, userId, date]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getExpenseCountByUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`
      SELECT COUNT(id) FROM ${this.table} WHERE user_id = $1;`, [userid]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static getExpensesInWithinDates(userid, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`SELECT cost, date_spent, item, tag, id 
       FROM ${this.table} 
       WHERE user_id = $1
       AND date_spent
       BETWEEN $2 AND $3;`, [userid, startDate, endDate]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static sumRecordsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`	SELECT SUM(cost) AS total_expenses        
	      FROM ${this.table}
        WHERE user_id = $1;
      `, [userId]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.Expenses = Expenses;
Expenses.table = tables_1.tables.expenses;
