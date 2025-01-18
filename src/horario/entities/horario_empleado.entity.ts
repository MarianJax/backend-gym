import { Horario } from './horario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entrenadores } from 'src/user/entities/entrenadores.entity';

@Entity({ schema: 'esq_gimnasio', name: 'horario_empleado' })
export class HorarioEmpleado {
  @PrimaryGeneratedColumn({ name: 'id_horario' })
  id: number;
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
