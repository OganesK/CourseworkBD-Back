"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const schema_1 = require("nexus-plugin-prisma/schema");
const graphql_middleware_1 = require("graphql-middleware");
const path_1 = __importDefault(require("path"));
const graphql_iso_date_1 = require("graphql-iso-date");
const middlewares = __importStar(require("../middlewares"));
const types = __importStar(require("./types"));
const rawSchema = (0, nexus_1.makeSchema)({
    types: [types],
    plugins: [(0, schema_1.nexusSchemaPrisma)({
            experimentalCRUD: true,
            scalars: {
                DateTime: graphql_iso_date_1.DateTime,
            },
        })],
    outputs: {
        typegen: path_1.default.join(__dirname, '../../generated/typings.ts'),
        schema: path_1.default.join(__dirname, '../../generated/schema.graphql'),
    },
});
const schema = (0, graphql_middleware_1.applyMiddleware)(rawSchema, middlewares.shield);
exports.default = schema;
//# sourceMappingURL=index.js.map