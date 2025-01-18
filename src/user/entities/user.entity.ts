import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, UpdateDateColumn, OneToOne, } from 'typeorm';
import { Rol } from './roles.entity';
import { Membresia } from 'src/pago/entities/membresia.entity';

@Entity({ name: 'usuario' })
export class User {
    @PrimaryGeneratedColumn({  name: 'id_usuario' })
    id: number;
      @Column()
    name: string;
  
    @Column()
    rol: string;
  
    @Column()
    email: string;
    @Column()
    contrasena: string;
  

@OneToOne (() => Membresia, (membresia) =>  membresia.user)
  membresia: Membresia;

    @UpdateDateColumn()
    updated_at: Date;

  }