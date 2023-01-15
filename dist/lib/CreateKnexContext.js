"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv = require('dotenv');
dotenv.config();
function createKnexContext() {
    return {
        default: (0, knex_1.default)({
            client: 'mysql2',
            connection: process.env.MYSQL_DEFAULT,
            pool: { min: 3, max: 10 },
        }),
    };
}
exports.default = createKnexContext;
//# sourceMappingURL=CreateKnexContext.js.map