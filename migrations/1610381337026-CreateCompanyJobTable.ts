import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCompanyJobTable1610381337026 implements MigrationInterface {
    name = 'CreateCompanyJobTable1610381337026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema('workclass_takehome', true);
        await queryRunner.query(`CREATE TABLE "workclass_takehome"."job" ("id" SERIAL NOT NULL, "company_id" integer, "job_title" character varying(1000) NOT NULL, "logo_url" character varying(1000) NOT NULL, "date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8df6edde28c781faa10e854a2fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workclass_takehome"."company" ("id" SERIAL NOT NULL, "name" character varying(1000) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54ad27977d7fdb35db3c0ca35c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workclass_takehome"."job" ADD CONSTRAINT "FK_a8c4331ab55d595de67f5a7d04b" FOREIGN KEY ("company_id") REFERENCES "workclass_takehome"."company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workclass_takehome"."job" DROP CONSTRAINT "FK_a8c4331ab55d595de67f5a7d04b"`);
        await queryRunner.query(`DROP TABLE "workclass_takehome"."company"`);
        await queryRunner.query(`DROP TABLE "workclass_takehome"."job"`);
        await queryRunner.dropSchema('workclass_takehome', true);
    }

}
