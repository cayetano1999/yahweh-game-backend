import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717617692727 implements MigrationInterface {
    name = 'Migrations1717617692727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Question" ALTER COLUMN "options" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Question" DROP COLUMN "answer"`);
        await queryRunner.query(`ALTER TABLE "Question" ADD "answer" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Question" ALTER COLUMN "options" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Question" ALTER COLUMN "options" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Question" DROP COLUMN "answer"`);
        await queryRunner.query(`ALTER TABLE "Question" ADD "answer" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Question" ALTER COLUMN "options" SET NOT NULL`);
    }

}
