import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Maquina } from 'src/maquina/entities/maquina.entity';
@Entity({ schema: 'esq_gimnasio', name: 'mantenimiento' })
export class Mantenimiento {
  @PrimaryGeneratedColumn({ name: 'id_mantenimiento' })
  id: string;
  @Column()
  estado: string;
  @Column()
  date_mantenimiento: string;

  @Column()
  observaciones: string;

  @ManyToOne(() => Maquina, (maquina) => maquina.mantenimiento)
  maquina: Maquina;
}
