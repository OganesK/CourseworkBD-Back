"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./users");
const getDataSources = () => ({
    usersAPI: new users_1.UsersAPI(),
});
exports.default = getDataSources;
//# sourceMappingURL=index.js.map