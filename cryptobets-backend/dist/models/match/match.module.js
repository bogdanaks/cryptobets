"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchModule = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const match_controller_1 = require("./match.controller");
const matches_providers_1 = require("../../providers/repositories/matches.providers");
const database_module_1 = require("../../providers/database/database.module");
let MatchModule = class MatchModule {
};
MatchModule = __decorate([
    (0, common_1.Module)({
        exports: [match_service_1.MatchService],
        controllers: [match_controller_1.MatchController],
        imports: [database_module_1.DatabaseModule],
        providers: [
            match_service_1.MatchService,
            ...matches_providers_1.matchesProviders,
        ],
    })
], MatchModule);
exports.MatchModule = MatchModule;
//# sourceMappingURL=match.module.js.map