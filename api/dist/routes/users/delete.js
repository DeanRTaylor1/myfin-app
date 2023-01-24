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
exports.deleteAccountRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../common");
const User_1 = require("../../models/mongoose/User");
const user_model_1 = require("../../models/postgres/user-model");
const router = express_1.default.Router();
exports.deleteAccountRouter = router;
router.delete('/api/users', common_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.headers;
    if (!email || typeof email !== 'string') {
        throw new common_1.BadRequestError('Missing Parameters');
    }
    try {
        const deletedItem = yield user_model_1.User.deleteUserByEmail(email);
        console.log(deletedItem);
    }
    catch (err) {
        throw new common_1.BadRequestError('Something went wrong');
    }
    const user = yield User_1.User.findOne({ email });
    if (user) {
        try {
            const mongooseDeletedItem = yield User_1.User.deleteOne({
                email: email,
            });
            console.log(mongooseDeletedItem);
        }
        catch (err) {
            throw new common_1.BadRequestError('Something Went Wrong');
        }
    }
    req.session = null;
    res.status(200).send([{ message: 'Account Deleted Successfully' }]);
}));
