"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shield = void 0;
const graphql_shield_1 = require("graphql-shield");
const isAuthenticated = (0, graphql_shield_1.rule)({ cache: 'contextual' })((parent, args, ctx) => {
    return ctx.user !== null;
});
const permissions = {
    Query: {
        me: graphql_shield_1.allow,
    },
    Mutation: {
        '*': graphql_shield_1.allow,
    },
};
exports.shield = (0, graphql_shield_1.shield)(permissions, { allowExternalErrors: true });
//# sourceMappingURL=shield.js.map