import { Endereco } from 'src/modules/endereco/entities/endereco.entity';

export class TestUtil {
  static giveMeValidateEndereco(): Endereco {
    return new Endereco('71993150', 'logradouro valido', '', 'bairro valido');
  }
}
