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
const AppField_1 = require("./AppField");
const AppFile_1 = require("./AppFile");
let Application = class Application extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Application.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [AppField_1.AppField]),
    typeorm_1.OneToMany(() => AppField_1.AppField, (appField) => appField.application, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Application.prototype, "fields", void 0);
__decorate([
    type_graphql_1.Field(() => [AppFile_1.AppFile]),
    typeorm_1.OneToMany(() => AppFile_1.AppFile, (file) => file.application),
    __metadata("design:type", Array)
], Application.prototype, "files", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Application.prototype, "addId", null);
Application = __decorate([
    type_graphql_1.ObjectType("Application"),
    type_graphql_1.InputType("application"),
    typeorm_1.Entity()
], Application);
exports.Application = Application;
//# sourceMappingURL=Application.js.map