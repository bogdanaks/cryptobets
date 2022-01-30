"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = require("../../config/database");
const match_entity_1 = require("../../models/match/entities/match.entity");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize(database_1.default);
            sequelize.addModels([match_entity_1.Match]);
            return sequelize;
        }
    }
];
//# sourceMappingURL=database.providers.js.map