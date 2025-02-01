import { Maquina } from 'src/maquina/entities/maquina.entity';
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

@Entity({ schema: 'esq_gimnasio', name: 'mantenimiento' })
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
    name: 'fecha_mantenimiento',
    type: 'timestamp',
  })
  date_mantenimiento: Date;

  @Column({
    name: 'observaciones',
    type: 'text',
  })
  observaciones: string;

  @ManyToOne(() => Maquina, (maquina) => maquina.mantenimiento)
  @JoinColumn({ name: 'maquina_id' })
  maquina: Maquina;
}
