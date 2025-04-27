import { EstadoPago } from '../../enum/entities.enum';
import { Pago } from '../../pago/entities/pago.entity';

import {
  AfterUpdate,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'validaciones_pagos' })
export class ValidacionesPago {
  @PrimaryGeneratedColumn('uuid', { name: 'id_validacion' })
  id: string;

  @Column({ name: 'fecha_validacion', type: 'timestamptz', nullable: true })
  fecha_validacion?: Date;

  @Column({ name: 'evidencia', type: 'bytea' })
  evidencia: Buffer;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoPago,
    default: EstadoPago.PENDIENTE,
  })
  estado: EstadoPago;

  @Column({ name: 'tipo', type: 'varchar' })
  tipo: string;
  
    @Column({ name: 'usuario_id', type: 'varchar', length: 50 })
    usuario_id: string;

  @ManyToOne(() => Pago, (pago) => pago.validacion_pago)
  @JoinColumn({ name: 'pago_id' })
  pagos: Pago;
}
