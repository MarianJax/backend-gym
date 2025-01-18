import { Rol } from 'src/user/entities/roles.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'horario' })
export class Horario{
  @PrimaryGeneratedColumn({ name: 'id_horario' })
  id: number;
  @Column()
  rol: 'estudiante' | 'entrenador' | 'docente' | 'personal_administrativo';
  @Column()
  jornada: string;
  @Column()
  date_semana: Date;

  @Column()
  hora_inicio: Date;
  @Column()
  hora_fin: Date;

 

  @ManyToOne(() => Rol, (rol) => rol.horario)
  horario: Horario[];

  @UpdateDateColumn()
  updated_at: Date;
}
