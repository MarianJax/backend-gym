/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';
import { Agendamiento } from '../../agendamiento/entities/agendamiento.entity';
import { Carrera } from '../../carrera/entities/carrera.entity';
import { Facultad } from '../../facultad/entities/facultad.entity';
import { Membresia } from '../../membresia/entities/membresia.entity';
import { Rol } from '../../rol/entities/rol.entity';
import { ValidacionesPago } from '../../validaciones_pago/entities/validaciones_pago.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column({
    name: 'especialidad',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  especialidad: string;

  @Column({ name: 'telefono', type: 'varchar', length: 15, nullable: true })
  telefono: string;

  @OneToOne(() => Facultad, (facultad) => facultad.user, { nullable: true })
  @JoinColumn({ name: 'facultad_id' })
  facultad: Facultad;

  @OneToOne(() => Carrera, (carrera) => carrera.user, { nullable: true })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;

  @ManyToMany(() => Rol, (rol) => rol.users, { cascade: true })
  @JoinTable()
  roles: Rol[];

  @OneToMany(() => Membresia, (membresia) => membresia.users)
  membresias: Membresia[];

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.user)
  agendamientos: Agendamiento[];

  @OneToMany(() => ValidacionesPago, (validacion_pago) => validacion_pago.users)
  validacion_pago: ValidacionesPago[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.contrasena) return;

    this.contrasena = await bcrypt.hash(this.contrasena, 10);
  }

  @BeforeUpdate()
  async hashPasswordUpdated() {
    if (!this.contrasena) return;
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
  }
}
