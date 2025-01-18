import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Mantenimiento } from 'src/maquina/entities/mantenimiento.entity';

@Entity({ name: 'maquina' })
export class Maquina {
  @PrimaryGeneratedColumn({ name: 'id_maquina' })
  id: string;
  @Column()
  name: string;
  @Column()
  date_compra: Date;

  @Column()
  descripcion: string;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.maquina)
  mantenimiento: Mantenimiento[];
}
