import { Pago } from '../../pago/entities/pago.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'esq_gimnasio', name: 'validaciones_pagos' })
export class ValidacionesPago {
    @PrimaryGeneratedColumn('uuid', { name: 'id_validacion' })
    id: string;

    @Column({ name: 'fecha_validacion', type: 'timestamptz' })
    fecha_validacion: Date;

    @Column({ name: 'evidencia', type: 'text' })
    evidencia: string;

    @Column({ name: 'token_pago', type: 'varchar', length: 100 })
    token_pago: string;

    @ManyToOne(() => Pago, (pago) => pago.validacion_pago)
    @JoinColumn({ name: 'pago_id' })
    pagos: Pago;


    @ManyToOne(() => User, (user) => user.validacion_pago)
    @JoinColumn({ name: 'usuario_id' })
    users: User;

}
