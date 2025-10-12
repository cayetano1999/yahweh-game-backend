import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756525853969 implements MigrationInterface {
    name = 'Migrations1756525853969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tournament" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tournament" DROP COLUMN "isDeleted"`);
    }

}
