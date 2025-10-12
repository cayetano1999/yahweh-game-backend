import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756525264233 implements MigrationInterface {
    name = 'Migrations1756525264233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Game" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Game" DROP COLUMN "isDeleted"`);
    }

}
