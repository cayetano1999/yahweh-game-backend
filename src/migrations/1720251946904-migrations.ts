import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720251946904 implements MigrationInterface {
    name = 'Migrations1720251946904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_c2556056b9265890892d8b7ed83"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP COLUMN "winnerId"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP COLUMN "homeClubTeam"`);
        await queryRunner.query(`ALTER TABLE "Chapter" ADD "bookName" character varying`);
        await queryRunner.query(`ALTER TABLE "Game" ADD "homeClubTeamId" integer`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_94aff8b7e0717f060f23ae19338" FOREIGN KEY ("homeClubTeamId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_94aff8b7e0717f060f23ae19338"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP COLUMN "homeClubTeamId"`);
        await queryRunner.query(`ALTER TABLE "Chapter" DROP COLUMN "bookName"`);
        await queryRunner.query(`ALTER TABLE "Game" ADD "homeClubTeam" character varying`);
        await queryRunner.query(`ALTER TABLE "Game" ADD "winnerId" integer`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_c2556056b9265890892d8b7ed83" FOREIGN KEY ("winnerId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
