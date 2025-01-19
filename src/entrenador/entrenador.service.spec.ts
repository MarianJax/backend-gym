import { Test, TestingModule } from '@nestjs/testing';
import { EntrenadorService } from './entrenador.service';

describe('EntrenadorService', () => {
  let service: EntrenadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntrenadorService],
    }).compile();

    service = module.get<EntrenadorService>(EntrenadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
