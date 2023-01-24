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
exports.confirmationRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/mongoose/User");
const new_user_postgres_1 = __importDefault(require("../../services/new-user-postgres"));
const common_1 = require("../../common");
const router = express_1.default.Router();
exports.confirmationRouter = router;
router.put('/api/users/confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.body;
    const user = yield User_1.User.findById(userid);
    if (!user) {
        throw new common_1.BadRequestError('Invalid Token');
    }
    user.confirmed = true;
    yield user.save();
    // new UserCreatedPublisher(natsWrapper.client).publish({
    //   email: user.email,
    //   username: user.username,
    // });
    yield (0, new_user_postgres_1.default)(user.email, user.username);
    const userJwt = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_KEY);
    //env variable checked in index.ts
    //store in session object
    req.session = { jwt: userJwt };
    res.status(201).send(user);
}));
