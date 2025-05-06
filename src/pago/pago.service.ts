import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPago } from 'src/enum/entities.enum';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly PagoRepository: Repository<Pago>,
  ) { }

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    return await this.PagoRepository.create(createPagoDto);
  }

  async save(data: Pago): Promise<Pago> {
    return this.PagoRepository.save(data);
  }

  async findAll(): Promise<any[]> {
    return await this.PagoRepository.find({
      order: { fecha_pago: 'ASC' },
      select: {
        id: true,
        metodo_pago: true,
        monto: true,
        fecha_pago: true,
        validacion_pago: {
          id: true,
          estado: true,
          usuario_id: true,
        },
        agendamiento: {
          id: true,
          distribucion: {
            rol_id: true,
          },
        },
        membresia: {
          id: true,
          agendamientos: {
            id: true,
            distribucion: {
              rol_id: true,
            },
          },
        },
      },
      relations: [
        'validacion_pago',
        'agendamiento',
        'agendamiento.distribucion',
        'membresia',
        'membresia.agendamientos',
        'membresia.agendamientos.distribucion',
      ],
    });
  }

  async findOne(id: string): Promise<Pago> {
    return await this.PagoRepository.findOneBy({ id });
  }

  async update(id: string, updatePagoDto: UpdatePagoDto): Promise<void> {
    await this.PagoRepository.update(id, updatePagoDto);
  }

  async remove(id: string): Promise<any> {
    try {
      const pago = await this.PagoRepository.findOne({
        where: { id },
        relations: ['agendamiento', 'membresia', 'validacion_pago'], // agrega todas las relaciones que deban eliminarse
      });

      console.log('pago', pago);

      if (!pago) {
        throw new NotFoundException('Pago no encontrado');
      }

      await this.PagoRepository.remove(pago);
      return { status: true, message: 'Pago eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar el pago:', error);
      return { status: false, message: 'Error al eliminar el pago' };


    }
  }

  async findAllPagosRolAndUser(): Promise<Pago[]> {
    return await this.PagoRepository.find();
  }

  async totalCosto(): Promise<number> {
    const mantenimientos = await this.PagoRepository.find({
      where: { validacion_pago: { estado: EstadoPago.APROBADO } },
    });
    return mantenimientos.reduce((total, m) => total + Number(m.monto), 0);
  }
}
