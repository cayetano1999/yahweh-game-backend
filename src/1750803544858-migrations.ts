import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1750803544858 implements MigrationInterface {
    name = 'Migrations1750803544858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FeedBack" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL, "message" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_30551d05db094ab7d892f0f5a33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "options" character varying, "revealGemCost" integer NOT NULL, "questionType" character varying NOT NULL, "time" integer NOT NULL, "graceTime" integer NOT NULL, "answer" character varying NOT NULL, "correctMessage" character varying NOT NULL, "incorrectMessage" character varying NOT NULL, "hint" character varying NOT NULL, "levelId" integer, CONSTRAINT "PK_1a855c8b4f527c9633c4b054675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserEvaluation" ("id" SERIAL NOT NULL, "calification" integer NOT NULL, "evaluationDate" TIMESTAMP NOT NULL, "userId" integer, "levelId" integer, CONSTRAINT "PK_d2f411ae17736409a20bce5daec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Level" ("id" SERIAL NOT NULL, "code" integer NOT NULL, "levelName" character varying NOT NULL, "levelDescription" character varying NOT NULL, "levelTitle" character varying NOT NULL, "timer" integer NOT NULL, "bulb" integer NOT NULL, "blocker" integer NOT NULL, "ads" integer NOT NULL, "gems" integer NOT NULL, "valueTarget" integer NOT NULL, "reward" integer, "nextLevel" integer, CONSTRAINT "PK_5ac626c80b8754f723851974fb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserInfo" ("id" SERIAL NOT NULL, "deviceName" character varying NOT NULL, "deviceId" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL, "signUpMethod" character varying NOT NULL, "onboardingAccepted" boolean NOT NULL, CONSTRAINT "PK_5dcb82aacc9a5256f29610285c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL, "religion" boolean NOT NULL, "biblicalKnowledge" character varying NOT NULL, "questionType" character varying NOT NULL, "profilePhoto" character varying NOT NULL, "country" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "pushToken" character varying, "userInfoId" integer, "levelId" integer, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "REL_cb34e4beed4b8d3d13cb182996" UNIQUE ("userInfoId"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Utilities" ("id" SERIAL NOT NULL, "currencies" integer NOT NULL, "lives" integer NOT NULL, "gems" integer NOT NULL, "userId" integer, CONSTRAINT "REL_72719bb40f859c95db91c9006f" UNIQUE ("userId"), CONSTRAINT "PK_92606f8e6acc4a002e39fcf6d2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Chapter" ("id" SERIAL NOT NULL, "chapterNumber" integer NOT NULL, "hitsCount" integer NOT NULL DEFAULT '0', "doublesCount" integer NOT NULL DEFAULT '0', "triplesCount" integer NOT NULL DEFAULT '0', "homeRunsCount" integer NOT NULL DEFAULT '0', "basesOnBallsCount" integer NOT NULL DEFAULT '0', "bookName" character varying, "verses" integer, CONSTRAINT "PK_84a8858fa4e77356f6ce9d34a30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Game" ("id" SERIAL NOT NULL, "initialDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP, "gameDuration" integer NOT NULL DEFAULT '0', "innings" integer NOT NULL DEFAULT '0', "errorsTeamA" integer NOT NULL DEFAULT '0', "errorsTeamB" integer NOT NULL DEFAULT '0', "hitsTeamA" integer NOT NULL DEFAULT '0', "hitsTeamB" integer NOT NULL DEFAULT '0', "runsTeamA" integer NOT NULL DEFAULT '0', "runsTeamB" integer NOT NULL DEFAULT '0', "teamWinnerId" integer NOT NULL DEFAULT '0', "teamAId" integer, "teamBId" integer, "homeClubTeamId" integer, CONSTRAINT "PK_cce0ee17147c1830d09c19d4d56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slogan" character varying, "logo" character varying, "colorBase" character varying, "churchId" integer, CONSTRAINT "PK_8554c501e90dd529b09923447ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Church" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo" character varying, CONSTRAINT "PK_ca131feddb34d4cbe5294cb537e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Player" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "picture" character varying, "teamId" integer, "chapterId" integer, "churchId" integer, CONSTRAINT "PK_c390d9968607986a5f038e3305e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Shift" ("id" SERIAL NOT NULL, "shiftType" character varying NOT NULL, "result" boolean NOT NULL, "rbis" integer NOT NULL DEFAULT '0', "verses" character varying, "playerId" integer, "gameId" integer, CONSTRAINT "PK_7ad7021c79529f4efeaceb5b874" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Inning" ("id" SERIAL NOT NULL, "inning" integer, "runsTeamA" integer, "runsTeamB" integer, "gameId" integer, CONSTRAINT "PK_207efff1a9fc534e724ba44847f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "FeedBack" ADD CONSTRAINT "FK_922b8201c51f36bbb000459b6fa" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Question" ADD CONSTRAINT "FK_e9a9ec822f0960652ab07d45924" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserEvaluation" ADD CONSTRAINT "FK_4568db9e1b3d98a6f577d44f900" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserEvaluation" ADD CONSTRAINT "FK_1d9e423434556395950a4ddbbbc" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_cb34e4beed4b8d3d13cb182996a" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_679b0433dd2e090a13455538199" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Utilities" ADD CONSTRAINT "FK_72719bb40f859c95db91c9006f6" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_8a66a908a27c06fe4ea33f61339" FOREIGN KEY ("teamAId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_28c970512b2d691f7f214ac6828" FOREIGN KEY ("teamBId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_94aff8b7e0717f060f23ae19338" FOREIGN KEY ("homeClubTeamId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Team" ADD CONSTRAINT "FK_f83937665d91f6df2084e9983a8" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Player" ADD CONSTRAINT "FK_9d037d75f97d44206181488840f" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Player" ADD CONSTRAINT "FK_f88c00856980137c4202c005fc6" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Player" ADD CONSTRAINT "FK_748e36a21488abbdf7f21f64f2b" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Shift" ADD CONSTRAINT "FK_02e0f230c07058c02f72d3707b9" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Shift" ADD CONSTRAINT "FK_4ff52d21050394e42353135635a" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD CONSTRAINT "FK_d75805247faceba189540c9680e" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Inning" DROP CONSTRAINT "FK_d75805247faceba189540c9680e"`);
        await queryRunner.query(`ALTER TABLE "Shift" DROP CONSTRAINT "FK_4ff52d21050394e42353135635a"`);
        await queryRunner.query(`ALTER TABLE "Shift" DROP CONSTRAINT "FK_02e0f230c07058c02f72d3707b9"`);
        await queryRunner.query(`ALTER TABLE "Player" DROP CONSTRAINT "FK_748e36a21488abbdf7f21f64f2b"`);
        await queryRunner.query(`ALTER TABLE "Player" DROP CONSTRAINT "FK_f88c00856980137c4202c005fc6"`);
        await queryRunner.query(`ALTER TABLE "Player" DROP CONSTRAINT "FK_9d037d75f97d44206181488840f"`);
        await queryRunner.query(`ALTER TABLE "Team" DROP CONSTRAINT "FK_f83937665d91f6df2084e9983a8"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_94aff8b7e0717f060f23ae19338"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_28c970512b2d691f7f214ac6828"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_8a66a908a27c06fe4ea33f61339"`);
        await queryRunner.query(`ALTER TABLE "Utilities" DROP CONSTRAINT "FK_72719bb40f859c95db91c9006f6"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_679b0433dd2e090a13455538199"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_cb34e4beed4b8d3d13cb182996a"`);
        await queryRunner.query(`ALTER TABLE "UserEvaluation" DROP CONSTRAINT "FK_1d9e423434556395950a4ddbbbc"`);
        await queryRunner.query(`ALTER TABLE "UserEvaluation" DROP CONSTRAINT "FK_4568db9e1b3d98a6f577d44f900"`);
        await queryRunner.query(`ALTER TABLE "Question" DROP CONSTRAINT "FK_e9a9ec822f0960652ab07d45924"`);
        await queryRunner.query(`ALTER TABLE "FeedBack" DROP CONSTRAINT "FK_922b8201c51f36bbb000459b6fa"`);
        await queryRunner.query(`DROP TABLE "Inning"`);
        await queryRunner.query(`DROP TABLE "Shift"`);
        await queryRunner.query(`DROP TABLE "Player"`);
        await queryRunner.query(`DROP TABLE "Church"`);
        await queryRunner.query(`DROP TABLE "Team"`);
        await queryRunner.query(`DROP TABLE "Game"`);
        await queryRunner.query(`DROP TABLE "Chapter"`);
        await queryRunner.query(`DROP TABLE "Utilities"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "UserInfo"`);
        await queryRunner.query(`DROP TABLE "Level"`);
        await queryRunner.query(`DROP TABLE "UserEvaluation"`);
        await queryRunner.query(`DROP TABLE "Question"`);
        await queryRunner.query(`DROP TABLE "FeedBack"`);
    }

}
