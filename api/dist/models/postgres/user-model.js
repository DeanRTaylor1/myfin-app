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
exports.User = void 0;
const pool_1 = __importDefault(require("../../pool"));
const tables_1 = require("./util/tables");
const to_camel_case_1 = __importDefault(require("./util/to-camel-case"));
class User {
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`SELECT * FROM users;`);
            const parsedRows = (0, to_camel_case_1.default)(rows);
            return parsedRows;
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`SELECT * FROM users WHERE email = $1;`, [
                email,
            ]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static insertNewUser(email, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *;`, [email, username]);
            console.log('\x1b[32m%s\x1b[0m', rows);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static insertNewUserOAuth(email, username, auth_strategy, auth_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`INSERT INTO users (email, username, auth_strategy, auth_id) VALUES ($1, $2, $3, $4) RETURNING *;`, [email, username, auth_strategy, auth_id]);
            console.log('\x1b[32m%s\x1b[0m', rows);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`SELECT COUNT(*) FROM users`);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static updateExistingUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`UPDATE ${this.table} 
       SET monthly_salary = $1,
       currency = $2,
       phone = $3,
       savings_target = $4,
       updated_at = current_timestamp,
       savings_rate = $5,
       current_savings = $6
       WHERE email = $7
       RETURNING *;`, [
                user.monthlySalary,
                user.currency,
                user.phone,
                user.savingsTarget,
                user.savingsRate,
                user.currentSavings,
                user.email,
            ]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`DELETE FROM ${this.table}
      WHERE email = $1
      RETURNING *;
      `, [email]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
}
exports.User = User;
User.table = tables_1.tables.users;
