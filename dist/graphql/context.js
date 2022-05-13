"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../prisma-client"));
const users_1 = require("../datasources/users");
exports.default = async ({ req, connection, res }) => {
    var _a, _b;
    const context = {
        prisma: prisma_client_1.default,
        response: res,
        user: null,
    };
    const usersAPI = new users_1.UsersAPI();
    usersAPI.initialize({ context });
    const authorization = req ? (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization : (_b = connection === null || connection === void 0 ? void 0 : connection.context) === null || _b === void 0 ? void 0 : _b.authorization;
    if (authorization) {
        const user = await usersAPI.findUserByToken(authorization);
        context.user = user;
    }
    return context;
};
//# sourceMappingURL=context.js.map