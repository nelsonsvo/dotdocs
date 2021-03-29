"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class UserMigration1617006798976 {
    constructor() {
        this.name = 'UserMigration1617006798976';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_608bb41e7e1ef5f6d7abb07e394" UNIQUE ("name"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "app_field" ("id" uuid NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "max_length" integer NOT NULL, "applicationId" uuid, CONSTRAINT "PK_836f39404efa3f4cd9a8a044e6e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "app_field" ADD CONSTRAINT "FK_c23d869c29983ddfb4dffdcbd54" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "app_field" DROP CONSTRAINT "FK_c23d869c29983ddfb4dffdcbd54"`);
            yield queryRunner.query(`DROP TABLE "app_field"`);
            yield queryRunner.query(`DROP TABLE "application"`);
        });
    }
}
exports.UserMigration1617006798976 = UserMigration1617006798976;
//# sourceMappingURL=1617006798976-UserMigration.js.map