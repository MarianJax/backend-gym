import { Test, TestingModule } from '@nestjs/testing';
import { HorarioEntrenadorController } from './horario_entrenador.controller';
import { HorarioEntrenadorService } from './horario_entrenador.service';

describe('HorarioEntrenadorController', () => {
  let controller: HorarioEntrenadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorarioEntrenadorController],
      providers: [HorarioEntrenadorService],
    }).compile();

    controller = module.get<HorarioEntrenadorController>(HorarioEntrenadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
