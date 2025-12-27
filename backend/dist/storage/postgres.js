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
exports.StorageService = exports.dbRequest = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Using a connection pool
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const dbRequest = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    return pool.query(text, params);
});
exports.dbRequest = dbRequest;
class StorageService {
    static saveSession(evidence) {
        return __awaiter(this, void 0, void 0, function* () {
            // Schema assumption: table sessions (id, data, timestamp)
            // In a real scenario, we would use proper schema
            // Stub implementation to avoid crashing without a real DB in this demo environment
            // console.log("Saving session to DB:", evidence.sessionId);
            return;
            /*
            const query = 'INSERT INTO sessions(id, data, created_at) VALUES($1, $2, $3)';
            await dbRequest(query, [evidence.sessionId, evidence, new Date()]);
            */
        });
    }
    static getSession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Stub
            return { id, data: "Mock DB Data" };
        });
    }
}
exports.StorageService = StorageService;
