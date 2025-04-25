import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateValidacionesPagoDto } from './dto/create-validaciones_pago.dto';
import { UpdateValidacionesPagoDto } from './dto/update-validaciones_pago.dto';
import { ValidacionesPago } from './entities/validaciones_pago.entity';
import { PagoService } from 'src/pago/pago.service';
import { PersonaService } from 'src/persona/persona.service';
import { EstadoPago } from 'src/enum/entities.enum';

@Injectable()
export class ValidacionesPagoService {
  constructor(
    @InjectRepository(ValidacionesPago)
    private validacionesPagoRepository: Repository<ValidacionesPago>,

    private readonly personaService: PersonaService,
    private readonly pagoService: PagoService,
  ) { }

  async create({ evidencia, pago_id, usuario_id, fecha_validacion, tipo }: CreateValidacionesPagoDto) {
    try {

      const persona = await this.personaService.findOne(usuario_id);
      const pago = await this.pagoService.findOne(pago_id);

      return this.validacionesPagoRepository.create({
        evidencia,
        fecha_validacion,
        tipo,
        personas: persona,
        pagos: pago
      });

    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new Error('El usuario ya tiene una membresía activa');
      }
    }
  }

  async save(data: ValidacionesPago): Promise<ValidacionesPago> {
    return await this.validacionesPagoRepository.save(data);
  }

  async findAll(): Promise<ValidacionesPago[]> {
    return await this.validacionesPagoRepository.find({ relations: ['roles'], where: { estado: EstadoPago.PENDIENTE } });
  }

  async findOne(id: string): Promise<ValidacionesPago> {
    return await this.validacionesPagoRepository
      .createQueryBuilder('validacion')
      .leftJoinAndSelect('validacion.pagos', 'pago')
      .where('validacion.id = :id', { id })
      .orWhere('pago.id = :id', { id })
      .getOne();
  }

  async update(id: string, updateValidacionesPagoDto: UpdateValidacionesPagoDto): Promise<void> {
    const fecha_validacion = new Intl.DateTimeFormat('es-EC', {
      timeZone: 'America/Guayaquil',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());

    await this.validacionesPagoRepository.update(id, { ...updateValidacionesPagoDto, fecha_validacion });
  }

  async remove(id: string): Promise<void> {
    await this.validacionesPagoRepository.delete(id);
  }
}
