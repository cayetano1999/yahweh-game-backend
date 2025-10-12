import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756525516119 implements MigrationInterface {
    name = 'Migrations1756525516119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Church" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Player" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Player" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "Church" DROP COLUMN "isDeleted"`);
    }

}
