import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolService } from 'src/rol/rol.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private rolService: RolService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const roles = await this.rolService.findAllById(createUserDto.roles);

      const existEmail = await this.userRepository.findOne({
        where: { correo: createUserDto.correo },
      });

      if (existEmail) {
        throw new BadRequestException(
          `El correo ${existEmail.correo} ya está registrado`,
        );
      }

      const user = this.userRepository.create({
        ...createUserDto,
        roles,
      });

      console.log(user);

      //  crea un usuario con el rol que se le asignó
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        relations: ['roles'],
      });
    } catch (error) { 
      console.log(error);
      throw new BadRequestException('Usuario no encontrado');
    }
  }

  async findOneByEmail(correo: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { correo },
        relations: ['roles'],
      });
    } catch (error) { 
      console.log(error);
      throw new BadRequestException('Usuario no encontrado');
    }
  }

  async update(id: string, updateMaquinaDto: UpdateUserDto): Promise<void> {
    const roles = await this.rolService.findAllById(updateMaquinaDto.roles);
    await this.userRepository.update(id, {
      ...updateMaquinaDto,
      roles,
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
