import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Rol } from './roles.entity';
import { Membresia } from 'src/pago/entities/membresia.entity';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';

@Entity({ schema: 'esq_gimnasio', name: 'usuario' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id: number;
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contrasena: string;

  @OneToMany(() => Membresia, (membresia) => membresia.users)
  membresias: Membresia;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.user)
  agendamientos: Agendamiento[];

  @ManyToOne(() => Rol, (rol) => rol.users)
  roles: Rol;
}
