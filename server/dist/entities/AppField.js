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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Application_1 = require("./Application");
let AppField = class AppField extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], AppField.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], AppField.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("text", { unique: true }),
    __metadata("design:type", String)
], AppField.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], AppField.prototype, "max_length", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Application_1.Application, (application) => application.fields),
    __metadata("design:type", Application_1.Application)
], AppField.prototype, "application", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppField.prototype, "addId", null);
AppField = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], AppField);
exports.AppField = AppField;
//# sourceMappingURL=AppField.js.map