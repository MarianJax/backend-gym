import { Horario } from 'src/horario/entities/horario.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn('uuid', { name: 'id_rol' })
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 50 })
  nombre: string;

  @Column({ name: 'monto_pago', type: 'decimal', precision: 10, scale: 2 })
  monto_pago: number;

  @Column({ name: 'tiempo', type: 'text' })
  tiempo: string;

  @Column({ name: 'cupos', type: 'integer' })
  cupo: number;

  @OneToMany(() => Horario, (horario) => horario.rol)
  horarios: Horario[];

  @OneToMany(() => User, (user) => user.roles)
  users: User[];
}
