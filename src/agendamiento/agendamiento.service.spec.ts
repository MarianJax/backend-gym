import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientoService } from './agendamiento.service';

describe('AgendamientoService', () => {
  let service: AgendamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendamientoService],
    }).compile();

    service = module.get<AgendamientoService>(AgendamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
