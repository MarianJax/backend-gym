import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Estado } from '../../enum/entities.enum';
import { Mantenimiento } from '../../mantenimiento/entities/mantenimiento.entity';

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

  @Column({ name: 'estado', type: 'enum', enum: Estado })
  estado: Estado;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.maquina)
  mantenimiento: Mantenimiento[];
}
