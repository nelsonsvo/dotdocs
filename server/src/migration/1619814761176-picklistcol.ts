import {MigrationInterface, QueryRunner} from "typeorm";

export class picklistcol1619814761176 implements MigrationInterface {
    name = 'picklistcol1619814761176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "app_field"."picklist_values" IS NULL`);
        await queryRunner.query(`ALTER TABLE "app_field" ALTER COLUMN "picklist_values" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_field" ALTER COLUMN "picklist_values" SET DEFAULT '{}'`);
        await queryRunner.query(`COMMENT ON COLUMN "app_field"."picklist_values" IS NULL`);
    }

}
