import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717481046664 implements MigrationInterface {
    name = 'Migrations1717481046664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "levelId" integer`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_679b0433dd2e090a13455538199" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_679b0433dd2e090a13455538199"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "levelId"`);
    }

}
