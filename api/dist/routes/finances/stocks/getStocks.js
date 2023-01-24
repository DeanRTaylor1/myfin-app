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
exports.getStocksRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../../common/middlewares/require-auth");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
exports.getStocksRouter = router;
router.get('/api/finances/stocks/:code', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const data = fs_1.default.readFileSync(path_1.default.resolve(__dirname, `../../../services/stock-data/${code}.txt`), 'utf-8');
    //console.log(data)
    res.status(200).send(JSON.parse(data));
}));
