import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { RolService } from 'src/rol/rol.service';
import { Rol } from 'src/rol/entities/rol.entity';
import { FacultadService } from 'src/facultad/facultad.service';
import { CarreraService } from 'src/carrera/carrera.service';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,

    private rolService: RolService,
    private facultadService: FacultadService,
    private carreraService: CarreraService
  ) { }

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    try {
      const roles = await this.rolService.findAllById(createPersonaDto.roles);

      const existEmail = await this.personaRepository.findOne({
        where: { correo: createPersonaDto.correo },
      });

      if (existEmail) {
        throw new BadRequestException(
          `El correo ${existEmail.correo} ya está registrado`,
        );
      }

      const persona = this.personaRepository.create({
        ...createPersonaDto,
        roles,
      });

      console.log(persona);

      //  crea un usuario con el rol que se le asignó
      return await this.personaRepository.save(persona);
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
    }
  }

  async save(persona: Persona): Promise<Persona> {
    return await this.personaRepository.save(persona);
  }

  async findAll(): Promise<Persona[]> {
    return await this.personaRepository.find({ relations: ['roles'] });
  }

  async findOne(id: string): Promise<Persona> {
    try {
      return await this.personaRepository.findOne({
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

  async findOneByEmail(correo: string): Promise<Persona> {
    try {
      return await this.personaRepository.findOne({
        where: { correo },
        relations: ['roles'],
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Usuario no encontrado');
    }
  }

  async update(id: string, { roles: rls, facultad: facultadId, carrera: carreraId, ...data }: UpdatePersonaDto): Promise<void> {
    try {
      const persona = await this.personaRepository.findOne({ where: { id }, relations: ['roles', 'facultad', 'carrera'], });

      if (!persona) {
        throw new BadRequestException('Usuario no encontrado');
      }

      if (rls) {
        const roles = await this.rolService.findAllById(rls);
        // Limpiar la relación many-to-many (eliminar relaciones previas)
        persona.roles = [];

        // Asignar los roles nuevos a la entidad de usuario
        persona.roles = roles;
      }

      Object.assign(persona, data);

      // --- Actualizar facultad o carrera ---
      if (facultadId) {
        const facultad = await this.facultadService.findOne(facultadId);
        if (!facultad) {
          throw new BadRequestException('Facultad no encontrada');
        }
        persona.facultad = facultad;
        persona.carrera = null; // Limpiar carrera si se pasa facultad
      }

      if (carreraId) {
        const carrera = await this.carreraService.findOne(carreraId);
        if (!carrera) {
          throw new BadRequestException('Carrera no encontrada');
        }
        persona.carrera = carrera;
      }

      // Guardar el usuario con los nuevos roles
      await this.personaRepository.save(persona);

    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al actualizar el usuario', error);

    }
  }

  async remove(id: string): Promise<void> {
    await this.personaRepository.delete(id);
  }

  async upsertPersona(data: { nombre: string, apellido: string, cedula: string, correo: string, roles: Rol[] }): Promise<any> {
    try {
      const persona = await this.personaRepository.upsert(data, { conflictPaths: ['correo'], skipUpdateIfNoValuesChanged: true, });
      return persona;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al insertar o actualizar el usuario', error);
    }
  }

  async count(): Promise<number> {
    return await this.personaRepository.count();
  }
}
