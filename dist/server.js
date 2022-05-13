"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const prisma_client_1 = __importDefault(require("./prisma-client"));
const server_1 = __importDefault(require("./graphql/server"));
const jwt_1 = require("./integrations/jwt");
const config_1 = require("./config");
const logger_1 = require("./logger");
const app = (0, express_1.default)();
const whitelist = [
    'http://localhost:5000',
    'http://localhost:4000',
    'http://localhost:3000',
    'http://www.elithys.space',
    'https://www.elithys.space',
    'https://elithys.space',
    'http://elithys.space'
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send(`Response from process ${process.pid}`);
});
app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
        return res.send({ ok: false, accessToken: '' });
    }
    let payload = null;
    try {
        payload = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
    }
    catch (error) {
        return res.send({ ok: false, accessToken: '' });
    }
    const user = await prisma_client_1.default.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
        return res.send({ ok: false, accessToken: '' });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: '' });
    }
    res.cookie('jid', (0, jwt_1.createRefreshToken)(user), { httpOnly: true, path: '/refresh_token', secure: process.env.ENV_NAME === 'PRODUCTION' });
    return res.send({ ok: true, accessToken: (0, jwt_1.createToken)(user) });
});
app.post('/logout', async (req, res) => {
    res.clearCookie('jid');
    res.send();
});
const startServer = async () => {
    await server_1.default.start();
    server_1.default.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(config_1.PORT, () => {
        logger_1.logger.info(`Server started on port ${config_1.PORT}`);
    });
};
exports.default = startServer;
//# sourceMappingURL=server.js.map