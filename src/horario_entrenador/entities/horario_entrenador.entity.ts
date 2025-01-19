    import { Horario } from 'src/horario/entities/horario.entity';
  import {Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entrenadores } from 'src/entrenador/entities/entrenador.entity';
@Entity({ schema: 'esq_gimnasio', name: 'horario_empleado' })
export class HorarioEntrenador {
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
    (entrenadores) => entrenadores.horario_entrenador,
  )
  entrenador: Entrenadores;
}
