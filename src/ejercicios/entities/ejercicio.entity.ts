import { Maquina } from '../../maquina/entities/maquina.entity';
import { Rutina } from '../../rutina/entities/rutina.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'ejercicios' })
export class Ejercicio {
  @PrimaryGeneratedColumn('uuid', { name: 'id_ejercicio' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'nivel', type: 'varchar', length: 20 })
  nivel: string;

  @Column({ name: 'repeticiones', type: 'varchar', length: 30 })
  repeticiones: string;

  @Column({ name: 'series', type: 'varchar', length: 30 })
  series: string;

  @Column({ name: 'descanso', type: 'varchar', length: 30 })
  descanso: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 100 })
  descripcion: string;

  @ManyToMany(() => Rutina, (rutina) => rutina.ejercicios)
  rutinas: Rutina;

  @ManyToMany(() => Maquina, (maquina) => maquina.ejercicios)
  @JoinTable()
  maquinas: Maquina[];
}
