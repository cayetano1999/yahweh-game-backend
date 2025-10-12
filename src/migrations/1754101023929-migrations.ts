import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1754101023929 implements MigrationInterface {
    name = 'Migrations1754101023929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" ADD "roomMessages" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "roomMessages"`);
    }

}
