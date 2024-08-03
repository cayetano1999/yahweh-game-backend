import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722027112551 implements MigrationInterface {
    name = 'Migrations1722027112551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Chapter" ADD "verses" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Chapter" DROP COLUMN "verses"`);
    }

}
