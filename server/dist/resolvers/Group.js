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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("apollo-client");
const apollo_server_errors_1 = require("apollo-server-errors");
const type_graphql_1 = require("type-graphql");
const Group_1 = require("../entities/Group");
let GroupResolver = class GroupResolver {
    groups() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield Group_1.Group.find();
            console.log(res);
            return res;
        });
    }
    createGroup(name, permissions, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT AUTHENTICATED");
            }
            try {
                let group = Group_1.Group.create({ name, permissions });
                group = yield Group_1.Group.save(group);
                return group;
            }
            catch (_a) {
                throw new apollo_client_1.ApolloError({
                    errorMessage: "Failed to create group",
                });
            }
        });
    }
    deleteGroup(id, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT AUTHENTICATED");
            }
            try {
                yield Group_1.Group.delete(id);
                return true;
            }
            catch (_a) {
                throw new apollo_client_1.ApolloError({
                    errorMessage: "Failed to create group",
                });
            }
            finally {
                return false;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Group_1.Group]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "groups", null);
__decorate([
    type_graphql_1.Mutation(() => Group_1.Group),
    __param(0, type_graphql_1.Arg("name")),
    __param(1, type_graphql_1.Arg("permissions", () => [String])),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "createGroup", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "deleteGroup", null);
GroupResolver = __decorate([
    type_graphql_1.Resolver()
], GroupResolver);
exports.GroupResolver = GroupResolver;
//# sourceMappingURL=Group.js.map