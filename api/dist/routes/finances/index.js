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
exports.indexFinancesRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../common");
const user_model_1 = require("../../models/postgres/user-model");
const router = express_1.default.Router();
exports.indexFinancesRouter = router;
router.post('/api/finances', common_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userData = yield user_model_1.User.findByEmail(email);
    console.log(userData);
    //remove the postgres id from the return as it is unused
    delete userData.id;
    delete userData.authStrategy;
    delete userData.authId;
    res.status(200).send(userData);
}));
