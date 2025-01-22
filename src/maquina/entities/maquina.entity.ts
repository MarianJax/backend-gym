import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Mantenimiento } from 'src/mantenimiento/entities/mantenimiento.entity';

export enum Estado {
  DISPONIBLE = 'disponible',
  MANTENIMIENTO = 'mantenimiento',
  FUERASERVICIO = 'fuera de servicio',
}

@Entity({ schema: 'esq_gimnasio', name: 'maquina' })
export class Maquina {
  @PrimaryGeneratedColumn('uuid',{ name: 'id_maquina' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'fecha_compra', type: 'timestamp' })
  date_compra: Date;

  @Column({ name: 'cantidad', type: 'integer'})
  cantidad: number;

  @Column({ name: 'estado', type: 'enum', enum: Estado, default: Estado.DISPONIBLE })
  estado: Estado;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.maquina)
  @JoinColumn({ name: 'mantenimiento_id' })
  mantenimiento: Mantenimiento[];
}
