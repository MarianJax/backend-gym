import { IsNotEmpty, IsString, Min } from "class-validator";

export class CreateRolDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del rol es requerido' })
    nombre: string;

    @Min(0.25, { message: 'El monto de pago debe ser mayor a 0.25' })
    @IsNotEmpty({ message: 'El monto de pago es requerido' })
    monto_pago: number;

    @IsString({ message: 'El tiempo debe ser un texto' })
    @IsNotEmpty({ message: 'El tiempo es requerido' })
    tiempo: string;

    @Min(1, { message: 'El cupo debe ser mayor a 1' })
    @IsNotEmpty({ message: 'El cupo es requerido' })
    cupo: number;
}

