import { Carrera } from 'src/carrera/entities/carrera.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'facultades' })
export class Facultad {
  @PrimaryGeneratedColumn('uuid', { name: 'id_facultad' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @OneToOne(() => User, (user) => user.facultad)
  user: User;

  @OneToMany(() => Carrera, (carrera) => carrera.facultad)
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera[];
}
