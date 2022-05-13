"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopMutation = void 0;
const nexus_1 = require("nexus");
exports.ShopMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.crud.createOneShop();
        t.crud.updateOneShop();
    }
});
//# sourceMappingURL=mutation.js.map