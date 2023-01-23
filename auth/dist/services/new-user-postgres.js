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
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/postgres/user-model");
const initPgUser = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByEmail(email);
    if (user) {
        console.log(`User with email: ${email} already exists in postgres`);
        return;
    }
    const result = yield user_model_1.User.insertNewUser(email, username);
    console.log(result);
    return;
});
exports.default = initPgUser;
