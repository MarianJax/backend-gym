import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Horario } from 'src/horario/entities/horario.entity';
import { User } from './user.entity';
@Entity({ schema: 'esq_gimnasio', name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn({ name: 'id_rol' })
  id: number;
  @Column()
  name: string;

  @Column()
  monto_de_pago: number;

  @Column()
  tiempo: number;

  @Column()
  cupo: number;

  @OneToMany(() => Horario, (horario) => horario.rol)
  horarios: Horario[];

  @OneToMany(() => User, (user) => user.roles)
  users: User[];
}
