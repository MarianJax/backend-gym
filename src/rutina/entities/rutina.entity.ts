import { Ejercicio } from '../../ejercicios/entities/ejercicio.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'rutinas' })
export class Rutina {
  @PrimaryGeneratedColumn('uuid', { name: 'id_rutina' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'intensidad', type: 'varchar', length: 100 })
  intensidad: string;

  @Column({ name: 'cantidad_ejercicios', type: 'integer', default: 0 })
  cantidad_ejercicios: number;

  @Column({ name: 'descripcion', type: 'varchar', length: 100 })
  descripcion: string;

  @ManyToMany(() => Ejercicio, (ejercicio) => ejercicio.rutinas)
  ejercicios: Ejercicio[];
}
