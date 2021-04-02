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
const FileField_1 = require("./FileField");
let AppFile = class AppFile extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], AppFile.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppFile.prototype, "filename", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppFile.prototype, "old_filename", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppFile.prototype, "mimetype", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppFile.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field((type) => Application_1.Application),
    typeorm_1.ManyToOne(() => Application_1.Application, (application) => application.files),
    __metadata("design:type", Application_1.Application)
], AppFile.prototype, "application", void 0);
__decorate([
    type_graphql_1.Field((type) => [FileField_1.FileField]),
    typeorm_1.OneToMany(() => FileField_1.FileField, (field) => field.file),
    __metadata("design:type", Array)
], AppFile.prototype, "fields", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], AppFile.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], AppFile.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppFile.prototype, "addId", null);
AppFile = __decorate([
    type_graphql_1.ObjectType("AppFile"),
    type_graphql_1.InputType("appFile"),
    typeorm_1.Entity()
], AppFile);
exports.AppFile = AppFile;
//# sourceMappingURL=AppFile.js.map