import { IsEnum, IsISO8601, IsNotEmpty, Min } from "class-validator";
import { Metodo } from "../../enum/entities.enum";

export class CreatePagoDto {
    @Min(1, { message: 'El monto debe ser mayor a 0' })
    @IsNotEmpty({ message: 'El monto no puede estar vacío' })
    monto: number;

    @IsISO8601()
    @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
    fecha_pago: Date;

    @IsEnum(Metodo, { message: 'El método de pago no es válido' })
    @IsNotEmpty({ message: 'El método de pago no puede estar vacío' })
    metodo_pago: Metodo;
}
