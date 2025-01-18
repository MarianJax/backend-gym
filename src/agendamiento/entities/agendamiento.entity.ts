import { Membresia } from 'src/pago/entities/membresia.entity';
import { Pago } from 'src/pago/entities/pago.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';


@Entity({ name: 'agendamiento' })
export class Agendamiento {
  @PrimaryGeneratedColumn({ name: 'id_agendamiento' })
  id: number;
  @Column()
  rol: 'estudiante' | 'entrenador' | 'docente' | 'personal_administrativo';
  @Column()
  name: string;
  @Column()
  date: Date;

  @Column()
  email: string;
  @Column()
  tipo_pago: 'diario' | 'mensual';

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Membresia, (menbresia) => menbresia.agendamiento)
 membresia: Membresia[];

}
