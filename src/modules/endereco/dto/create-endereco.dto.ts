import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateEnderecoDto {
  @ApiProperty()
  cep: string;

  @ApiProperty()
  @IsOptional()
  logradouro?: string;

  @ApiProperty()
  @IsOptional()
  complemento?: string;

  @ApiProperty()
  @IsOptional()
  bairro?: string;

  @ApiProperty()
  @IsOptional()
  localidade?: string;

  @ApiProperty()
  @IsOptional()
  uf?: string;

  @ApiProperty()
  @IsOptional()
  ibge?: string;

  @ApiProperty()
  @IsOptional()
  gia?: string;

  @ApiProperty()
  @IsOptional()
  ddd?: string;

  @ApiProperty()
  @IsOptional()
  siafi?: string;
}
