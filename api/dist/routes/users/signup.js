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
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("../../common");
const User_1 = require("../../models/mongoose/User");
const nodemailer_1 = require("../../services/nodemailer");
const router = express_1.default.Router();
exports.signupRouter = router;
router.post('/api/users/signup', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be valid').normalizeEmail(),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    (0, express_validator_1.body)('username')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Username must be between 4 s 20 characters')
        .not()
        .isEmpty()
        .trim()
        .escape(),
], common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new common_1.BadRequestError('Details not provided');
    }
    const existingUser = yield User_1.User.findOne({ email });
    const existingUsername = yield User_1.User.findOne({ username });
    if (existingUsername) {
        throw new common_1.BadRequestError('Username in use');
    }
    if (existingUser) {
        throw new common_1.BadRequestError('Email in use');
    }
    //password hashing as middleware in User Model
    const user = User_1.User.build({ username, email, password });
    yield user.save();
    if (process.env.TEST_EMAIL && email === process.env.TEST_EMAIL) {
        user.confirmed = true;
        yield user.save();
        const userJwt = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_KEY);
        //env variable checked in index.ts
        //store in session object
        req.session = { jwt: userJwt };
        return res.status(201).send(user);
    }
    nodemailer_1.confirmationEmailHandler.sendConfirmationEmail(username, email, user._id);
    res.status(201).send(user);
}));
//email confirmation now required so commenting this out temporarily
// //generate jwt
// const userJwt = jwt.sign(
//   { id: user.id, username: user.username, email: user.email },
//   process.env.JWT_KEY!
// );
// //env variable checked in index.ts
// //store in session object
// req.session = { jwt: userJwt };
