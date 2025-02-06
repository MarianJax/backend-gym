import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/pago/entities/pago.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateValidacionesPagoDto } from './dto/create-validaciones_pago.dto';
import { UpdateValidacionesPagoDto } from './dto/update-validaciones_pago.dto';
import { ValidacionesPago } from './entities/validaciones_pago.entity';

@Injectable()
export class ValidacionesPagoService {
  constructor(
    @InjectRepository(ValidacionesPago)
    private validacionesPagoRepository: Repository<ValidacionesPago>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
  ) { }

  async create(createValidacionesPagoDto: CreateValidacionesPagoDto) {
    try {
      const user = await this.findUser(createValidacionesPagoDto.usuario_id);
      const pago = await this.findPago(createValidacionesPagoDto.pago_id);

      const validacionesPago = this.validacionesPagoRepository.create({
        ...createValidacionesPagoDto,
        users: user,
        pagos: pago
      });

      return await this.validacionesPagoRepository.save(validacionesPago);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new Error('El usuario ya tiene una membresía activa');
      }
    }
  }

  async findUser(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.log(error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new Error('El usuario ya tiene una membresía activa');
      }
    }
  }

  async findPago(id: string): Promise<Pago> {
    try {
      return await this.pagoRepository.findOneOrFail({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.log(error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new Error('El pago no existe');
      }
    }
  }

  async findAll(): Promise<ValidacionesPago[]> {
    return await this.validacionesPagoRepository.find({ relations: ['roles'] });
  }

  async findOne(id: string): Promise<ValidacionesPago> {
    return await this.validacionesPagoRepository.findOneBy({ id });
  }

  async update(id: string, updateValidacionesPagoDto: UpdateValidacionesPagoDto): Promise<void> {
    await this.validacionesPagoRepository.update(id, updateValidacionesPagoDto);
  }

  async remove(id: string): Promise<void> {
    await this.validacionesPagoRepository.delete(id);
  }
}
