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
exports.deleteExpenseRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("../../../common");
const expenses_model_1 = require("../../../models/postgres/expenses-model");
const check_userid_1 = require("../../../services/check-userid");
const router = express_1.default.Router();
exports.deleteExpenseRouter = router;
router.delete('/api/finances/expenses', common_1.requireAuth, (0, express_validator_1.header)('item')
    .trim()
    .escape(), (0, express_validator_1.header)('userid')
    .trim()
    .escape(), common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, item, datespent } = req.headers;
    if (!userid || !item || !datespent) {
        throw new common_1.BadRequestError('Missing Attributes');
    }
    // const { id } = await User.findByEmail(email);
    if (isNaN(+userid) ||
        typeof item !== 'string' ||
        typeof datespent !== 'string') {
        throw new common_1.BadRequestError('Missing Paramaters');
    }
    const validUser = yield (0, check_userid_1.checkUserId)(req.currentUser.email, +userid);
    if (!validUser) {
        throw new common_1.BadRequestError('Something went wrong');
    }
    const response = yield expenses_model_1.Expenses.deleteExpenseRecord(item, +userid, datespent);
    res.status(200).send(response);
}));
