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
exports.getOutgoingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../common");
const outgoings_model_1 = require("../../../models/postgres/outgoings-model");
const router = express_1.default.Router();
exports.getOutgoingsRouter = router;
router.get('/api/finances/outgoings', common_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, page } = req.headers;
    console.log(email, page);
    if (!email || !page || isNaN(+page)) {
        return new common_1.BadRequestError('Missing Paramaters');
    }
    if (typeof email !== 'string') {
        throw new common_1.BadRequestError('Details not provided');
    }
    //first page should be page 1
    const items = yield outgoings_model_1.Outgoings.getRecordsByUser(email, +page);
    console.log(items);
    res.status(200).send(items);
}));
