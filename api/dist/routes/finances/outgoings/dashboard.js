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
exports.dashboardDataValuesRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("../../../common");
const expenses_model_1 = require("../../../models/postgres/expenses-model");
const join_queries_1 = require("../../../models/postgres/join-queries");
const outgoings_model_1 = require("../../../models/postgres/outgoings-model");
const user_model_1 = require("../../../models/postgres/user-model");
const router = express_1.default.Router();
exports.dashboardDataValuesRouter = router;
router.get('/api/finances/outgoings/dashboard', common_1.requireAuth, (0, express_validator_1.header)('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid email'), (0, express_validator_1.header)('startdate')
    .trim()
    .escape(), (0, express_validator_1.header)('enddate')
    .trim()
    .escape(), common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, startdate, enddate } = req.headers;
    if (!email ||
        typeof email !== 'string' ||
        typeof startdate !== 'string' ||
        typeof enddate !== 'string') {
        throw new common_1.BadRequestError('Missing Parameters');
    }
    const { id, monthlySalary, savingsTarget, currency, savingsRate, currentSavings } = yield user_model_1.User.findByEmail(email);
    console.log(id, monthlySalary, savingsTarget);
    const outgoingsSum = yield join_queries_1.JoinQueries.getTotalCostByTagsByUserid(+id);
    const totalOutgoings = yield outgoings_model_1.Outgoings.sumRecordsByUser(+id);
    const totalExpenses = yield expenses_model_1.Expenses.sumRecordsByUser(+id);
    const expenses = yield expenses_model_1.Expenses.getExpensesInWithinDates(id, startdate, enddate);
    console.log(totalOutgoings.totalOutgoings, totalExpenses.totalExpenses);
    res
        .status(200)
        .send({
        outgoingsSum,
        total: +totalOutgoings.totalOutgoings + +totalExpenses.totalExpenses,
        totalOutgoings: totalOutgoings.totalOutgoings,
        monthlySalary,
        savingsTarget,
        currency,
        expenses,
        savingsRate,
        currentSavings
    });
}));
