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
const AppField_1 = require("./AppField");
const AppFile_1 = require("./AppFile");
let FileField = class FileField extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], FileField.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], FileField.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], FileField.prototype, "value", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], FileField.prototype, "value_id_string", void 0);
__decorate([
    type_graphql_1.Field(() => AppFile_1.AppFile),
    typeorm_1.ManyToOne(() => AppFile_1.AppFile, (file) => file.fields, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", AppFile_1.AppFile)
], FileField.prototype, "file", void 0);
__decorate([
    type_graphql_1.Field(() => AppField_1.AppField),
    typeorm_1.ManyToOne(() => AppField_1.AppField, (field) => field.filefields, { eager: true }),
    __metadata("design:type", AppField_1.AppField)
], FileField.prototype, "field", void 0);
FileField = __decorate([
    type_graphql_1.ObjectType("FileField"),
    type_graphql_1.InputType("FileFieldInput"),
    typeorm_1.Entity()
], FileField);
exports.FileField = FileField;
//# sourceMappingURL=FileField.js.map