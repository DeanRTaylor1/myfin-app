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
exports.expensesIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("../../../common");
const expenses_model_1 = require("../../../models/postgres/expenses-model");
const user_model_1 = require("../../../models/postgres/user-model");
const router = express_1.default.Router();
exports.expensesIndexRouter = router;
router.get('/api/finances/expenses', common_1.requireAuth, (0, express_validator_1.header)('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid email'), (0, express_validator_1.header)('page')
    .trim()
    .escape(), common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, page } = req.headers;
    if (!page || typeof email !== 'string' || isNaN(+page)) {
        throw new common_1.BadRequestError('Missing Parameters');
    }
    const { id } = yield user_model_1.User.findByEmail(email);
    const allItems = yield expenses_model_1.Expenses.findAllByUserId(id, +page);
    res.status(200).send(allItems);
}));
