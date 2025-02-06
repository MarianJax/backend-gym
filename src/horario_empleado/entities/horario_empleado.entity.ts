import { Entrenadores } from 'src/entrenador/entities/entrenador.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'horario_empleado' })
export class HorarioEmpleado {
  @PrimaryGeneratedColumn('uuid', { name: 'id_horario_empleado' })
  id: string;

  @Column({ name: 'fecha', type: 'timestamptz' })
  fecha: Date;

  @Column({ name: 'franja_hora_inicio', type: 'time' })
  franja_hora_inicio: Date;

  @Column({ name: 'franja_hora_fin', type: 'time' })
  franja_hora_fin: Date;

  @ManyToOne(() => Entrenadores, (entrenadores) => entrenadores.horario_empleados)
  @JoinColumn({ name: 'entrenador_id' })
  entrenador: Entrenadores;
}
