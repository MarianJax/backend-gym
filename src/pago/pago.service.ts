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

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    return await this.PagoRepository.create(createPagoDto);
  }

  async save(data: Pago): Promise<Pago> {
    return this.PagoRepository.save(data);
  }

  async findAll(): Promise<Pago[]> {
    return await this.PagoRepository.find({ order: { fecha_pago: 'ASC' } });
  }

  async findOne(id: string): Promise<Pago> {
    return await this.PagoRepository.findOneBy({ id });
  }

  async update(id: string, updatePagoDto: UpdatePagoDto): Promise<void> {
    await this.PagoRepository.update(id, updatePagoDto);
  }

  async remove(id: string): Promise<void> {
    await this.PagoRepository.delete(id);
  }
}
