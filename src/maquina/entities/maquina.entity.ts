import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Mantenimiento } from 'src/mantenimiento/entities/mantenimiento.entity';
@Entity({ schema: 'esq_gimnasio', name: 'maquina' })
export class Maquina {
  @PrimaryGeneratedColumn({ name: 'id_maquina' })
  id: string;
  @Column()
  name: string;
  @Column()
  date_compra: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.maquina)
  mantenimiento: Mantenimiento[];
}
