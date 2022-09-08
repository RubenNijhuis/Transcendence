import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1661971166323 implements MigrationInterface {
    name = 'CreateTables1661971166323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" BIGSERIAL NOT NULL, "intra_id" character varying, "username" character varying, "img_url" character varying NOT NULL DEFAULT '', "rank" integer NOT NULL DEFAULT '0', "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', "twoFactorAuthenticationSecret" character varying NOT NULL DEFAULT '2FA_SECRET', "isTwoFactorAuthenticationEnabled" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_b6b30080359ecd92bb2571c6336" UNIQUE ("intra_id"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "friend_list" ("id" BIGSERIAL NOT NULL, "users" character varying, "friends" character varying, CONSTRAINT "PK_2e2f53fdfb181a93b04f979c4a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "block_list" ("id" BIGSERIAL NOT NULL, "users" character varying, "blocked" character varying, CONSTRAINT "PK_2d5483a1c23eab6a21c8f4792c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend_requests" ("id" BIGSERIAL NOT NULL, "users" character varying, "requested" character varying, CONSTRAINT "PK_3827ba86ce64ecb4b90c92eeea6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "friend_requests"`);
        await queryRunner.query(`DROP TABLE "block_list"`);
        await queryRunner.query(`DROP TABLE "friend_list"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
