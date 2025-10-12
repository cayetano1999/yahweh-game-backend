import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1754154135617 implements MigrationInterface {
    name = 'Migrations1754154135617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "UQ_fc7069d24327ad75fe94984281b"`);
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "Room" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "UQ_fc7069d24327ad75fe94984281b" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "UQ_fc7069d24327ad75fe94984281b"`);
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "Room" ADD "code" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "Room" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "UQ_fc7069d24327ad75fe94984281b" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "UQ_fc7069d24327ad75fe94984281b"`);
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "Room" ADD "code" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "UQ_fc7069d24327ad75fe94984281b" UNIQUE ("code")`);
    }

}
