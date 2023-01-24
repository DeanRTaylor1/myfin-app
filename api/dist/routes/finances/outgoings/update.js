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
exports.updateDutgoingRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../common");
const outgoings_model_1 = require("../../../models/postgres/outgoings-model");
const rate_limiter_1 = require("../../../services/rate-limiter");
const router = express_1.default.Router();
exports.updateDutgoingRouter = router;
//TODO add update router
router.put('/api/finances/outgoings', common_1.requireAuth, rate_limiter_1.apiLimiter, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, item, currency, userId, tag, cost } = req.body;
    const existingItem = yield outgoings_model_1.Outgoings.updateExistingRecord(email, item, currency, tag, cost);
    console.log(existingItem);
    if (!existingItem) {
        throw new common_1.BadRequestError('Item does not exist');
    }
    res.status(200).send([existingItem]);
}));
