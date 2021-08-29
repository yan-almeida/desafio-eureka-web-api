import { NormalizedColumn } from 'src/decorators/normalized-column.decorator';
import { ColumnOptions, Entity, PrimaryColumn } from 'typeorm';

const DEFAULT_CONFIG_COLUMNS: ColumnOptions = {
  nullable: true,
};

@Entity()
export class Endereco {
  constructor(
    cep: string,
    logradouro?: string,
    complemento?: string,
    bairro?: string,
    localidade?: string,
    uf?: string,
    ibge?: string,
    gia?: string,
    ddd?: string,
    siafi?: string,
  ) {
    if (cep) {
      this.cep = cep.replace(/\D+/g, '');
    }
    this.logradouro = logradouro;
    this.complemento = complemento;
    this.bairro = bairro;
    this.localidade = localidade;
    this.uf = uf;
    this.ibge = ibge;
    this.gia = gia;
    this.ddd = ddd;
    this.siafi = siafi;

    this.createdAt = new Date();
  }

  @PrimaryColumn({ length: 8 })
  cep: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  logradouro?: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  complemento?: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  bairro?: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  localidade?: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  uf?: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  ibge?: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  gia?: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  ddd?: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMNS)
  siafi?: string;

  @NormalizedColumn()
  createdAt: Date;
}
