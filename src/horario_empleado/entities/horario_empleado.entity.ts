import { Entrenadores } from 'src/entrenador/entities/entrenador.entity';
import { DiaSemana, Jornada, RolHorario } from 'src/enum/entities.enum';
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

  @Column({
    type: 'enum',
    enum: RolHorario,
    name: 'rol',
  })
  rol: RolHorario;

  @Column({
    name: 'dia_semana', type: 'enum',
    enumName: 'dia_semana',
    enum: DiaSemana,
  })
  dia_semana: DiaSemana;

  @Column({
    type: 'enum',
    enum: Jornada,
    enumName: 'jornada',
    name: 'jornada',
  })
  jornada: Jornada;

  @Column({ name: 'hora_inicio', type: 'time' })
  hora_inicio: Date;

  @Column({ name: 'hora_fin', type: 'time' })
  hora_fin: Date;

  @ManyToOne(() => Entrenadores, (entrenadores) => entrenadores.horario_empleados)
  @JoinColumn({ name: 'id_entrenador' })
  entrenador: Entrenadores;
}
