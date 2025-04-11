import { Injectable } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    return await this.PagoRepository.find({
      where: {
        validacion_pago: {
          users: {
            roles: {
              nombre: In(['Estudiante', 'Funcionario', 'Docente']),
            },
          },
        },
      },
      order: { fecha_pago: 'ASC' },
      select: {
        id: true,
        metodo_pago: true,
        monto: true,
        fecha_pago: true,
        validacion_pago: {
          id: true,
          users: {
            apellido: true,
            nombre: true,
            cedula: true,
            roles: {
              nombre: true,
            },
          },
        },
      },
      relations: [
        'validacion_pago',
        'validacion_pago.users',
        'validacion_pago.users.roles',
      ],
    });
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

  async findAllPagosRolAndUser(): Promise<Pago[]> {
    return await this.PagoRepository.find();
  }

  async totalCosto(): Promise<number> {
    const mantenimientos = await this.PagoRepository.find();
    return mantenimientos.reduce((total, m) => total + Number(m.monto), 0);
  }
}
