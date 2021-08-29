import { BadRequestException } from '@nestjs/common';
import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { EntityNotFoundError } from 'src/exceptions/entity-not-found-error.exception';
import { CreateEnderecoDto } from 'src/modules/endereco/dto/create-endereco.dto';
import { Endereco } from 'src/modules/endereco/entities/endereco.entity';

@Injectable()
export class ViaCepService {
  constructor(private _httpService: HttpService) {}

  async getEnderecoByCep(cep: string) {
    const endereco = await this.searchEndereco(cep);

    if (!endereco.cep) {
      throw new EntityNotFoundError(ViaCepService, cep);
    }

    return endereco;
  }

  private async searchEndereco(cep: string) {
    try {
      const response = await this._httpService
        .get<CreateEnderecoDto>(`https://viacep.com.br/ws/${cep}/json/`)
        .pipe(map((response) => response.data))
        .toPromise();

      return response;
    } catch (error) {
      throw new BadRequestException(Endereco);
    }
  }
}
