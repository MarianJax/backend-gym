import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto';
import { Mantenimiento, Estado as EstMant } from './entities/mantenimiento.entity';
import { MaquinaService } from '../maquina/maquina.service';
import { Estado } from '../enum/entities.enum';

@Injectable()
export class MantenimientoService {
  constructor(
    @InjectRepository(Mantenimiento)
    private readonly mantenimientoRepository: Repository<Mantenimiento>,

    private readonly maquinaService: MaquinaService,
  ) { }

  async create(createMantenimientoDto: CreateMantenimientoDto): Promise<Mantenimiento | null> {
    try {
      const maquina = await this.maquinaService.findOne(createMantenimientoDto.maquina_id);

      maquina.estado = createMantenimientoDto.estado === EstMant.FINALIZADO ? Estado.DISPONIBLE : Estado.MANTENIMIENTO;
      await this.maquinaService.update(maquina.id, maquina);

      const mantenimiento = this.mantenimientoRepository.create({
        ...createMantenimientoDto,
        maquina,
      });

      return await this.mantenimientoRepository.save(mantenimiento);
    } catch (error) {
      console.error('La maquina no existe', error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new BadRequestException('La maquina seleccionada no existe');
      }
    }
  }

  async findAll(): Promise<Mantenimiento[]> {
    return await this.mantenimientoRepository.find();
  }

  async findOne(id: string): Promise<Mantenimiento> {
    return await this.mantenimientoRepository.findOneBy({ id });
  }

  async update(id: string, { maquina_id, ...updateMantenimientoDto }: UpdateMantenimientoDto): Promise<void> {
    const maquina = await this.maquinaService.findOne(maquina_id);
    await this.mantenimientoRepository.update(id, { ...updateMantenimientoDto, maquina });
  }

  async remove(id: string): Promise<void> {
    await this.mantenimientoRepository.delete(id);
  }

  async findByMaquinaId(maquina_id: string): Promise<Mantenimiento[]> {
    return await this.mantenimientoRepository.find({ where: { maquina: { id: maquina_id } } });
  }


}
