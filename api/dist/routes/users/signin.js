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
exports.signinRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_1 = require("../../services/password");
const User_1 = require("../../models/mongoose/User");
const common_1 = require("../../common");
const router = express_1.default.Router();
exports.signinRouter = router;
router.post('/api/users/signin', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email bust be an email'),
    (0, express_validator_1.body)('password').trim().notEmpty().withMessage('Password can not be empty'),
], common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield User_1.User.findOne({ email });
    if (!existingUser) {
        throw new common_1.BadRequestError('Invalid credentials'); //use generic error as we don't want to be too specific to end user
    }
    if (!existingUser.confirmed) {
        throw new common_1.BadRequestError('Please confirm your email!');
    }
    const passwordsMatch = yield password_1.Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new common_1.BadRequestError('Invalid credentials');
    }
    //generate jwt
    console.log(process.env.JWT_KEY);
    const userJwt = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
    }, process.env.JWT_KEY, { expiresIn: '24h' });
    //env variable checked in index.ts
    //store in session object
    req.session = { jwt: userJwt };
    //delete later
    console.log('\x1b[36m%s\x1b[0m', req.session);
    res.status(200).send(existingUser);
}));
