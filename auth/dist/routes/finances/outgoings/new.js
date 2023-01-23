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
exports.outgoingsNewRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("../../../common");
const outgoings_model_1 = require("../../../models/postgres/outgoings-model");
const user_model_1 = require("../../../models/postgres/user-model");
const rate_limiter_1 = require("../../../services/rate-limiter");
const router = express_1.default.Router();
exports.outgoingsNewRouter = router;
router.post('/api/finances/outgoings', common_1.requireAuth, rate_limiter_1.apiLimiter, (0, express_validator_1.body)('currency')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Invalid currency!'), (0, express_validator_1.body)('item')
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage('Invalid Item name'), (0, express_validator_1.body)('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid email!'), (0, express_validator_1.body)('tag')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Invalid Tag!'), (0, express_validator_1.body)('cost')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Cost must be a number!'), common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item, currency, email, tag, cost } = req.body;
    if (!currency || !email || !tag || !cost || !item) {
        throw new common_1.BadRequestError('Missing Attributes');
    }
    if (email !== req.currentUser.email) {
        throw new common_1.NotAuthorizedError();
    }
    const { id } = yield user_model_1.User.findByEmail(email);
    const addedItem = yield outgoings_model_1.Outgoings.insertNewRecord(item, currency, id, tag, cost);
    //remove the postgres id from the return as it is unused
    const outgoings = yield outgoings_model_1.Outgoings.findAll();
    console.log(outgoings);
    res.status(201).send(addedItem);
}));
