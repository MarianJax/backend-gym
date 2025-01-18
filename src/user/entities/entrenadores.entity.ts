import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, UpdateDateColumn, OneToMany, } from 'typeorm';
import { Horario2 } from 'src/horario/entities/horario2.entity';

@Entity({ name: 'entrenadores' })
export class Entrenadores {
    @PrimaryGeneratedColumn({  name: 'id_entrenador' })
    id: number;
      @Column()
    name: string;
  
    @Column()
    rol: string;
  
    @Column()
    email: string;
    @Column()
    contrasena: string;
  
    @UpdateDateColumn()
    updated_at: Date;
@OneToMany(() => Horario2, (horario2) => horario2.entrenadores)
  horario2: Horario2;
  }