import { Horario } from "./horario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entrenadores } from "src/user/entities/entrenadores.entity";

@Entity({ name: 'horario2' })
export class Horario2{
  @PrimaryGeneratedColumn({ name: 'id_horario' })
  id: number;
  @Column()
  rol: 'administrador' | 'entrenador' ;
  @Column()
  jornada: string;
  @Column()
  date_semana: Date;

  @Column()
  hora_inicio: Date;
  @Column()
  hora_fin: Date;

 

  @ManyToOne(() => Entrenadores, (entrenadores) => entrenadores.horario2)
  entrenadores: Entrenadores[];

}