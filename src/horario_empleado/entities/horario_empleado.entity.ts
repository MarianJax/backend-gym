import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entrenadores } from 'src/entrenador/entities/entrenador.entity';
//#region  Pendiente
@Entity({ schema: 'esq_gimnasio', name: 'horario_empleado' })
export class HorarioEmpleado {
  @PrimaryGeneratedColumn('uuid', { name: 'id_horario' })
  id: string;

  @Column()
  rol: 'administrador' | 'entrenador';

  @Column()
  jornada: string;

  @Column()
  date_semana: string;

  @Column()
  hora_inicio: string;

  @Column()
  hora_fin: string;

  @ManyToOne(
    () => Entrenadores,
    (entrenadores) => entrenadores.horario_empleado,
  )
  entrenador: Entrenadores;
}
