import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { ILike, In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const rls = await this.validateRole(createUserDto.rol_id);

      const rol = rls.map((r) => ({ ...r }));

      console.log(rol);

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
        roles: rol,
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
    return await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async update(id: string, updateMaquinaDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, updateMaquinaDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  //  buscar el rol pero el id, aqui me confundí
  private async validateRole(role: string[]): Promise<Rol[]> {
    const roleFound = await this.rolRepository.find({
      where: { id: In(role) },
    });

    // Si no se encuentra el rol, se lanza una excepción para que el frontend
    // lo maneje y muestre alguna alerta o error
    if (!roleFound) throw new BadRequestException(`Role ${role} not found`);

    return roleFound;
  }

  async findOneByRol(nombre: string): Promise<Rol[]> {
    return await this.rolRepository.find({
      where: {  nombre: ILike(nombre) },
      relations: ['horarios'],
    });
  }
}
