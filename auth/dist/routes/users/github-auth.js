"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubRouter = void 0;
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.githubRouter = router;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const successLoginUrl = 'http://localhost:3000/auth/signin';
const errorLoginUrl = 'http://localhost:3000/auth/signin';
router.get('/api/login/github', passport_1.default.authenticate('github'));
router.get('/api/auth/github/callback', passport_1.default.authenticate('github', {
    successReturnToOrRedirect: '/api/githubconfirm',
    failureRedirect: '/api/githubfail',
}), (req, res) => {
    console.log('Req:' + req);
    res.send('Thank you for signing in!');
});
router.get('/api/githubconfirm', (req, res) => {
    var _a, _b;
    console.log((_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user);
    const { id, username, email } = (_b = req.session) === null || _b === void 0 ? void 0 : _b.passport.user;
    console.log('id: ' + id);
    const userJwt = jsonwebtoken_1.default.sign({ id, username, email }, process.env.JWT_KEY);
    //env variable checked in index.ts
    //store in session object
    req.session = { jwt: userJwt };
    res.status(201).redirect('http://localhost:3000/auth/confirm/oauth');
});
router.get('/api/githubfail', (req, res) => {
    console.log('Auth does not match');
    res.status(400).redirect('http://localhost:3000/auth/error');
});
