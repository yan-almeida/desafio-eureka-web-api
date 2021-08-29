import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdicaoTabelaEndereco1630211753788 implements MigrationInterface {
  name = 'AdicaoTabelaEndereco1630211753788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bd-teste".."tb_endereco" ("cep" nvarchar(8) NOT NULL, "logradouro" nvarchar(255), "complemento" nvarchar(255), "bairro" nvarchar(255), "localidade" nvarchar(255), "uf" nvarchar(255), "ibge" nvarchar(255), "gia" nvarchar(255), "ddd" nvarchar(255), "siafi" nvarchar(255), "created_at" datetime NOT NULL, CONSTRAINT "PK_92faa16c3dc2f605f0b2df36a62" PRIMARY KEY ("cep"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bd-teste".."tb_endereco"`);
  }
}
