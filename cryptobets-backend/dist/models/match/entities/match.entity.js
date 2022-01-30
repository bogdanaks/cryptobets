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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Match = class Match extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Match.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Match.prototype, "is_enable", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Match.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Match.prototype, "sport_slug", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Match.prototype, "match_slug", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Match.prototype, "match_type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Match.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Match.prototype, "winner_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Match.prototype, "team_one", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Match.prototype, "team_two", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING)),
    __metadata("design:type", Array)
], Match.prototype, "available_bet_slugs", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Match.prototype, "begin_at", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Match.prototype, "end_at", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Match.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Match.prototype, "updated_at", void 0);
Match = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'matches',
        timestamps: false,
    })
], Match);
exports.Match = Match;
//# sourceMappingURL=match.entity.js.map