"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesProviders = void 0;
const match_entity_1 = require("../../models/match/entities/match.entity");
const repositories_1 = require("../../config/repositories");
exports.matchesProviders = [
    {
        provide: repositories_1.Repositories.MATCHES_REPOSITORY,
        useValue: match_entity_1.Match,
    },
];
//# sourceMappingURL=matches.providers.js.map