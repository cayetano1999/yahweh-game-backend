import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1750464531809 implements MigrationInterface {
    name = 'Migrations1750464531809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "User" ADD "pushToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "pushToken"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "active"`);
    }

}
