import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717480580035 implements MigrationInterface {
    name = 'Migrations1717480580035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "options" character varying NOT NULL, "revealGemCost" integer NOT NULL, "questionType" character varying NOT NULL, "time" integer NOT NULL, "graceTime" integer NOT NULL, "answer" integer NOT NULL, "correctMessage" character varying NOT NULL, "incorrectMessage" character varying NOT NULL, "hint" character varying NOT NULL, "levelId" integer, CONSTRAINT "PK_1a855c8b4f527c9633c4b054675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserEvaluation" ("id" SERIAL NOT NULL, "calification" integer NOT NULL, "evaluationDate" TIMESTAMP NOT NULL, "userId" integer, "levelId" integer, CONSTRAINT "PK_d2f411ae17736409a20bce5daec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Level" ("id" SERIAL NOT NULL, "code" integer NOT NULL, "levelName" character varying NOT NULL, "levelDescription" character varying NOT NULL, "levelTitle" character varying NOT NULL, "timer" integer NOT NULL, "bulb" integer NOT NULL, "blocker" integer NOT NULL, "ads" integer NOT NULL, "gems" integer NOT NULL, "valueTarget" integer NOT NULL, CONSTRAINT "PK_5ac626c80b8754f723851974fb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserInfo" ("id" SERIAL NOT NULL, "deviceName" character varying NOT NULL, "deviceId" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL, "signUpMethod" character varying NOT NULL, "onboardingAccepted" boolean NOT NULL, "userId" integer, CONSTRAINT "REL_4569004e1845f87c6cee88d1bb" UNIQUE ("userId"), CONSTRAINT "PK_5dcb82aacc9a5256f29610285c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Utilities" ("id" SERIAL NOT NULL, "currencies" integer NOT NULL, "lives" integer NOT NULL, "gems" integer NOT NULL, "userId" integer, CONSTRAINT "REL_72719bb40f859c95db91c9006f" UNIQUE ("userId"), CONSTRAINT "PK_92606f8e6acc4a002e39fcf6d2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL, "religion" boolean NOT NULL, "biblicalKnowledge" character varying NOT NULL, "questionType" character varying NOT NULL, "profilePhoto" character varying NOT NULL, "country" character varying NOT NULL, "userInfoId" integer, "utilitiesId" integer, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "REL_cb34e4beed4b8d3d13cb182996" UNIQUE ("userInfoId"), CONSTRAINT "REL_2a244f3efd5c8ef9264e59c96e" UNIQUE ("utilitiesId"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Question" ADD CONSTRAINT "FK_e9a9ec822f0960652ab07d45924" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserEvaluation" ADD CONSTRAINT "FK_4568db9e1b3d98a6f577d44f900" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserEvaluation" ADD CONSTRAINT "FK_1d9e423434556395950a4ddbbbc" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserInfo" ADD CONSTRAINT "FK_4569004e1845f87c6cee88d1bb6" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Utilities" ADD CONSTRAINT "FK_72719bb40f859c95db91c9006f6" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_cb34e4beed4b8d3d13cb182996a" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_2a244f3efd5c8ef9264e59c96e1" FOREIGN KEY ("utilitiesId") REFERENCES "Utilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_2a244f3efd5c8ef9264e59c96e1"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_cb34e4beed4b8d3d13cb182996a"`);
        await queryRunner.query(`ALTER TABLE "Utilities" DROP CONSTRAINT "FK_72719bb40f859c95db91c9006f6"`);
        await queryRunner.query(`ALTER TABLE "UserInfo" DROP CONSTRAINT "FK_4569004e1845f87c6cee88d1bb6"`);
        await queryRunner.query(`ALTER TABLE "UserEvaluation" DROP CONSTRAINT "FK_1d9e423434556395950a4ddbbbc"`);
        await queryRunner.query(`ALTER TABLE "UserEvaluation" DROP CONSTRAINT "FK_4568db9e1b3d98a6f577d44f900"`);
        await queryRunner.query(`ALTER TABLE "Question" DROP CONSTRAINT "FK_e9a9ec822f0960652ab07d45924"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Utilities"`);
        await queryRunner.query(`DROP TABLE "UserInfo"`);
        await queryRunner.query(`DROP TABLE "Level"`);
        await queryRunner.query(`DROP TABLE "UserEvaluation"`);
        await queryRunner.query(`DROP TABLE "Question"`);
    }

}
