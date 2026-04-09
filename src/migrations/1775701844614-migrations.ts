import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1775701844614 implements MigrationInterface {
    name = 'Migrations1775701844614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_game_homeclubteam"`);
        await queryRunner.query(`DROP INDEX "public"."idx_game_tournament"`);
        await queryRunner.query(`DROP INDEX "public"."idx_game_isdeleted"`);
        await queryRunner.query(`DROP INDEX "public"."idx_game_initialdate"`);
        await queryRunner.query(`DROP INDEX "public"."idx_game_isdeleted_initialdate"`);
        await queryRunner.query(`DROP INDEX "public"."idx_game_teama"`);
        await queryRunner.query(`DROP INDEX "public"."idx_game_teamb"`);
        await queryRunner.query(`DROP INDEX "public"."idx_team_church"`);
        await queryRunner.query(`ALTER TABLE "Player" ADD "bookName" character varying`);
        await queryRunner.query(`ALTER TABLE "Player" ADD "chapterNumber" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Player" DROP COLUMN "chapterNumber"`);
        await queryRunner.query(`ALTER TABLE "Player" DROP COLUMN "bookName"`);
        await queryRunner.query(`CREATE INDEX "idx_team_church" ON "Team" ("churchId") `);
        await queryRunner.query(`CREATE INDEX "idx_game_teamb" ON "Game" ("teamBId") `);
        await queryRunner.query(`CREATE INDEX "idx_game_teama" ON "Game" ("teamAId") `);
        await queryRunner.query(`CREATE INDEX "idx_game_isdeleted_initialdate" ON "Game" ("initialDate", "isDeleted") `);
        await queryRunner.query(`CREATE INDEX "idx_game_initialdate" ON "Game" ("initialDate") `);
        await queryRunner.query(`CREATE INDEX "idx_game_isdeleted" ON "Game" ("isDeleted") `);
        await queryRunner.query(`CREATE INDEX "idx_game_tournament" ON "Game" ("tournamentId") `);
        await queryRunner.query(`CREATE INDEX "idx_game_homeclubteam" ON "Game" ("homeClubTeamId") `);
    }

}
