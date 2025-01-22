import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Unique,
  Index,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Horario } from 'src/horario/entities/horario.entity';
import { HorarioEmpleado } from 'src/horario_empleado/entities/horario_empleado.entity';

@Entity({ schema: 'esq_gimnasio', name: 'entrenadores' })
export class Entrenadores {
  @PrimaryGeneratedColumn('uuid',{ name: 'id_entrenador' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'correo', type: 'varchar', length: 100, unique: true })
  @Index('correo_index')
  email: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 100})
  contrasena: string;

  @Column({ name: 'especialidad', type: 'varchar', length: 100 })
  especialidad: string;

  @Column({ name: 'telefono', type: 'varchar', length: 15 })
  telefono: string;

  @ManyToOne(() => Horario)
  @JoinColumn({ name: 'horario_id' })
  horario: Horario;

  @OneToMany(() => HorarioEmpleado, (horario_emp) => horario_emp.entrenador)
  horario_empleado: HorarioEmpleado[];
}
