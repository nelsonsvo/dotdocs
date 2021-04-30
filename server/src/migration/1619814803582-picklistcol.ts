import {MigrationInterface, QueryRunner} from "typeorm";

export class picklistcol1619814803582 implements MigrationInterface {
    name = 'picklistcol1619814803582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_field" ALTER COLUMN "picklist_values" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "app_field"."picklist_values" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "app_field"."picklist_values" IS NULL`);
        await queryRunner.query(`ALTER TABLE "app_field" ALTER COLUMN "picklist_values" SET NOT NULL`);
    }

}
