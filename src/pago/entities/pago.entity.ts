import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Membresia } from 'src/pago/entities/membresia.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity({ name: 'pago' })
export class Pago {
  @PrimaryGeneratedColumn({ name: 'id_pago' })
  id: number;

  @Column()
  date: Date;

  @Column()
  email: string;
  @Column()
  tipo_pago: 'diario' | 'mensual';



  
}
