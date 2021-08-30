import { Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiController } from 'src/decorators/api-controller.decorator';
import { ClearEverythingNotNumber } from 'src/pipes/clear-everything-not-number.pipe';
import { EnderecoDto } from './dto/endereco.dto';
import { EnderecoService } from './endereco.service';
import { EnderecoParser } from './parsers/endereco.parser';

@ApiController('endereco')
export class EnderecoController {
  constructor(private readonly _enderecoService: EnderecoService) {}

  @Get(':cep')
  @ApiOkResponse({
    description: 'Busca de Endereço por CEP',
    type: EnderecoDto,
  })
  async findOne(
    @Param('cep', new ClearEverythingNotNumber()) cep: string,
  ): Promise<EnderecoDto> {
    const result = await this._enderecoService.findOneAndCache(cep);

    return EnderecoParser.toEnderecoDto(result);
  }
}
