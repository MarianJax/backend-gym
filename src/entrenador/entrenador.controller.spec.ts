import { Test, TestingModule } from '@nestjs/testing';
import { EntrenadorController } from './entrenador.controller';
import { EntrenadorService } from './entrenador.service';

describe('EntrenadorController', () => {
  let controller: EntrenadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntrenadorController],
      providers: [EntrenadorService],
    }).compile();

    controller = module.get<EntrenadorController>(EntrenadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
