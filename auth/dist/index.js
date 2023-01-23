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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const pool_1 = __importDefault(require("./pool"));
const node_cron_1 = __importDefault(require("node-cron"));
const stocks_1 = require("./services/stocks");
const PORT = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('\x1b[34m%s\x1b[0m', 'Starting up...');
    /* console.log('\x1b[34m%s\x1b[0m', 'env:' + process.env.NODE_ENV);
    console.log('\x1b[34m%s\x1b[0m', process.env.NODE_ENV === 'production');
    console.log('Test');
    */
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    if (!process.env.RDS_HOST ||
        !process.env.RDS_USER ||
        !process.env.RDS_PASSWORD) {
        throw new Error('RDS config not defined correctly');
    }
    try {
        mongoose_1.default.set('strictQuery', true);
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('\x1b[34m%s\x1b[0m', 'Connected to Mongo');
        pool_1.default.connect({
            host: process.env.RDS_HOST,
            port: 5432,
            database: 'deanrtaylorfinance',
            user: process.env.RDS_USER,
            password: process.env.RDS_PASSWORD,
        });
        (0, stocks_1.fetchStocks)();
        //refetch stock data every midnight
        node_cron_1.default.schedule('0 0 0 * * *', () => {
            console.log('Cron running');
            (0, stocks_1.fetchStocks)();
        });
        console.log('\x1b[34m%s\x1b[0m', 'Connected to Postgres');
    }
    catch (err) {
        console.error(err);
    }
    app_1.app.listen(PORT, () => {
        console.log('\x1b[34m%s\x1b[0m', `Listening on port ${PORT}`);
    });
});
start();
