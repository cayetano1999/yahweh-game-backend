import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1775706352130 implements MigrationInterface {
    name = 'Migrations1775706352130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Player" ADD "verses" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Player" DROP COLUMN "verses"`);
    }

}
