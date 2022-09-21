import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUser1661771716474 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
