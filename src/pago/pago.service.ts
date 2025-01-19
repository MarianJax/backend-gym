import { Injectable } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly PagoRepository: Repository<Pago>,
  ) {}

  async create(
    createPagoDto: CreatePagoDto,
  ): Promise<Pago> {
    return await this.PagoRepository.save(
      createPagoDto,
    );
  }

  async findAll(): Promise<Pago[]> {
    return await this.PagoRepository.find({ order: {  fecha_pago: 'ASC' } });
  }

  async findOne(id: number): Promise<Pago> {
    return await this.PagoRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updatePagoDto: UpdatePagoDto,
  ): Promise<void> {
    await this.PagoRepository.update(
      id,
      updatePagoDto,
    );
  }

  async remove(id: number): Promise<void> {
    await this.PagoRepository.delete(id);
  }
}
