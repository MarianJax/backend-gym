import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
@Entity({ name: 'membresia' })
export class Membresia {
  @PrimaryGeneratedColumn({ name: 'id_membresia' })
  id: number;

  @Column()
  date: Date;

  @Column()
  email: string;
  @Column()
  tipo_pago: 'diario' | 'mensual';
  @ManyToOne (() => User, (user) => user.membresia)
  user: User;
  @OneToMany (() => Agendamiento, (agendamiento) => agendamiento.membresia)
  agendamiento: Agendamiento;
}
