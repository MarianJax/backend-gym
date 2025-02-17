import { Mantenimiento } from 'src/mantenimiento/entities/mantenimiento.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum Estado {
  DISPONIBLE = 'Disponible',
  MANTENIMIENTO = 'Mantenimiento',
  FUERASERVICIO = 'Fuera de servicio',
}

@Entity({ schema: 'esq_gimnasio', name: 'maquinas' })
export class Maquina {
  @PrimaryGeneratedColumn('uuid', { name: 'id_maquina' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'fecha_compra', type: 'timestamptz' })
  fecha_compra: Date;

  @Column({ name: 'cantidad', type: 'integer' })
  cantidad: number;

  @Column({ name: 'estado', type: 'enum', enum: Estado, default: Estado.DISPONIBLE })
  estado: Estado;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.maquina)
  mantenimiento: Mantenimiento[];
}
