import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    ManyToMany,
    OneToMany,
    ManyToOne,
  } from 'typeorm';
import { Maquina } from 'src/maquina/entities/maquina.entity';  
  @Entity({ name: 'mantenimiento' })
  export class Mantenimiento {
    @PrimaryGeneratedColumn({ name: 'id_mantenimiento' })
    id: string;
    @Column()
    estado: string;
    @Column()
    date_mantenimiento: Date;
  
    @Column()
    observaciones: string;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => Maquina, (maquina) => maquina.mantenimiento)
    maquina: Maquina[];
  }