import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity'
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
@Entity({ schema: 'esq_gimnasio', name: 'membresia' })
export class Membresia {
  @PrimaryGeneratedColumn({ name: 'id_membresia' })
  id: number;

  @CreateDateColumn()
  fecha_inicio: Date;

  @Column()
  fecha_fin: string;
  @Column()
  tipo_pago: string;

  @ManyToOne(() => User, (user) => user.membresias)
  users: User;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.membresias)
  agendamientos: Agendamiento[];

  
}
