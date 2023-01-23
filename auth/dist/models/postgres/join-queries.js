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
exports.JoinQueries = void 0;
const pool_1 = __importDefault(require("../../pool"));
const to_camel_case_1 = __importDefault(require("./util/to-camel-case"));
class JoinQueries {
    static getTotalCostByTagsByUserid(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query(`SELECT tag, SUM(total_cost) as total_cost
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
          GROUP BY tag`, [userid]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
}
exports.JoinQueries = JoinQueries;
