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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const index_1 = __importDefault(require("./models/index"));
const PORT = 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use(router_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        index_1.default
            .sync()
            .then(() => {
            console.log('connected to the db');
        })
            .catch((err) => {
            console.log('Err', err);
        });
        app
            .listen(PORT, () => {
            console.log(`🚀 Server is listening on port ${PORT}!`);
        })
            .on('error', (err) => {
            console.log(`😞 Sorry, something went wrong! ${err}`);
        });
    }
    catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}))();
