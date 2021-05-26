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
const Group_1 = require("./Group");
let User = class User extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("text", { unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text", { unique: true, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    typeorm_1.Column({ type: Boolean, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdministrator", void 0);
__decorate([
    type_graphql_1.Field(() => [Group_1.Group], { nullable: true }),
    typeorm_1.ManyToMany(() => Group_1.Group, (group) => group.users, {
        cascade: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "groups", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "addId", null);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map