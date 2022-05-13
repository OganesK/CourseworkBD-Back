"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopQuery = void 0;
const nexus_1 = require("nexus");
exports.ShopQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.crud.shop();
        t.crud.shops();
    }
});
//# sourceMappingURL=query.js.map