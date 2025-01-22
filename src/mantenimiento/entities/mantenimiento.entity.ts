import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Maquina } from 'src/maquina/entities/maquina.entity';

enum Estado {
  PENDIENTE = 'pendiente',
  FINALIZADO = 'finalizado',
  ENPROCESO = 'en proceso',
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

  @ManyToOne(() => Maquina)
  @JoinColumn({ name: 'maquina_id' })
  maquina: Maquina;
}
