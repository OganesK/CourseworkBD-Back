"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionQuery = void 0;
const nexus_1 = require("nexus");
exports.TransactionQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.crud.transaction();
        t.crud.transactions();
    }
});
//# sourceMappingURL=query.js.map