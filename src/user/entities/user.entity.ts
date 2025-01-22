import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  Index,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Entity({ schema: 'esq_gimnasio', name: 'usuario' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id_usuario' })
  id: string;
  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'correo', unique: true, type: 'varchar', length: 100 })
  @Index('email_index_User')
  email: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 100 })
  contrasena: string;

  @OneToMany(() => Membresia, (membresia) => membresia.users)
  membresias: Membresia;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.user)
  agendamientos: Agendamiento[];

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_rol', referencedColumnName: '' })
  roles: Rol;

  @BeforeInsert()
  async hashPassword() {
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
  }
}
