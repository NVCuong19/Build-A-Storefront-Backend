"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (_req, res, next) => {
    try {
        jsonwebtoken_1.default.verify(_req.headers.authorization, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401).json(`Invalid Token.`);
        return;
    }
};
exports.default = verifyAuthToken;
