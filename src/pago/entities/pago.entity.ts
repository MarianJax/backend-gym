import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity({ schema: 'esq_gimnasio', name: 'pago' })
export class Pago {
  @PrimaryGeneratedColumn({ name: 'id_pago' })
  id: number;

  @Column()
  monto: string;

  @Column()
  email: string;
  @Column()
  fecha_pago: string;

  @Column()
  metodo_pago: 'Diario' | 'Mensual';

  @ManyToOne(() => Agendamiento, (agendamiento) => agendamiento.pagos)
  agendamiento: Agendamiento;
}
