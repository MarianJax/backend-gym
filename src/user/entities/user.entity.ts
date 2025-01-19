import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Entity({ schema: 'esq_gimnasio', name: 'usuario' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id: number;
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contrasena: string;

  @OneToMany(() => Membresia, (membresia) => membresia.users)
  membresias: Membresia;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.user)
  agendamientos: Agendamiento[];

  @ManyToOne(() => Rol, (rol) => rol.users)
  roles: Rol;
  @BeforeInsert() @BeforeUpdate() async hashPassword() {
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
  }
}
