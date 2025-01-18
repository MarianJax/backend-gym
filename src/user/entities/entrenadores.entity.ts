import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Horario } from 'src/horario/entities/horario.entity';
import { HorarioEmpleado } from 'src/horario/entities/horario_empleado.entity';

@Entity({ schema: 'esq_gimnasio', name: 'entrenadores' })
export class Entrenadores {
  @PrimaryGeneratedColumn({ name: 'id_entrenador' })
  id: number;
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contrasena: string;
  @Column()
  especialidad: string;

  @Column()
  telefono: string;

  @ManyToOne(() => Horario, (horario) => horario.entrenador)
  horario: Horario;

  @OneToMany(() => HorarioEmpleado, (horario_emp) => horario_emp.entrenador)
  horario_empleado: HorarioEmpleado[];
}
