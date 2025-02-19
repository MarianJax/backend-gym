import { Facultad } from 'src/facultad/entities/facultad.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'carreras' })
export class Carrera {
  @PrimaryGeneratedColumn('uuid', { name: 'id_carrera' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @OneToOne(() => User, (user) => user.carrera)
  user: User;

  @ManyToOne(() => Facultad, (facultad) => facultad.carrera)
  @JoinColumn({ name: 'facultad_id' })
  facultad: Facultad;
}
