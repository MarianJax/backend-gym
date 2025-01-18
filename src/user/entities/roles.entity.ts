import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, UpdateDateColumn, OneToMany, OneToOne, } from 'typeorm';
import { Horario } from 'src/horario/entities/horario.entity';
import { Horario2 } from 'src/horario/entities/horario2.entity';
import { User } from './user.entity';
@Entity({ name: 'roles' })
export class Rol {
    @PrimaryGeneratedColumn({  name: 'id_rol' })
    id: number;
      @Column()
    name: string;
  
    @Column()
    monto_de_pago: number;
  
    @Column()
    tiempo:Date 
    @Column()
    cupo: number;
  
    @UpdateDateColumn()
    updated_at: Date;
@OneToMany(() => Horario, (horario) => horario.rol)
  horario: Horario;
  @OneToOne (() => User, (user) => user.rol)
  user: User;
  }