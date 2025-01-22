import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { NotFoundError } from 'rxjs';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.validateRole(createUserDto.id_rol);

    // Esto deberia crear un usuario con el rol que se le asignó
    return await this.userRepository.save({
      ...createUserDto,
      id_rol: role,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateMaquinaDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, UpdateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Ya mira aqui lo que se hace es buscar el rol pero el id, aqui me confundí
  private async validateRole(role: string): Promise<Rol> {
    const roleFound = await this.rolRepository.findOne({ where: { id: role } });

    // Si no se encuentra el rol, se lanza una excepción para que el frontend
    // lo maneje y muestre alguna alerta o error
    if (!roleFound) {
      throw new BadRequestException(`Role ${role} not found`);
    }

    console.log(roleFound);

    return roleFound;
  }
}

// Esperaba que cancelaras la terminal 
