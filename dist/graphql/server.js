"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const datasources_1 = __importDefault(require("../datasources"));
const schema_1 = __importDefault(require("./schema"));
const context_1 = __importDefault(require("./context"));
const config = {
    schema: schema_1.default,
    context: context_1.default,
    dataSources: datasources_1.default,
    tracing: true,
    introspection: process.env.ENV_NAME !== 'production',
    plugins: process.env.ENV_NAME !== 'production' ? [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()] : [],
};
const server = new apollo_server_express_1.ApolloServer(config);
exports.default = server;
//# sourceMappingURL=server.js.map