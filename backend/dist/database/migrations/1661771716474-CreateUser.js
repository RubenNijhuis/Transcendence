"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1661771716474 = void 0;
class CreateUser1661771716474 {
    constructor() {
        this.name = 'CreateUser1661771716474';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" BIGSERIAL NOT NULL, "uid" character varying NOT NULL DEFAULT '', "username" character varying NOT NULL DEFAULT '', "img_url" character varying NOT NULL DEFAULT '', "email_address" character varying NOT NULL DEFAULT '', "rank" integer NOT NULL DEFAULT '0', "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', "friendlist" character varying NOT NULL DEFAULT '[]', "blocklist" character varying NOT NULL DEFAULT '[]', "twoFactorAuthenticationSecret" character varying NOT NULL DEFAULT '2FA_SECRET', "isTwoFactorAuthenticationEnabled" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.CreateUser1661771716474 = CreateUser1661771716474;
//# sourceMappingURL=1661771716474-CreateUser.js.map