import { Maquina } from '../../maquina/entities/maquina.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum Estado {
  PENDIENTE = 'Pendiente',
  FINALIZADO = 'Finalizado',
  ENPROCESO = 'En proceso',
}

@Entity({ schema: 'esq_gimnasio', name: 'control_mantenimiento' })
export class Mantenimiento {
  @PrimaryGeneratedColumn('uuid', { name: 'id_mantenimiento' })
  id: string;

  @Column({
    type: 'enum',
    enum: Estado,
    default: Estado.PENDIENTE,
  })
  estado: Estado;
@Column({
  name: 'costo_mantenimiento',
  type: 'numeric',precision: 10,scale: 2,}
)
costo: number;

  @Column({
    name: 'fecha_mantenimiento',
    type: 'timestamptz',
  })
  fecha_mantenimiento: Date;

  @Column({
    name: 'observaciones',
    type: 'text',
  })
  observaciones: string;

  @ManyToOne(() => Maquina, (maquina) => maquina.mantenimiento, { eager: true })
  @JoinColumn({ name: 'maquina_id' })
  maquina: Maquina;
}
