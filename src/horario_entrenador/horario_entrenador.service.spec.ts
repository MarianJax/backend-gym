import { Test, TestingModule } from '@nestjs/testing';
import { HorarioEntrenadorService } from './horario_entrenador.service';

describe('HorarioEntrenadorService', () => {
  let service: HorarioEntrenadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorarioEntrenadorService],
    }).compile();

    service = module.get<HorarioEntrenadorService>(HorarioEntrenadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
