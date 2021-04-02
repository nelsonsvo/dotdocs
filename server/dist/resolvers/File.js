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
const fs_1 = require("fs");
const graphql_upload_1 = require("graphql-upload");
const path_1 = require("path");
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
const AppField_1 = require("../entities/AppField");
const AppFile_1 = require("../entities/AppFile");
const FileField_1 = require("../entities/FileField");
const AppField_2 = require("./../entities/AppField");
const Application_1 = require("./../entities/Application");
var fs = require("fs");
let FileResolver = class FileResolver {
    singleUpload({ createReadStream, filename, mimetype }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const app = yield Application_1.Application.findOne({ id });
                    if (app) {
                        const guid = uuid_1.v4();
                        const extension = mimetype.split("/")[1];
                        createReadStream()
                            .pipe(fs_1.createWriteStream(__dirname + `/../../files/${app.name}/${guid}.${extension}`))
                            .on("finish", () => __awaiter(this, void 0, void 0, function* () {
                            let file = new AppFile_1.AppFile();
                            if (app) {
                                file.application = app;
                                file.filename = guid + "." + extension;
                                file.mimetype = mimetype;
                                file.old_filename = filename;
                                let dir = path_1.join(__dirname, `/../../files/${app.name}/`);
                                if (!fs.existsSync(dir)) {
                                    fs.mkdirSync(dir);
                                }
                                console.log(dir + filename);
                                file.location = `/files/${app.name}/${guid}.${extension}`;
                                file = yield AppFile_1.AppFile.save(file);
                            }
                            console.log(file);
                            resolve(file);
                        }))
                            .on("error", () => reject());
                    }
                    else {
                        reject();
                    }
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
    type_graphql_1.Mutation(() => AppFile_1.AppFile),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Arg("id", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "singleUpload", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("fields", () => [AppField_2.AppFieldInput])),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "indexFile", null);
__decorate([
    type_graphql_1.Query(() => [AppFile_1.AppFile]),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "getFiles", null);
FileResolver = __decorate([
    type_graphql_1.Resolver()
], FileResolver);
exports.FileResolver = FileResolver;
//# sourceMappingURL=File.js.map