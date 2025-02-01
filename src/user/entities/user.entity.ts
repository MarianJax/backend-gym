/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';
import { Exclude, instanceToPlain } from 'class-transformer';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'usuario' })
export class User {

  @PrimaryGeneratedColumn('uuid', { name: 'id_usuario' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'correo', unique: true, type: 'varchar', length: 100 })
  @Unique('email_unique', ['email'])
  @Index('email_index_User', { unique: true })
  email: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 200 })
  contrasena?: string;

  @OneToMany(() => Membresia, (membresia) => membresia.users)
  @JoinColumn({ name: 'membresias' })
  membresias: Membresia;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.user)
  @JoinColumn({ name: 'agendamientos' })
  agendamientos: Agendamiento[];

  @ManyToOne(() => Rol, (rol) => rol.users, { eager: true })
  @JoinColumn({ name: 'id_rol' })
  roles: Rol;

  @BeforeInsert()
  async hashPassword() {
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
  }

}
