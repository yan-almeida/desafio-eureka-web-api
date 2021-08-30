import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUtil } from 'src/common/test/test.util';
import { ViaCepService } from 'src/services/via-cep/via-cep.service';
import { EnderecoService } from './endereco.service';
import { Endereco } from './entities/endereco.entity';

describe('EnderecoService', () => {
  let enderecoService: EnderecoService;

  const mockRepoEndereco = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockServiceViaCep = {
    getEnderecoByCep: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnderecoService,
        ViaCepService,
        {
          provide: getRepositoryToken(Endereco),
          useValue: mockRepoEndereco,
        },
        {
          provide: ViaCepService,
          useValue: mockServiceViaCep,
        },
      ],
    }).compile();

    enderecoService = module.get<EnderecoService>(EnderecoService);
  });

  beforeEach(() => {
    mockRepoEndereco.findOne.mockReset();
    mockRepoEndereco.save.mockReset();
    mockServiceViaCep.getEnderecoByCep.mockReset();
  });

  it('should be defined', () => {
    expect(enderecoService).toBeDefined();
  });

  describe('findOneAndCache', () => {
    it('Deve retornar um endereço existente', async () => {
      const endereco = TestUtil.giveMeValidateEndereco();

      mockRepoEndereco.findOne.mockReturnValue(endereco);

      const enderecosSalvos = await enderecoService.findOneAndCache('71993150');

      expect(enderecosSalvos).toMatchObject(endereco);
      expect(mockRepoEndereco.findOne).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção (not found exception) quando não encontrar um endereço', async () => {
      mockRepoEndereco.findOne.mockReturnValue(null);

      expect(enderecoService.findOneAndCache('99999-999')).rejects.toThrow(
        Error,
      );
      expect(mockRepoEndereco.findOne).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção (bad request exception) quando não encontrar um endereço', async () => {
      mockRepoEndereco.findOne.mockReturnValue(null);

      expect(
        enderecoService.findOneAndCache('abcde-999'),
      ).rejects.toBeInstanceOf(Error);
      expect(mockRepoEndereco.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
