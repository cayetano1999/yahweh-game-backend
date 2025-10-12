import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1754094729643 implements MigrationInterface {
    name = 'Migrations1754094729643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserInfo" DROP CONSTRAINT "FK_4569004e1845f87c6cee88d1bb6"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_2a244f3efd5c8ef9264e59c96e1"`);
        await queryRunner.query(`CREATE TABLE "Room" ("id" SERIAL NOT NULL, "code" integer NOT NULL, "name" character varying NOT NULL, "allQuestions" jsonb NOT NULL, "questions" integer NOT NULL, "questionTypes" jsonb NOT NULL, "currencies" integer NOT NULL, "levelType" character varying NOT NULL, "chat" boolean NOT NULL DEFAULT false, "private" boolean NOT NULL DEFAULT false, "mainUserCorrectAnswers" integer NOT NULL DEFAULT '0', "mainUserIncorrectAnswers" integer NOT NULL DEFAULT '0', "guestUserCorrectAnswers" integer NOT NULL DEFAULT '0', "guestUserIncorrectAnswers" integer NOT NULL DEFAULT '0', "roomStatus" character varying NOT NULL DEFAULT 'active', "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "completeDate" TIMESTAMP, "mainUserId" integer, "guestUserId" integer, "leavedUserId" integer, CONSTRAINT "UQ_fc7069d24327ad75fe94984281b" UNIQUE ("code"), CONSTRAINT "PK_867d589be92524f89375e2e086d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "UserInfo" DROP CONSTRAINT "REL_4569004e1845f87c6cee88d1bb"`);
        await queryRunner.query(`ALTER TABLE "UserInfo" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "REL_2a244f3efd5c8ef9264e59c96e"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "utilitiesId"`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "FK_e83b9d4246b2ab28d49ebc9d3b2" FOREIGN KEY ("mainUserId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "FK_4d30006d7a1f670c2019081612f" FOREIGN KEY ("guestUserId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "FK_ae8ca4f388e8f0759bc39997482" FOREIGN KEY ("leavedUserId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "FK_ae8ca4f388e8f0759bc39997482"`);
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "FK_4d30006d7a1f670c2019081612f"`);
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "FK_e83b9d4246b2ab28d49ebc9d3b2"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "utilitiesId" integer`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "REL_2a244f3efd5c8ef9264e59c96e" UNIQUE ("utilitiesId")`);
        await queryRunner.query(`ALTER TABLE "UserInfo" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "UserInfo" ADD CONSTRAINT "REL_4569004e1845f87c6cee88d1bb" UNIQUE ("userId")`);
        await queryRunner.query(`DROP TABLE "Room"`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_2a244f3efd5c8ef9264e59c96e1" FOREIGN KEY ("utilitiesId") REFERENCES "Utilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserInfo" ADD CONSTRAINT "FK_4569004e1845f87c6cee88d1bb6" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
