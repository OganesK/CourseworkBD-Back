"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestQuery = void 0;
const nexus_1 = require("nexus");
exports.RequestQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.crud.request();
        t.crud.requests();
    }
});
//# sourceMappingURL=query.js.map