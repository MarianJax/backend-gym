import { Estado } from '../../enum/entities.enum';
import { Ejercicio } from '../../ejercicios/entities/ejercicio.entity';
import { Mantenimiento } from '../../mantenimiento/entities/mantenimiento.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

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

  @ManyToMany(() => Ejercicio, (ejercicio) => ejercicio.rutinas)
  ejercicios: Ejercicio[];

  @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.maquina)
  mantenimiento: Mantenimiento[];
}
