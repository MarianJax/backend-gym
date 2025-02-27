import { Membresia } from '../../membresia/entities/membresia.entity';
import { Pago } from '../../pago/entities/pago.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'agendamiento' })
export class Agendamiento {
  // Generar una clave unica de cada agendamiento que se registra
  @PrimaryGeneratedColumn('uuid', { name: 'id_agendamiento' })
  id: string;

  @Column({ name: 'fecha', type: 'timestamptz' })
  fecha: Date;

  @Column({ name: 'hora_inicio', type: 'time' })
  hora_inicio: Date;

  @Column({ name: 'hora_fin', type: 'time' })
  hora_fin: Date;

  @Column({ name: 'asistio', type: 'boolean', default: false })
  asistio: boolean;

  @ManyToOne(() => Membresia, (membresia) => membresia.agendamientos)
  @JoinColumn({ name: 'membresia_id' })
  membresias: Membresia;

  @ManyToOne(() => Pago, (pago) => pago.agendamiento)
  @JoinColumn({ name: 'pago_id' })
  pagos: Pago;

  @ManyToOne(() => User, (user) => user.agendamientos)
  @JoinColumn({ name: 'usuario_id' })
  user: User;
}
