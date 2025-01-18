import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';

describe('AgendamientoController', () => {
  let controller: AgendamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamientoController],
      providers: [AgendamientoService],
    }).compile();

    controller = module.get<AgendamientoController>(AgendamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
