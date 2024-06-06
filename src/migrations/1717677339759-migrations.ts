import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717677339759 implements MigrationInterface {
    name = 'Migrations1717677339759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Level" ADD "reward" integer`);
        await queryRunner.query(`ALTER TABLE "Level" ADD "nextLevel" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Level" DROP COLUMN "nextLevel"`);
        await queryRunner.query(`ALTER TABLE "Level" DROP COLUMN "reward"`);
    }

}
