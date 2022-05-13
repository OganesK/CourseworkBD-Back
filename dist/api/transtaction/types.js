"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const nexus_1 = require("nexus");
__exportStar(require("./mutation"), exports);
__exportStar(require("./query"), exports);
exports.Transaction = (0, nexus_1.objectType)({
    name: 'Transaction',
    definition(t) {
        t.model.id();
        t.model.amount();
        t.model.product();
        t.model.shop();
        t.model.manufacturer();
    }
});
//# sourceMappingURL=types.js.map