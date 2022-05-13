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
exports.AuthPayload = exports.User = void 0;
const nexus_1 = require("nexus");
__exportStar(require("./query"), exports);
__exportStar(require("./mutation"), exports);
exports.User = (0, nexus_1.objectType)({
    name: 'User',
    definition(t) {
        t.model.id();
        t.model.role();
        t.model.firstname();
        t.model.lastname();
        t.model.email();
        t.model.manufactures();
        t.model.shops();
    },
});
exports.AuthPayload = (0, nexus_1.objectType)({
    name: 'AuthPayload',
    definition(t) {
        t.string('token');
        t.field('user', { type: 'User' });
    },
});
//# sourceMappingURL=types.js.map