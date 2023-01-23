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
exports.updateUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../common");
const user_model_1 = require("../../models/postgres/user-model");
const express_validator_1 = require("express-validator");
const rate_limiter_1 = require("../../services/rate-limiter");
const router = express_1.default.Router();
exports.updateUserRouter = router;
router.post('/api/finances/user', common_1.requireAuth, rate_limiter_1.apiLimiter, (0, express_validator_1.body)('monthlySalary')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Salary must be a number'), (0, express_validator_1.body)('savingsTarget')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Savings target must be a number'), common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   'update user profile here'
    //
    const { email, username, monthlySalary, currency, phone, savingsTarget, savingsRate, currentSavings } = req.body;
    console.log(currentSavings);
    const response = yield user_model_1.User.updateExistingUser({
        email,
        username,
        monthlySalary,
        currency,
        phone,
        savingsTarget,
        savingsRate,
        currentSavings
    });
    res.status(201).send({
        email: response.email,
        monthlySalary: response.monthlySalary,
        currency: response.currency,
        phone: response.phone,
        savingsTarget: response.savingsTarget,
    });
}));
