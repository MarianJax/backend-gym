import { Distribucion } from 'src/distribucion/entities/distribucion.entity';
import { DiaSemana, Jornada } from '../../enum/entities.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'horarios' })
export class Horario {
  @PrimaryGeneratedColumn('uuid', { name: 'id_horario' })
  id: string;

  @Column({
    type: 'enum',
    enum: Jornada,
    name: 'jornada',
  })
  jornada: Jornada;

  @Column({
    type: 'enum',
    enum: DiaSemana,
    name: 'dia_semana',
  })
  dia_semana: DiaSemana;

  @Column({ name: 'hora_inicio', type: 'time' })
  hora_inicio: Date;

  @Column({ name: 'hora_fin', type: 'time' })
  hora_fin: Date;

  @ManyToOne(() => Distribucion, (dist) => dist.horarios)
  @JoinColumn({ name: 'distribucion_id' })
  distribucion: Distribucion;
}
