import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756252449841 implements MigrationInterface {
    name = 'Migrations1756252449841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Game" ADD "gameType" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Game" DROP COLUMN "gameType"`);
    }

}
