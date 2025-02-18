/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { ValidacionesPago } from 'src/validaciones_pago/entities/validaciones_pago.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'usuarios' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id_usuario' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'correo', unique: true, type: 'varchar', length: 100 })
  @Unique('email_unique', ['email'])
  @Index('email_index_User', { unique: true })
  correo: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 200, nullable: true })
  contrasena?: string;

  @ManyToOne(() => Rol, (rol) => rol.users, { eager: true })
  @JoinColumn({ name: 'rol_id' })
  roles: Rol;

  @OneToMany(() => Membresia, (membresia) => membresia.users)
  membresias: Membresia[];

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.user)
  agendamientos: Agendamiento[];

  @OneToMany(() => ValidacionesPago, (validacion_pago) => validacion_pago.users)
  validacion_pago: ValidacionesPago[];

  @BeforeInsert()
  async hashPassword() {
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
  }

  @BeforeUpdate()
  async hashPasswordUpdated() {
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
  }

}
