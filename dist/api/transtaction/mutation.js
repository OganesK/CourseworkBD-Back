"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMutation = void 0;
const nexus_1 = require("nexus");
exports.TransactionMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.crud.createOneTransaction();
        t.crud.updateOneTransaction();
    }
});
//# sourceMappingURL=mutation.js.map