import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756524104784 implements MigrationInterface {
    name = 'Migrations1756524104784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Team" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Team" DROP COLUMN "isDeleted"`);
    }

}
