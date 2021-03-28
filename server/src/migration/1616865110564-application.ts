import {MigrationInterface, QueryRunner} from "typeorm";

export class application1616865110564 implements MigrationInterface {
    name = 'application1616865110564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_608bb41e7e1ef5f6d7abb07e394" UNIQUE ("name"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_field" ("id" uuid NOT NULL, "type" text NOT NULL, "username" text NOT NULL, "max_length" integer NOT NULL, "applicationId" uuid, CONSTRAINT "UQ_240e2eb551315d6b4493cfec277" UNIQUE ("username"), CONSTRAINT "PK_836f39404efa3f4cd9a8a044e6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "user_type" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "app_field" ADD CONSTRAINT "FK_c23d869c29983ddfb4dffdcbd54" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_field" DROP CONSTRAINT "FK_c23d869c29983ddfb4dffdcbd54"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "app_field"`);
        await queryRunner.query(`DROP TABLE "application"`);
    }

}