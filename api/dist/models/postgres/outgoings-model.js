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
exports.Outgoings = void 0;
const pool_1 = __importDefault(require("../../pool"));
const user_model_1 = require("./user-model");
const tables_1 = require("./util/tables");
const to_camel_case_1 = __importDefault(require("./util/to-camel-case"));
/* TODO IMPLEMENT POSTGRES ABSTRACT CLASS FOR BASIC METHODS */
class Outgoings {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`SELECT * FROM ${this.table};`);
            const parsedRows = (0, to_camel_case_1.default)(rows);
            return parsedRows;
        });
    }
    static findExistingItemByName(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`SELECT * FROM ${this.table} WHERE item = $1;`, [item]);
            console.log(rows);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static insertNewRecord(item, currency, userId, tag, cost) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`INSERT INTO ${this.table} (item, currency, user_id, tag, cost)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *;`, [item, currency, userId, tag, cost]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteOutgoingRecords(item, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`DELETE FROM ${this.table} WHERE user_id = $1 AND item = $2 RETURNING *;`, [userId, item]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static updateExistingRecord(email, item, currency, tag, cost) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = yield user_model_1.User.findByEmail(email);
            console.log(id);
            const { rows } = yield pool_1.default.query(`UPDATE ${this.table} 
        SET currency = $1,
        tag = $2,
        cost = $3,
        updated_at = current_timestamp
        WHERE user_id = $4 AND item = $5
        RETURNING *;`, [currency, tag, cost, id, item]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static getRecordsByUser(email, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = yield user_model_1.User.findByEmail(email);
            console.log(id);
            const offset = (page - 1) * 10;
            const { rows } = yield pool_1.default.query(`SELECT * FROM ${this.table} WHERE user_id = $1 LIMIT 10 OFFSET ${offset};`, [id]);
            // console.log(rows)
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static countRecordsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`	SELECT tag, COUNT(*) AS count
        FROM fixed_outgoings_monthly  
        WHERE user_id = $1
      	GROUP BY tag
      	ORDER BY count DESC;

    `, [userId]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static sumRecordsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`	SELECT SUM(cost) AS total_outgoings        
	      FROM fixed_outgoings_monthly
        WHERE user_id = $1;
      `, [userId]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.Outgoings = Outgoings;
Outgoings.table = tables_1.tables.outgoings;
