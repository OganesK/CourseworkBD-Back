"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuery = void 0;
const nexus_1 = require("nexus");
exports.UserQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition: (t) => {
        t.crud.user();
        t.crud.users();
        t.field('me', {
            type: 'User',
            args: {},
            resolve: async (_, {}, { user }) => {
                return user;
            },
        });
    },
});
//# sourceMappingURL=query.js.map