import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1723258915051 implements MigrationInterface {
    name = 'Migrations1723258915051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Game" ADD "teamWinnerId" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Game" DROP COLUMN "teamWinnerId"`);
    }

}
