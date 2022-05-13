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
exports.Manufacturer = void 0;
const nexus_1 = require("nexus");
__exportStar(require("./query"), exports);
__exportStar(require("./mutation"), exports);
exports.Manufacturer = (0, nexus_1.objectType)({
    name: 'Manufacturer',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.transactions();
        t.model.owner();
    }
});
//# sourceMappingURL=types.js.map