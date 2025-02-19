import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado, Maquina } from 'src/maquina/entities/maquina.entity';
import { Repository } from 'typeorm';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto';
import { Mantenimiento, Estado as EstMant } from './entities/mantenimiento.entity';

@Injectable()
export class MantenimientoService {
  constructor(
    @InjectRepository(Mantenimiento)
    private readonly MantenimientoRepository: Repository<Mantenimiento>,

    @InjectRepository(Maquina)
    private readonly maquinaRepository: Repository<Maquina>,
  ) { }

  async create(createMantenimientoDto: CreateMantenimientoDto): Promise<Mantenimiento | null> {
    try {
      const maquina = await this.maquinaRepository.findOneByOrFail({ id: createMantenimientoDto.maquina_id });

      maquina.estado = createMantenimientoDto.estado === EstMant.FINALIZADO ? Estado.DISPONIBLE : Estado.MANTENIMIENTO;
      await this.maquinaRepository.save(maquina);

      const mantenimiento = this.MantenimientoRepository.create({
        ...createMantenimientoDto,
        maquina,
      });

      return await this.MantenimientoRepository.save(mantenimiento);
    } catch (error) {
      console.error('La maquina no existe', error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new BadRequestException('La maquina seleccionada no existe');
      }
    }
  }

  async findAll(): Promise<Mantenimiento[]> {
    return await this.MantenimientoRepository.find();
  }

  async findOne(id: string): Promise<Mantenimiento> {
    return await this.MantenimientoRepository.findOneBy({ id });
  }

  async update(id: string, updateMantenimientoDto: UpdateMantenimientoDto): Promise<void> {
    await this.MantenimientoRepository.update(id, updateMantenimientoDto);
  }

  async remove(id: string): Promise<void> {
    await this.MantenimientoRepository.delete(id);
  }
}
