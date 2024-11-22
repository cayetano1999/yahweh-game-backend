import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1723921104261 implements MigrationInterface {
    name = 'Migrations1723921104261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Shift" ADD "verses" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Shift" DROP COLUMN "verses"`);
    }

}
