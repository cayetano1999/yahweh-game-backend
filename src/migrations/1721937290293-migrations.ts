import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721937290293 implements MigrationInterface {
    name = 'Migrations1721937290293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Inning" DROP CONSTRAINT "FK_4171a1f3045689c65a80dde6611"`);
        await queryRunner.query(`ALTER TABLE "Inning" DROP COLUMN "runs"`);
        await queryRunner.query(`ALTER TABLE "Inning" DROP COLUMN "teamId"`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD "inning" integer`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD "runsTeamA" integer`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD "runsTeamB" integer`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD "gameId" integer`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD CONSTRAINT "FK_d75805247faceba189540c9680e" FOREIGN KEY ("gameId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Inning" DROP CONSTRAINT "FK_d75805247faceba189540c9680e"`);
        await queryRunner.query(`ALTER TABLE "Inning" DROP COLUMN "gameId"`);
        await queryRunner.query(`ALTER TABLE "Inning" DROP COLUMN "runsTeamB"`);
        await queryRunner.query(`ALTER TABLE "Inning" DROP COLUMN "runsTeamA"`);
        await queryRunner.query(`ALTER TABLE "Inning" DROP COLUMN "inning"`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD "teamId" integer`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD "runs" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD CONSTRAINT "FK_4171a1f3045689c65a80dde6611" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
