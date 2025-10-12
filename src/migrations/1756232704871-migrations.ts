import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756232704871 implements MigrationInterface {
    name = 'Migrations1756232704871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tournament" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "creationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "winnerTeamId" integer, CONSTRAINT "PK_c45e58b6670ff136af4b97b6f37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Game" ADD "tournamentId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Game" ADD CONSTRAINT "FK_abb08d87618534a983cf34778e9" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Tournament" ADD CONSTRAINT "FK_1bced74f2a83a54122712c4a461" FOREIGN KEY ("winnerTeamId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tournament" DROP CONSTRAINT "FK_1bced74f2a83a54122712c4a461"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP CONSTRAINT "FK_abb08d87618534a983cf34778e9"`);
        await queryRunner.query(`ALTER TABLE "Game" DROP COLUMN "tournamentId"`);
        await queryRunner.query(`DROP TABLE "Tournament"`);
    }

}
