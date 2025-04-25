import { Facultad } from '../../facultad/entities/facultad.entity';
import { Persona } from '../../persona/entities/persona.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'carreras' })
export class Carrera {
  @PrimaryGeneratedColumn('uuid', { name: 'id_carrera' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @OneToOne(() => Persona, (persona) => persona.carrera)
  persona: Persona;

  @ManyToOne(() => Facultad, (facultad) => facultad.carrera)
  @JoinColumn({ name: 'facultad_id' })
  facultad: Facultad;
}
