import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
import { DiaSemana } from '../../enum/entities.enum';

@Entity({ schema: 'esq_gimnasio', name: 'horario_empleado' })
export class HorarioEmpleado {

  @PrimaryGeneratedColumn('uuid', { name: 'id_horario_empleado' })
  id: string;

  @Column({ name: 'fecha', type: 'timestamptz' })
  fecha: Date;

  @Column({ name: 'franja_hora_inicio', type: 'time' })
  franja_hora_inicio: Date;

  @Column({ name: 'usuario_id', type: 'varchar', length: 50 })
  usuario_id: string;

  @Column({
    type: 'enum',
    enum: DiaSemana,
    name: 'dia_semana',
    array: true,
  })
  dia_semana: DiaSemana[];

  @Column({ name: 'franja_hora_fin', type: 'time' })
  franja_hora_fin: Date;

}
