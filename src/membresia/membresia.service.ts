import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateMembresiaDto } from './dto/create-membresia.dto';
import { UpdateMembresiaDto } from './dto/update-membresia.dto';
import { Membresia } from './entities/membresia.entity';
import { PagoService } from 'src/pago/pago.service';

@Injectable()
export class MembresiaService {
  constructor(
    @InjectRepository(Membresia)
    private readonly MembresiaRepository: Repository<Membresia>,
    private readonly pagoService: PagoService,
  ) {}

  async create({
    costo,
    fecha_inicio,
    pago_id,
    usuario_id,
  }: CreateMembresiaDto): Promise<Membresia> {
    try {
      const pagos = await this.pagoService.findOne(pago_id);

      const membresia = this.MembresiaRepository.create({
        costo,
        fecha_inicio,
        usuario_id,
        pagos,
      });

      return await this.MembresiaRepository.save(membresia);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new Error('El usuario ya tiene una membresía activa');
      }
    }
  }

  async findAll(): Promise<Membresia[]> {
    return await this.MembresiaRepository.find({
      order: {
        fecha_inicio: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Membresia> {
    return await this.MembresiaRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateMembresiaDto: UpdateMembresiaDto,
  ): Promise<void> {
    await this.MembresiaRepository.update(id, updateMembresiaDto);
  }

  async remove(id: string): Promise<void> {
    await this.MembresiaRepository.delete(id);
  }

  async findActiveMembresiaByIdAndDate(
    id: string,
    fecha: Date,
  ): Promise<Membresia> {
    try {
      return await this.MembresiaRepository.findOneOrFail({
        where: {
          id,
          fecha_fin: MoreThanOrEqual(fecha),
          fecha_inicio: LessThanOrEqual(fecha),
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'No posee una membresía activa para agendar',
      );
    }
  }

  async findByPersonaIdAndDate(id: string, fecha: Date): Promise<Membresia> {
    try {
      return await this.MembresiaRepository.findOne({
        where: {
          usuario_id: id ,
          fecha_fin: MoreThanOrEqual(fecha),
          fecha_inicio: LessThanOrEqual(fecha),
        },
        select: {
          id: true,
          pagos: {
            id: true,
            validacion_pago: {
              estado: true,
            },
          },
        },
        relations: ['pagos', 'pagos.validacion_pago'],
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('No se pudo obtener la información');
    }
  }
}
