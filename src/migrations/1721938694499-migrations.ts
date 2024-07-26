import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721938694499 implements MigrationInterface {
    name = 'Migrations1721938694499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Inning" DROP CONSTRAINT "FK_d75805247faceba189540c9680e"`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD CONSTRAINT "FK_d75805247faceba189540c9680e" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Inning" DROP CONSTRAINT "FK_d75805247faceba189540c9680e"`);
        await queryRunner.query(`ALTER TABLE "Inning" ADD CONSTRAINT "FK_d75805247faceba189540c9680e" FOREIGN KEY ("gameId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
