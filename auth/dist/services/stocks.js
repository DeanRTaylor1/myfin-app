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
exports.fetchStocks = exports.stockHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const stocks = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSM', 'XOM', 'NVDA', 'TSLA', 'META', 'SPY', 'VTI', 'VOO', 'VEA', 'VWO', 'VXUS', 'SCHF', 'IVE'];
const stockHandler = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${code}&apikey=${process.env.STOCKS_API_KEY}`);
        fs_1.default.writeFile(`${__dirname}/stock-data/${code}.txt`, JSON.stringify(data), 'utf-8', (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`Data written to /${code}.txt`);
        });
    }
    catch (err) {
        console.error(err);
    }
});
exports.stockHandler = stockHandler;
const fetchStocks = () => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    const customLoop = () => {
        console.log(i);
        setTimeout(() => {
            (0, exports.stockHandler)(stocks[i]);
            i++;
            if (i <= stocks.length - 1) {
                customLoop();
            }
        }, 20 * 1000);
    };
    customLoop();
});
exports.fetchStocks = fetchStocks;
