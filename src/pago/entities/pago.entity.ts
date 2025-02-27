import { Agendamiento } from '../../agendamiento/entities/agendamiento.entity';
import { Membresia } from '../../membresia/entities/membresia.entity';
import { ValidacionesPago } from '../../validaciones_pago/entities/validaciones_pago.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum Metodo {
  DIARIO = 'Diario', // tarjeta?
  MENSUAL = 'Mensual', // tranfrencia?
}

@Entity({ schema: 'esq_gimnasio', name: 'pagos' })
export class Pago {
  @PrimaryGeneratedColumn('uuid', { name: 'id_transferencia' })
  id: string;

  @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ name: 'fecha_pago', type: 'timestamptz' })
  fecha_pago: Date;

  @Column({
    name: 'metodo_pago',
    type: 'enum',
    enum: Metodo,
    default: Metodo.DIARIO,
  })
  metodo_pago: Metodo;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.pagos)
  agendamiento: Agendamiento[];

  @OneToMany(() => Membresia, (membresia) => membresia.pagos)
  membresia: Membresia[];

  @OneToMany(() => ValidacionesPago, (agendamiento) => agendamiento.pagos)
  validacion_pago: ValidacionesPago[];
}
