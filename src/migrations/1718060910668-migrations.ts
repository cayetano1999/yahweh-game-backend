import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718060910668 implements MigrationInterface {
    name = 'Migrations1718060910668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FeedBack" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL, "message" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_30551d05db094ab7d892f0f5a33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "FeedBack" ADD CONSTRAINT "FK_922b8201c51f36bbb000459b6fa" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FeedBack" DROP CONSTRAINT "FK_922b8201c51f36bbb000459b6fa"`);
        await queryRunner.query(`DROP TABLE "FeedBack"`);
    }

}
