import {MigrationInterface, QueryRunner} from "typeorm";

export class picklistcol1619814693970 implements MigrationInterface {
    name = 'picklistcol1619814693970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_field" ADD "picklist_values" text array NOT NULL DEFAULT '{}'::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_field" DROP COLUMN "picklist_values"`);
    }

}
