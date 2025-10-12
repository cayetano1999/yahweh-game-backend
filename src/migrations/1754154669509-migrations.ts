import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1754154669509 implements MigrationInterface {
    name = 'Migrations1754154669509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "Room" ADD "code" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "Room" ADD "code" integer NOT NULL`);
    }

}
