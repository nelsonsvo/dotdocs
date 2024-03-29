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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("apollo-client");
const apollo_server_errors_1 = require("apollo-server-errors");
const argon2 = __importStar(require("argon2"));
const type_graphql_1 = require("type-graphql");
const constants_1 = require("../constants");
const Group_1 = require("../entities/Group");
const User_1 = require("../entities/User");
let UserResolver = class UserResolver {
    me({ req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT LOGGED IN");
            }
            return yield User_1.User.findOne({ id: req.session.userId }, { relations: ["groups"] });
        });
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.find({ relations: ["groups"] });
        });
    }
    userById(id, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT LOGGED IN");
            }
            return User_1.User.find({ relations: ["groups"], where: { id } });
        });
    }
    login(username, password, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ username }, { relations: ["groups"] });
            if (user) {
                const valid = yield argon2.verify(user.password, password);
                if (valid) {
                    req.session.userId = user.id;
                    console.log(req.session.userId);
                    return user;
                }
            }
            throw new apollo_client_1.ApolloError({
                errorMessage: "Incorrect username or password",
            });
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
    createUser(username, password, email, groupId, isAdministrator, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                try {
                    const hash = yield argon2.hash(password);
                    let groups = [];
                    if (groupId !== "") {
                        groups = yield Group_1.Group.find({
                            where: {
                                id: groupId,
                            },
                        });
                    }
                    if (groups.length > 0) {
                        const user = User_1.User.create({
                            username,
                            email: email === "" ? null : email,
                            password: hash,
                            groups,
                            isAdministrator,
                        });
                        yield User_1.User.save(user);
                        return user;
                    }
                    else {
                        const user = User_1.User.create({
                            username,
                            email: email === "" ? null : email,
                            password: hash,
                            isAdministrator,
                        });
                        yield User_1.User.save(user);
                        return user;
                    }
                }
                catch (_a) {
                    throw new apollo_client_1.ApolloError({
                        errorMessage: "Failed to create user",
                    });
                }
            }
            else {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT AUTHENTICATED");
            }
        });
    }
    updateUser(id, username, email, groupId, password, isAdministrator, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                try {
                    const user = yield User_1.User.findOne(id);
                    if (user) {
                        if (groupId) {
                            const groups = yield Group_1.Group.find({
                                where: {
                                    id: groupId,
                                },
                            });
                            user.username = username;
                            user.email = email;
                            user.groups = groups;
                            user.isAdministrator = isAdministrator;
                        }
                        else {
                            user.username = username;
                            user.email = email;
                            user.groups = null;
                            user.isAdministrator = isAdministrator;
                        }
                        if (password !== "") {
                            try {
                                const pwd = yield argon2.hash(password);
                                user.password = pwd;
                            }
                            catch (_a) {
                                throw new apollo_client_1.ApolloError({
                                    errorMessage: "Failed to hash password",
                                });
                            }
                        }
                        yield User_1.User.save(user);
                    }
                    return user;
                }
                catch (_b) {
                    throw new apollo_client_1.ApolloError({
                        errorMessage: "Failed to update user",
                    });
                }
            }
            else {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT AUTHENTICATED");
            }
        });
    }
    editProfile(id, username, email, password, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                try {
                    const user = yield User_1.User.findOne(id);
                    if (user) {
                        user.username = username;
                        user.email = email;
                        if (password !== "") {
                            try {
                                const pwd = yield argon2.hash(password);
                                user.password = pwd;
                            }
                            catch (_a) {
                                throw new apollo_client_1.ApolloError({
                                    errorMessage: "Failed to hash password",
                                });
                            }
                        }
                        yield User_1.User.save(user);
                    }
                    return user;
                }
                catch (_b) {
                    throw new apollo_client_1.ApolloError({
                        errorMessage: "Failed to update user",
                    });
                }
            }
            else {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT AUTHENTICATED");
            }
        });
    }
    deleteUser(id, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                try {
                    yield User_1.User.delete(id);
                    return true;
                }
                catch (_a) {
                    throw new apollo_client_1.ApolloError({
                        errorMessage: "Failed to create user",
                    });
                }
                finally {
                    return false;
                }
            }
            else {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT AUTHENTICATED");
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __param(0, type_graphql_1.Arg("id")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userById", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("username")), __param(1, type_graphql_1.Arg("password")), __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg("username")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Arg("email")),
    __param(3, type_graphql_1.Arg("groupId")),
    __param(4, type_graphql_1.Arg("isAdministrator")),
    __param(5, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("username")),
    __param(2, type_graphql_1.Arg("email")),
    __param(3, type_graphql_1.Arg("groupId")),
    __param(4, type_graphql_1.Arg("password")),
    __param(5, type_graphql_1.Arg("isAdministrator")),
    __param(6, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("username")),
    __param(2, type_graphql_1.Arg("email")),
    __param(3, type_graphql_1.Arg("password")),
    __param(4, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "editProfile", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map