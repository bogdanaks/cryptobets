"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const response_interceptor_1 = require("../../common/interceptors/response.interceptor");
const get_match_by_id_dto_1 = require("./dto/get-match-by-id.dto");
const get_all_matches_query_dto_1 = require("./dto/get-all-matches-query.dto");
let MatchController = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    async getAllMatches(query) {
        return await this.matchService.getAllMatches(query.sport);
    }
    async getMatchById(param) {
        return await this.matchService.getMatchById(param.matchId);
    }
};
__decorate([
    (0, common_1.Get)('matches'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_matches_query_dto_1.GetAllMatchesQueryDto]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "getAllMatches", null);
__decorate([
    (0, common_1.Get)('matches/:matchId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_match_by_id_dto_1.GetMatchByIdParamDto]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "getMatchById", null);
MatchController = __decorate([
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
exports.MatchController = MatchController;
//# sourceMappingURL=match.controller.js.map