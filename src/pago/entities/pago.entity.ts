import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

enum Metodo {
  DIARIO = 'Diario', // tarjeta?
  MENSUAL = 'Mensual', // tranfrencia?
}

@Entity({ schema: 'esq_gimnasio', name: 'pago' })
export class Pago {
  @PrimaryGeneratedColumn('uuid',{ name: 'id_transferencia' })
  id: string;

  @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ name: 'fecha_pago', type: 'timestamp with time zone' })
  fecha_pago: string;

  @Column({
    name: 'metodo_pago',
    type: 'enum',
    enum: Metodo,
    default: Metodo.DIARIO,
  })
  metodo_pago: Metodo;

  @ManyToOne(() => Agendamiento)
  @JoinColumn({ name: 'agendamiento_id' })
  agendamiento: Agendamiento;
}
