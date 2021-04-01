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
const fs_1 = require("fs");
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const AppField_1 = require("../entities/AppField");
const AppFile_1 = require("../entities/AppFile");
const FileField_1 = require("../entities/FileField");
const AppField_2 = require("./../entities/AppField");
const Application_1 = require("./../entities/Application");
let ApplicationResolver = class ApplicationResolver {
    applications() {
        return __awaiter(this, void 0, void 0, function* () {
            const apps = yield Application_1.Application.find({ relations: ["fields"] });
            return apps;
        });
    }
    createApplication(name, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let app = Application_1.Application.create({ name, fields: fields });
                app = yield Application_1.Application.save(app);
                return app;
            }
            catch (e) {
                throw new apollo_client_1.ApolloError({
                    errorMessage: e,
                });
            }
        });
    }
    deleteApplication(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Application_1.Application.delete({ id });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    singleUpload({ createReadStream, filename, mimetype }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    return createReadStream()
                        .pipe(fs_1.createWriteStream(__dirname + `/../../files/${filename}`))
                        .on("finish", () => __awaiter(this, void 0, void 0, function* () {
                        let file = new AppFile_1.AppFile();
                        const app = yield Application_1.Application.findOne({ id });
                        if (app) {
                            file.application = app;
                            file.filename = filename;
                            file.mimetype = mimetype;
                            file.location = `/files/${filename}`;
                            file = yield AppFile_1.AppFile.save(file);
                        }
                        console.log(file);
                        resolve(file);
                    }))
                        .on("error", () => reject());
                }));
            }
        });
    }
    indexFile(fields, id) {
        return __awaiter(this, void 0, void 0, function* () {
            fields.forEach((field) => __awaiter(this, void 0, void 0, function* () {
                const newField = new FileField_1.FileField();
                const appField = yield AppField_1.AppField.findOne({ id: field.id });
                const file = yield AppFile_1.AppFile.findOne({ id });
                if (file && appField) {
                    newField.field = appField;
                    newField.name = appField.name;
                    newField.value = field.value;
                    newField.file = file;
                    FileField_1.FileField.save(newField);
                }
            }));
            return true;
        });
    }
    getFiles(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let app = yield Application_1.Application.find({ relations: ["files"] });
            app = app.filter((a) => a.id === id);
            return app[0].files;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Application_1.Application]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "applications", null);
__decorate([
    type_graphql_1.Mutation(() => Application_1.Application),
    __param(0, type_graphql_1.Arg("name")),
    __param(1, type_graphql_1.Arg("fields", () => [AppField_1.AppField])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "createApplication", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "deleteApplication", null);
__decorate([
    type_graphql_1.Mutation(() => AppFile_1.AppFile),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Arg("id", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "singleUpload", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("fields", () => [AppField_2.AppFieldInput])),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "indexFile", null);
__decorate([
    type_graphql_1.Query(() => [AppFile_1.AppFile]),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "getFiles", null);
ApplicationResolver = __decorate([
    type_graphql_1.Resolver()
], ApplicationResolver);
exports.ApplicationResolver = ApplicationResolver;
//# sourceMappingURL=Application.js.map