"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
assert(process.env.PG_USERNAME, 'PG_USERNAME not found');
assert(process.env.PG_PASSWORD, 'PG_PASSWORD not found');
assert(process.env.PG_DB_NAME, 'PG_DB_NAME not found');
assert(process.env.PG_HOST, 'PG_HOST not found');
assert(process.env.PG_PORT, 'PG_PORT not found');
exports.default = {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
//# sourceMappingURL=database.js.map