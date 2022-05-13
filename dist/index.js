"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
// const numCpus = cpus().length;
// if (cluster.isPrimary) {
//   for (let cpu = 0; cpu < numCpus; cpu += 1) {
//     cluster.fork();
//   }
// } else {
//   startServer();
// }
(0, server_1.default)();
//# sourceMappingURL=index.js.map