import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, Min } from 'class-validator';
import { CreatePagoDto } from './create-pago.dto';
import { Metodo } from 'src/enum/entities.enum';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {
    @Min(1, { message: 'El monto debe ser mayor a 0' })
    @IsNotEmpty({ message: 'El monto no puede estar vacío' })
    monto: number;

    @IsDate({ message: 'La fecha debe ser una fecha válida' })
    @Transform(({ value }) => new Date(value + 'T05:00:00.000Z'))
    @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
    fecha_pago: Date;

    @IsEnum(Metodo, { message: 'El método de pago no es válido' })
    @IsNotEmpty({ message: 'El método de pago no puede estar vacío' })
    metodo_pago: Metodo;
}
