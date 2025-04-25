import { HorarioEmpleado } from '../../horario_empleado/entities/horario_empleado.entity';
import { Horario } from '../../horario/entities/horario.entity';
import { Persona } from '../../persona/entities/persona.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn('uuid', { name: 'id_rol' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 50 })
  nombre: string;

  @Column({ name: 'pago_diario', type: 'decimal', precision: 10, scale: 2, nullable: true })
  pago_diario?: number;

  @Column({ name: 'pago_mensual', type: 'decimal', precision: 10, scale: 2, nullable: true })
  pago_mensual?: number;

  @Column({ name: 'tiempo', type: 'integer', nullable: true })
  tiempo?: number;

  @Column({ name: 'cupos', type: 'integer', nullable: true })
  cupo?: number;

  @OneToMany(() => Horario, (horario) => horario.rol)
  horarios: Horario[];

  @OneToMany(() => HorarioEmpleado, (horario) => horario.rol)
  horario_empleado: HorarioEmpleado[];

  @ManyToMany(() => Persona, (persona) => persona.roles)
  personas: Persona[];
}
