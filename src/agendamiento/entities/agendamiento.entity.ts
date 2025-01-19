import { User } from 'src/user/entities/user.entity';
import { Membresia } from 'src/membresia/entities/membresia.entity';
  import { Pago } from 'src/pago/entities/pago.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'agendamiento' })
export class Agendamiento {
  @PrimaryGeneratedColumn({ name: 'id_agendamiento' })
  id: number;
  @Column()
  rol: 'estudiante' | 'entrenador' | 'docente' | 'personal_administrativo';
  @Column()
  name: string;
  @Column()
  fecha: string;

  @Column()
  hora_inicio: string;

  @Column()
  hora_fin: string;

  @Column()
  asistido: number;

  @ManyToOne(() => Membresia, (membresia) => membresia.agendamientos)
  membresias: Membresia;

  @OneToMany(() => Pago, (pago) => pago.agendamiento)
  pagos: Pago[];

  @ManyToOne(() => User, (user) => user.agendamientos)
  user: User;
}
