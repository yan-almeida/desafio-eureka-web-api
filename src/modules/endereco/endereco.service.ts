import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityConflictError } from 'src/exceptions/entity-conflict-error.exception';
import { EntityNotFoundError } from 'src/exceptions/entity-not-found-error.exception';
import { ViaCepService } from 'src/services/via-cep.service';
import { Repository } from 'typeorm';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { Endereco } from './entities/endereco.entity';
import { EnderecoParser } from './parsers/endereco.parser';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private readonly _enderecoRepo: Repository<Endereco>,
    private readonly _viaCepService: ViaCepService,
  ) {}

  async findOneAndCache(cep: string) {
    const enderecoExiste = await this.findOne(cep);

    if (!enderecoExiste) {
      const endereco = await this._viaCepService.getEnderecoByCep(cep);

      return this.create(endereco);
    }

    return enderecoExiste;
  }

  async findAll() {
    const enderecos = await this._enderecoRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });

    if (enderecos.length === 0) {
      throw new EntityNotFoundError(Endereco);
    }

    return enderecos;
  }

  private async create(dto: CreateEnderecoDto) {
    await this.validateCepExists(dto.cep);

    const endereco = EnderecoParser.toEntity(dto);

    return this._enderecoRepo.save(endereco);
  }

  private async findOne(cep: string) {
    return this._enderecoRepo.findOne({
      where: {
        cep,
      },
    });
  }

  private async validateCepExists(cep: string) {
    const enderecoExiste = await this.findOne(cep);

    if (enderecoExiste) {
      throw new EntityConflictError(Endereco, cep);
    }
  }
}
