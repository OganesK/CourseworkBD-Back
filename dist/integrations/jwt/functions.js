"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        userId: user.id,
        iss: 'Issuer', // TODO: Add issuer
    }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.ENV_NAME === 'dev' ? '24h' : '15m',
    });
};
exports.createToken = createToken;
const createRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.JWT_REFRESH_SECRET);
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=functions.js.map