"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const current_user_1 = require("./routes/users/current-user");
const common_1 = require("./common");
const signup_1 = require("./routes/users/signup");
const signin_1 = require("./routes/users/signin");
const signout_1 = require("./routes/users/signout");
const confirmation_1 = require("./routes/users/confirmation");
const dotenv = __importStar(require("dotenv"));
const finances_1 = require("./routes/finances");
const update_1 = require("./routes/finances/update");
dotenv.config();
const new_1 = require("./routes/finances/outgoings/new");
const delete_1 = require("./routes/finances/outgoings/delete");
const outgoings_1 = require("./routes/finances/outgoings");
const expenses_1 = require("./routes/finances/expenses");
const new_2 = require("./routes/finances/expenses/new");
const delete_2 = require("./routes/finances/expenses/delete");
const count_1 = require("./routes/finances/expenses/count");
const dashboard_1 = require("./routes/finances/outgoings/dashboard");
const delete_3 = require("./routes/users/delete");
const googleAuth_1 = require("./routes/users/googleAuth");
const passport_1 = __importDefault(require("passport"));
const facebook_auth_1 = require("./routes/users/facebook-auth");
const github_auth_1 = require("./routes/users/github-auth");
const getStocks_1 = require("./routes/finances/stocks/getStocks");
require('./services/passportOAuth');
const app = (0, express_1.default)();
exports.app = app;
// ingress nginx will be sending requests via proxy default behaviour is to reject
app.set('trust proxy', true);
app.use(express_1.default.json());
//the code below means that you have to put https:// in your post requests!
app.use((0, cookie_session_1.default)({
    signed: false, //require https if we are in prod
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(current_user_1.currentUserRouter);
app.use(signin_1.signinRouter);
app.use(signout_1.signoutRouter);
app.use(signup_1.signupRouter);
app.use(confirmation_1.confirmationRouter);
app.use(common_1.currentUser);
app.use(finances_1.indexFinancesRouter);
app.use(update_1.updateUserRouter);
app.use(new_1.outgoingsNewRouter);
app.use(delete_1.deleteOutgoingRouter);
//app.use(updateDutgoingRouter);
app.use(outgoings_1.getOutgoingsRouter);
app.use(expenses_1.expensesIndexRouter);
app.use(new_2.expensesNewRouter);
app.use(delete_2.deleteExpenseRouter);
app.use(count_1.expenseCountRouter);
app.use(dashboard_1.dashboardDataValuesRouter);
app.use(delete_3.deleteAccountRouter);
app.use(googleAuth_1.googleRouter);
app.use(facebook_auth_1.facebookRouter);
app.use(github_auth_1.githubRouter);
app.use(getStocks_1.getStocksRouter);
//not found 404
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new common_1.NotFoundError();
}));
app.use(common_1.errorHandler);
