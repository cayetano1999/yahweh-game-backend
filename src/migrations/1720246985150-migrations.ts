import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720246985150 implements MigrationInterface {
    name = 'Migrations1720246985150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Chapter" ("id" SERIAL NOT NULL, "chapterNumber" integer NOT NULL, "hitsCount" integer NOT NULL DEFAULT '0', "doublesCount" integer NOT NULL DEFAULT '0', "triplesCount" integer NOT NULL DEFAULT '0', "homeRunsCount" integer NOT NULL DEFAULT '0', "basesOnBallsCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_84a8858fa4e77356f6ce9d34a30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Game" ("id" SERIAL NOT NULL, "initialDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP, "gameDuration" integer NOT NULL DEFAULT '0', "innings" integer NOT NULL DEFAULT '0', "errorsTeamA" integer NOT NULL DEFAULT '0', "errorsTeamB" integer NOT NULL DEFAULT '0', "hitsTeamA" integer NOT NULL DEFAULT '0', "hitsTeamB" integer NOT NULL DEFAULT '0', "runsTeamA" integer NOT NULL DEFAULT '0', "runsTeamB" integer NOT NULL DEFAULT '0', "homeClubTeam" character varying, "teamAId" integer, "teamBId" integer, "winnerId" integer, CONSTRAINT "PK_cce0ee17147c1830d09c19d4d56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Inning" ("id" SERIAL NOT NULL, "runs" integer NOT NULL DEFAULT '0', "teamId" integer, CONSTRAINT "PK_207efff1a9fc534e724ba44847f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slogan" character varying, "logo" character varying, "colorBase" character varying, "churchId" integer, CONSTRAINT "PK_8554c501e90dd529b09923447ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Church" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo" character varying, CONSTRAINT "PK_ca131feddb34d4cbe5294cb537e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Player" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "picture" character varying, "teamId" integer, "chapterId" integer, "churchId" integer, CONSTRAINT "PK_c390d9968607986a5f038e3305e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Shift" ("id" SERIAL NOT NULL, "shiftType" character varying NOT NULL, "result" character varying NOT NULL, "rbis" integer NOT NULL DEFAULT '0', "playerId" integer, "gameId" integer, CONSTRAINT "PK_7ad7021c79529f4efeaceb5b874" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_8a66a908a27c06fe4ea33f61339" FOREIGN KEY ("teamAId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_28c970512b2d691f7f214ac6828" FOREIGN KEY ("teamBId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_c2556056b9265890892d8b7ed83" FOREIGN KEY ("winnerId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD CONSTRAINT "FK_4171a1f3045689c65a80dde6611" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Team" ADD CONSTRAINT "FK_f83937665d91f6df2084e9983a8" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Player" ADD CONSTRAINT "FK_9d037d75f97d44206181488840f" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Player" ADD CONSTRAINT "FK_f88c00856980137c4202c005fc6" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Player" ADD CONSTRAINT "FK_748e36a21488abbdf7f21f64f2b" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Shift" ADD CONSTRAINT "FK_02e0f230c07058c02f72d3707b9" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Shift" ADD CONSTRAINT "FK_4ff52d21050394e42353135635a" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Shift" DROP CONSTRAINT "FK_4ff52d21050394e42353135635a"`);
        await queryRunner.query(`ALTER TABLE "Shift" DROP CONSTRAINT "FK_02e0f230c07058c02f72d3707b9"`);
        await queryRunner.query(`ALTER TABLE "Player" DROP CONSTRAINT "FK_748e36a21488abbdf7f21f64f2b"`);
        await queryRunner.query(`ALTER TABLE "Player" DROP CONSTRAINT "FK_f88c00856980137c4202c005fc6"`);
        await queryRunner.query(`ALTER TABLE "Player" DROP CONSTRAINT "FK_9d037d75f97d44206181488840f"`);
        await queryRunner.query(`ALTER TABLE "Team" DROP CONSTRAINT "FK_f83937665d91f6df2084e9983a8"`);
        await queryRunner.query(`ALTER TABLE "Inning" DROP CONSTRAINT "FK_4171a1f3045689c65a80dde6611"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_c2556056b9265890892d8b7ed83"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_28c970512b2d691f7f214ac6828"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_8a66a908a27c06fe4ea33f61339"`);
        await queryRunner.query(`DROP TABLE "Shift"`);
        await queryRunner.query(`DROP TABLE "Player"`);
        await queryRunner.query(`DROP TABLE "Church"`);
        await queryRunner.query(`DROP TABLE "Team"`);
        await queryRunner.query(`DROP TABLE "Inning"`);
        await queryRunner.query(`DROP TABLE "Game"`);
        await queryRunner.query(`DROP TABLE "Chapter"`);
    }

}
