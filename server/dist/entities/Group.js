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
const User_1 = require("./User");
let Group = class Group extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("text", { unique: true }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], Group.prototype, "permissions", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User], { nullable: true }),
    typeorm_1.ManyToMany(() => User_1.User, (user) => user.groups, { nullable: true, eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Group.prototype, "users", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Group.prototype, "addId", null);
Group = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Group);
exports.Group = Group;
//# sourceMappingURL=Group.js.map