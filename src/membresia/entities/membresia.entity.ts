import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum Tipo {
  MENSUAL = 'Mensual',
  DIARIO = 'Diario',
}

@Entity({ schema: 'esq_gimnasio', name: 'membresia' })
export class Membresia {

  @PrimaryGeneratedColumn('uuid', { name: 'id_membresia' })
  id: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'date' })
  fecha_inicio: Date;

  @Column({ name: 'fecha_fin', type: 'date' })
  fecha_fin: Date;

  @Column({
    type: 'enum',
    enum: Tipo,
    default: Tipo.DIARIO,
    name: 'tipo_pago'
  })
  tipo_pago: Tipo;

  @Column({ name: 'costo', type: 'decimal', precision: 10, scale: 2 })
  costo: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  users: User;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.membresias)
  agendamientos: Agendamiento[];

  // @BeforeInsert()
  // async setFechaFin() {
  //   // Obtener la fecha de inicio
  //   const fecha = this.fecha_inicio;

  //   // Se valida el tipo de pago
  //   if (this.tipo_pago === Tipo.DIARIO) {

  //     // Se suma un día a la fecha de inicio
  //     fecha.setDate(fecha.getDate() + 1);

  //     // Se asigna la fecha de fin en el caso mensual
  //   } else if (this.tipo_pago === Tipo.MENSUAL) {

  //     // Se suma un mes a la fecha de inicio
  //     fecha.setMonth(fecha.getMonth() + 1);
  //   }

  //   // Se asigna la fecha de fin
  //   this.fecha_fin = fecha;
  // }
}
