"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
class Pool {
    constructor() {
        this._pool = null;
    }
    connect(options) {
        this._pool = new pg_1.default.Pool(options);
        return this._pool.query(`SELECT 1 + 1;`);
    }
    close() {
        var _a;
        return (_a = this._pool) === null || _a === void 0 ? void 0 : _a.end();
    }
    query(sql, params) {
        return this._pool.query(sql, params);
    }
}
exports.default = new Pool();
