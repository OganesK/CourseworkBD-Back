"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInInput = exports.SignUpInput = exports.ClientMutation = void 0;
const nexus_1 = require("nexus");
const jwt_1 = require("../../integrations/jwt");
exports.ClientMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: (t) => {
        t.field('signUp', {
            type: 'AuthPayload',
            args: { data: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: exports.SignUpInput })) },
            resolve: async (_, { data }, { dataSources, response }) => {
                const payload = await dataSources.usersAPI.createUser(data);
                response.cookie('jid', (0, jwt_1.createRefreshToken)(payload.user), { httpOnly: true, secure: process.env.ENV_NAME === 'PRODUCTION' });
                return payload;
            },
        });
        t.field('signIn', {
            type: 'AuthPayload',
            args: { data: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: exports.SignInInput })) },
            resolve: async (_, { data }, { dataSources, response }) => {
                const payload = await dataSources.usersAPI.signIn(data);
                response.cookie('jid', (0, jwt_1.createRefreshToken)(payload.user), { httpOnly: true, secure: process.env.ENV_NAME === 'PRODUCTION' });
                return payload;
            },
        });
    },
});
exports.SignUpInput = (0, nexus_1.inputObjectType)({
    name: 'CreateUserInput',
    definition(t) {
        t.nonNull.string('firstname');
        t.nonNull.string('lastname');
        t.nonNull.string('login');
        t.nonNull.string('email');
        t.nonNull.string('password');
    },
});
exports.SignInInput = (0, nexus_1.inputObjectType)({
    name: 'SignInInput',
    definition(t) {
        t.nonNull.string('login');
        t.nonNull.string('password');
    },
});
//# sourceMappingURL=mutation.js.map