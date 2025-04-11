import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolService } from 'src/rol/rol.service';
import { Rol } from 'src/rol/entities/rol.entity';
import { FacultadService } from 'src/facultad/facultad.service';
import { CarreraService } from 'src/carrera/carrera.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private rolService: RolService,
    private facultadService: FacultadService,
    private carreraService: CarreraService
  ) { }

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

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        relations: ['roles', 'carrera', 'facultad'],
        select: {
          id: true,
          nombre: true,
          apellido: true,
          correo: true,
          cedula: true,
          carrera: {
            id: true,
            nombre: true,
          },
          facultad: {
            id: true,
            nombre: true,
          },
          roles: {
            id: true,
            nombre: true,
            pago_diario: true,
            pago_mensual: true,
            tiempo: true,
            cupo: true,
          }
        },
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

  async update(id: string, { roles: rls, facultad: facultadId, carrera: carreraId, ...data }: UpdateUserDto): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id }, relations: ['roles', 'facultad', 'carrera'], });

      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      if (rls) {
        const roles = await this.rolService.findAllById(rls);
        // Limpiar la relación many-to-many (eliminar relaciones previas)
        user.roles = [];

        // Asignar los roles nuevos a la entidad de usuario
        user.roles = roles;
      }

        Object.assign(user, data);

      // --- Actualizar facultad o carrera ---
      if (facultadId) {
        const facultad = await this.facultadService.findOne(facultadId);
        if (!facultad) {
          throw new BadRequestException('Facultad no encontrada');
        }
        user.facultad = facultad;
        user.carrera = null; // Limpiar carrera si se pasa facultad
      }

      if (carreraId) {
        const carrera = await this.carreraService.findOne(carreraId);
        if (!carrera) {
          throw new BadRequestException('Carrera no encontrada');
        }
        user.carrera = carrera;
      }

      // Guardar el usuario con los nuevos roles
      await this.userRepository.save(user);

    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al actualizar el usuario', error);

    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async upsertUser(data: { nombre: string, apellido: string, cedula: string, correo: string, roles: Rol[] }): Promise<any> {
    try {
      const user = await this.userRepository.upsert(data, { conflictPaths: ['correo'], skipUpdateIfNoValuesChanged: true, });
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al insertar o actualizar el usuario', error);
    }
  }

  async count(): Promise<number> {
    return await this.userRepository.count();
  }
}
