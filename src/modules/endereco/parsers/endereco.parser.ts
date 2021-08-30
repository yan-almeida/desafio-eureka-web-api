import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { EnderecoDto } from '../dto/endereco.dto';
import { Endereco } from '../entities/endereco.entity';

export class EnderecoParser {
  static toEnderecoDto(entity: Endereco): EnderecoDto {
    return {
      cep: entity.cep,
      logradouro: entity.logradouro,
      complemento: entity.complemento,
      bairro: entity.bairro,
      localidade: entity.localidade,
      uf: entity.uf,
      ibge: entity.ibge,
      gia: entity.gia,
      ddd: entity.ddd,
      siafi: entity.siafi,
      buscadoQuando: entity.createdAt,
    };
  }

  static toEntity(dto: CreateEnderecoDto): Endereco {
    return new Endereco(
      dto.cep,
      dto.logradouro,
      dto.complemento,
      dto.bairro,
      dto.localidade,
      dto.uf,
      dto.ibge,
      dto.gia,
      dto.ddd,
      dto.siafi,
    );
  }
}
