import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoDto } from './create-pago.dto';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {
    readonly monto: number;
    readonly fecha: Date;
    readonly id_estudiante: number;
    readonly id_rol: number;
    readonly id_horario: number;
}
