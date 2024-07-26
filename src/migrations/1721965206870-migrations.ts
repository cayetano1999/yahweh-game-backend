import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721965206870 implements MigrationInterface {
    name = 'Migrations1721965206870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Shift" DROP COLUMN "result"`);
        await queryRunner.query(`ALTER TABLE "Shift" ADD "result" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Shift" DROP COLUMN "result"`);
        await queryRunner.query(`ALTER TABLE "Shift" ADD "result" character varying NOT NULL`);
    }

}
