import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateValidacionesPagoDto } from './dto/create-validaciones_pago.dto';
import { UpdateValidacionesPagoDto } from './dto/update-validaciones_pago.dto';
import { ValidacionesPago } from './entities/validaciones_pago.entity';
import { PagoService } from 'src/pago/pago.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ValidacionesPagoService {
  constructor(
    @InjectRepository(ValidacionesPago)
    private validacionesPagoRepository: Repository<ValidacionesPago>,

    private readonly userService: UserService,
    private readonly pagoService: PagoService,
  ) { }

  async create(createValidacionesPagoDto: CreateValidacionesPagoDto) {
    try {
      const user = await this.userService.findOne(createValidacionesPagoDto.usuario_id);
      const pago = await this.pagoService.findOne(createValidacionesPagoDto.pago_id);

      return  this.validacionesPagoRepository.create({
        ...createValidacionesPagoDto,
        users: user,
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
