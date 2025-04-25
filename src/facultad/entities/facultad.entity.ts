import { Carrera } from '../../carrera/entities/carrera.entity';
import { Persona } from '../../persona/entities/persona.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'facultades' })
export class Facultad {
  @PrimaryGeneratedColumn('uuid', { name: 'id_facultad' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @OneToOne(() => Persona, (persona) => persona.facultad)
  persona: Persona;

  @OneToMany(() => Carrera, (carrera) => carrera.facultad, { cascade: true })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera[];
}
