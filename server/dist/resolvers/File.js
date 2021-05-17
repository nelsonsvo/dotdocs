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
const fs_1 = require("fs");
const graphql_upload_1 = require("graphql-upload");
const path_1 = require("path");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const AppField_1 = require("../entities/AppField");
const AppFile_1 = require("../entities/AppFile");
const FileField_1 = require("../entities/FileField");
const Application_1 = require("./../entities/Application");
const Remark_1 = require("./../entities/Remark");
let fs = require("fs");
let AppFieldInput = class AppFieldInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AppFieldInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AppFieldInput.prototype, "value", void 0);
AppFieldInput = __decorate([
    type_graphql_1.InputType("AppFieldInput")
], AppFieldInput);
exports.AppFieldInput = AppFieldInput;
let AppFieldSearchInput = class AppFieldSearchInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AppFieldSearchInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AppFieldSearchInput.prototype, "value", void 0);
AppFieldSearchInput = __decorate([
    type_graphql_1.InputType("AppFieldSearchInput")
], AppFieldSearchInput);
exports.AppFieldSearchInput = AppFieldSearchInput;
let ApplicationFile = class ApplicationFile {
};
__decorate([
    type_graphql_1.Field(() => AppFile_1.AppFile),
    __metadata("design:type", AppFile_1.AppFile)
], ApplicationFile.prototype, "file", void 0);
__decorate([
    type_graphql_1.Field(() => [FileField_1.FileField]),
    __metadata("design:type", Array)
], ApplicationFile.prototype, "fields", void 0);
ApplicationFile = __decorate([
    type_graphql_1.ObjectType()
], ApplicationFile);
exports.ApplicationFile = ApplicationFile;
let FileResolver = class FileResolver {
    singleUpload({ createReadStream, filename, mimetype }, id, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    if (!req.session.userId) {
                        res.statusCode = 401;
                        throw new apollo_server_errors_1.AuthenticationError("USER NOT AUTHENTICATED");
                    }
                    const app = yield Application_1.Application.findOne({ id });
                    console.log(app);
                    if (app) {
                        const guid = uuid_1.v4();
                        let dir = path_1.join(__dirname, `/../../files/${app.name}`);
                        try {
                            if (!fs.existsSync(dir)) {
                                fs.mkdirSync(dir, { recursive: true });
                            }
                        }
                        catch (err) {
                            console.log("error creating directories", err);
                        }
                        const fileExtension = filename.split(/\.(?=[^\.]+$)/)[1];
                        const newFileName = guid + "." + fileExtension;
                        createReadStream()
                            .pipe(fs_1.createWriteStream(dir + `/${newFileName}`))
                            .on("finish", () => __awaiter(this, void 0, void 0, function* () {
                            let file = new AppFile_1.AppFile();
                            if (app) {
                                file.application = app;
                                file.filename = newFileName;
                                file.mimetype = mimetype;
                                file.old_filename = filename;
                                console.log(dir + filename);
                                file.location = `/files/${app.name}/${file.filename}`;
                                try {
                                    file = yield AppFile_1.AppFile.save(file);
                                }
                                catch (err) {
                                    console.log(err);
                                    reject();
                                }
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
    indexFile(fields, id, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT LOGGED IN");
            }
            console.log(id);
            fields.forEach((field) => __awaiter(this, void 0, void 0, function* () {
                const newField = new FileField_1.FileField();
                const appField = yield AppField_1.AppField.findOne({ id: field.id });
                const file = yield AppFile_1.AppFile.findOne({ id });
                if (file && appField) {
                    const id = uuid_1.v4();
                    newField.id = id;
                    newField.field = appField;
                    newField.name = appField.name;
                    newField.value = field.value;
                    newField.value_id_string = newField.field.id + "_" + field.value;
                    newField.file = file;
                    FileField_1.FileField.save(newField);
                }
            }));
            return true;
        });
    }
    deleteFiles(id, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT LOGGED IN");
            }
            try {
                AppFile_1.AppFile.delete(id);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    getFiles(id, fields, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT LOGGED IN");
            }
            let concatValues = [];
            let allNull = true;
            fields.map((f) => {
                if (f.value !== "") {
                    concatValues = [...concatValues, f.id + "_" + f.value];
                    allNull = false;
                }
            });
            if (allNull) {
                return yield AppFile_1.AppFile.find({ where: { application: id } });
            }
            else {
                console.log("concatValues", concatValues);
                const entityManager = typeorm_1.getManager();
                let PARAMS = "";
                let param_arr = [];
                concatValues.forEach((val, index) => {
                    var num = index + 1;
                    PARAMS += "$" + num + ",";
                    param_arr.push(val);
                });
                param_arr.push(concatValues.length);
                console.log("params", PARAMS);
                const lastParam = concatValues.length + 1;
                const fieldResults = yield entityManager.query(`SELECT
      "file"."id" AS "file_id",
      "file"."filename" AS "file_filename",
      "file"."old_filename" AS "file_old_filename",
      "file"."mimetype" AS "file_mimetype",
      "file"."location" AS "file_location",
      "file"."createdAt" AS "file_createdAt",
      "file"."updatedAt" AS "file_updatedAt",
      "file"."applicationId" AS "file_applicationId"
    FROM
      "file_field" "field"
      LEFT JOIN "app_file" "file" ON "file"."id" = "field"."fileId"
    WHERE
      "field"."value_id_string" IN (${PARAMS.substring(0, PARAMS.length - 1)})
    GROUP BY
      "file"."id"
    HAVING
      count(DISTINCT "field"."value_id_string") = ${"$" + lastParam}`, param_arr);
                console.log(fieldResults);
                let appIds = [];
                fieldResults.forEach((file) => {
                    if (!appIds.includes(file.file_id)) {
                        appIds.push(file.file_id);
                    }
                });
                console.log(appIds);
                const res = yield AppFile_1.AppFile.find({
                    relations: ["fields", "fields.field"],
                    where: {
                        id: typeorm_1.In(appIds),
                    },
                });
                return res;
            }
        });
    }
    addRemark(id, message, author, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT LOGGED IN");
            }
            try {
                const file = yield AppFile_1.AppFile.findOne(id);
                const remark = Remark_1.Remark.create({
                    file,
                    message: message,
                    author: author,
                });
                yield Remark_1.Remark.save(remark);
                return remark;
            }
            catch (_a) {
                return false;
            }
        });
    }
    getRemarks(id, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                res.statusCode = 401;
                throw new apollo_server_errors_1.AuthenticationError("USER NOT LOGGED IN");
            }
            try {
                const remarks = yield Remark_1.Remark.find({
                    where: {
                        file: id,
                    },
                });
                console.log(remarks);
                return remarks;
            }
            catch (_a) {
                throw new apollo_client_1.ApolloError({ errorMessage: "there was an error fetching remarks" });
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => AppFile_1.AppFile),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Arg("id", () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "singleUpload", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("fields", () => [AppFieldInput])),
    __param(1, type_graphql_1.Arg("id")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "indexFile", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => [String])), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "deleteFiles", null);
__decorate([
    type_graphql_1.Query(() => [AppFile_1.AppFile]),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("fields", () => [AppFieldSearchInput])),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "getFiles", null);
__decorate([
    type_graphql_1.Mutation(() => Remark_1.Remark || Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("message")),
    __param(2, type_graphql_1.Arg("author")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "addRemark", null);
__decorate([
    type_graphql_1.Query(() => [Remark_1.Remark]),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "getRemarks", null);
FileResolver = __decorate([
    type_graphql_1.Resolver()
], FileResolver);
exports.FileResolver = FileResolver;
//# sourceMappingURL=File.js.map