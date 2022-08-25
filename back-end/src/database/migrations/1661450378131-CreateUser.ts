import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1661450378131 implements MigrationInterface {
    name = 'CreateUser1661450378131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" BIGSERIAL NOT NULL, "uid" character varying NOT NULL DEFAULT '', "username" character varying NOT NULL DEFAULT '', "img_url" character varying NOT NULL DEFAULT '', "email_address" character varying NOT NULL DEFAULT '', "rank" integer NOT NULL DEFAULT '0', "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', "friendlist" character varying NOT NULL DEFAULT '', "blocklist" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
