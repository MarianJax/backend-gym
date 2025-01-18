import { Entrenadores } from 'src/user/entities/entrenadores.entity';
import { Rol } from 'src/user/entities/roles.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'horario' })
export class Horario {
  @PrimaryGeneratedColumn({ name: 'id_horario' })
  id: number;

  @Column()
  jornada: string;

  @Column()
  date_semana: string;

  @Column()
  hora_inicio: string;

  @Column()
  hora_fin: string;

  @ManyToOne(() => Rol, (rol) => rol.horarios)
  rol: Rol;

  @OneToMany(() => Entrenadores, (entrenador) => entrenador.horario)
  entrenador: Entrenadores[];
}
