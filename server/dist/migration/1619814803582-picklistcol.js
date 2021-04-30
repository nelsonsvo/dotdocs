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
class picklistcol1619814803582 {
    constructor() {
        this.name = 'picklistcol1619814803582';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "app_field" ALTER COLUMN "picklist_values" DROP NOT NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "app_field"."picklist_values" IS NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`COMMENT ON COLUMN "app_field"."picklist_values" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "app_field" ALTER COLUMN "picklist_values" SET NOT NULL`);
        });
    }
}
exports.picklistcol1619814803582 = picklistcol1619814803582;
//# sourceMappingURL=1619814803582-picklistcol.js.map