import * as bcrypt from 'bcryptjs';
import { Horario } from 'src/horario/entities/horario.entity';
import { HorarioEmpleado } from 'src/horario_empleado/entities/horario_empleado.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'entrenadores' })
export class Entrenadores {

  @PrimaryGeneratedColumn('uuid', { name: 'id_entrenador' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'correo', type: 'varchar', length: 100, unique: true })
  @Index('correo_index')
  email: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 100 })
  contrasena: string;

  @Column({ name: 'especialidad', type: 'varchar', length: 100 })
  especialidad: string;

  @Column({ name: 'telefono', type: 'varchar', length: 15 })
  telefono: string;

  @ManyToOne(() => Horario, (horario) => horario.entrenadores)
  @JoinColumn({ name: 'id_horario' })
  horario: Horario;

  @OneToMany(() => HorarioEmpleado, (horario_emp) => horario_emp.entrenador)
  @JoinColumn({ name: 'horario_empleado' })
  horario_empleados: HorarioEmpleado[];

  @BeforeInsert()
  async hashPassword() {
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
  }
}
