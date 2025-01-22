import { Entrenadores } from 'src/entrenador/entities/entrenador.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum Jornada {
  VESPERTINA = 'Vespertina',
  MATUTINA = 'Matutina',
  NOCTURNA = 'Nocturna',
}

enum DiaSemana {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miercoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sabado',
  DOMINGO = 'Domingo',
}

@Entity({ schema: 'esq_gimnasio', name: 'horario' })
export class Horario {
  @PrimaryGeneratedColumn('uuid', { name: 'id_horario' })
  id: string;

  @Column({
    type: 'enum',
    enum: Jornada,
    name: 'jornada',
  })
  jornada: Jornada;

  @Column({
    type: 'enum',
    enum: DiaSemana,
    name: 'dia_semana',
  })
  dia_semana: DiaSemana;

  @Column({ name: 'hora_inicio', type: 'time' })
  hora_inicio: Date;

  @Column({ name: 'hora_fin', type: 'time' })
  hora_fin: Date;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @OneToMany(() => Entrenadores, (entrenador) => entrenador.horario_empleado)
  entrenador: Entrenadores[];
}
