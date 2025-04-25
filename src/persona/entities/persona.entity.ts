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
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'personas' })
export class Persona {
  @PrimaryGeneratedColumn('uuid', { name: 'id_persona' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'apellido', type: 'varchar', length: 100 })
  apellido: string;

  @Column({ name: 'correo', unique: true, type: 'varchar', length: 100 })
  @Unique('email_unique', ['email'])
  @Index('email_index_User', { unique: true })
  correo: string;

  @Column({ name: 'cedula', unique: true, type: 'varchar', length: 100 })
  @Unique('cedula_unique', ['cedula'])
  @Index('cedula_index_User', { unique: true })
  cedula: string;

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

  @OneToOne(() => Facultad, (facultad) => facultad.persona, { nullable: true })
  @JoinColumn({ name: 'facultad_id' })
  facultad: Facultad;

  @OneToOne(() => Carrera, (carrera) => carrera.persona, { nullable: true })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;

  @ManyToMany(() => Rol, (rol) => rol.personas, { cascade: true })
  @JoinTable()
  roles: Rol[];

  @OneToMany(() => Membresia, (membresia) => membresia.personas)
  membresias: Membresia[];

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.persona)
  agendamientos: Agendamiento[];

  @OneToMany(() => ValidacionesPago, (validacion_pago) => validacion_pago.personas)
  validacion_pago: ValidacionesPago[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.contrasena) return;
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
  }

}
