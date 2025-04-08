import { PartialType } from '@nestjs/mapped-types';
import { CreateValidacionesPagoDto } from './create-validaciones_pago.dto';
import { IsOptional } from 'class-validator';
import { EstadoPago } from '../../enum/entities.enum';

export class UpdateValidacionesPagoDto extends PartialType(CreateValidacionesPagoDto) {

    @IsOptional()
    fecha_validacion?: Date;

    @IsOptional()
    estado?: EstadoPago;
}
