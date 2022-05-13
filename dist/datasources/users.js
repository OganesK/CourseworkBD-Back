"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersAPI = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const isemail_1 = __importDefault(require("isemail"));
const apollo_server_express_1 = require("apollo-server-express");
const config_1 = require("../config");
const jwt_1 = require("../integrations/jwt");
class UsersAPI {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'secret';
    }
    initialize(config) {
        this.context = config.context;
        this.prisma = config.context.prisma;
    }
    getToken(user) {
        return jsonwebtoken_1.default.sign({
            email: user.email,
            sub: user.id,
        }, this.jwtSecret, {
            expiresIn: '24h',
            algorithm: 'HS256',
        });
    }
    async findUserByToken(authorization) {
        if (!authorization) {
            return null;
        }
        try {
            const token = jsonwebtoken_1.default.verify(authorization.replace('Bearer ', ''), this.jwtSecret);
            return (token === null || token === void 0 ? void 0 : token.userId) && await this.prisma.user.findFirst({ where: { id: token.userId } });
        }
        catch (error) {
            return null;
        }
    }
    async createUser({ login, email, firstname, lastname, password }) {
        const existingUser = await this.prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            throw new apollo_server_express_1.UserInputError('This email is already exist');
        }
        if (!isemail_1.default.validate(email)) {
            throw new apollo_server_express_1.UserInputError('Invalid email');
        }
        const hashedPassword = await bcrypt_1.default.hash(password, config_1.HASH_SALT);
        const user = await this.prisma.user.create({
            data: {
                email,
                firstname,
                lastname,
                password: hashedPassword,
            },
        });
        const token = (0, jwt_1.createToken)(user);
        return { token, user };
    }
    async signIn({ login, password }) {
        const user = await this.prisma.user.findFirst({ where: { email: login } });
        if (!user || !user.password) {
            throw new apollo_server_express_1.ForbiddenError('Incorrect email or password');
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw new apollo_server_express_1.ForbiddenError('Incorrect email or password');
        }
        const token = (0, jwt_1.createToken)(user);
        return { token, user };
    }
}
exports.UsersAPI = UsersAPI;
//# sourceMappingURL=users.js.map