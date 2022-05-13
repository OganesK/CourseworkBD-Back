"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerQuery = void 0;
const nexus_1 = require("nexus");
exports.ManufacturerQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.crud.manufacturer();
        t.crud.manufacturers();
    }
});
//# sourceMappingURL=query.js.map