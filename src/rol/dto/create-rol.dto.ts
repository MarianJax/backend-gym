import { IsNotEmpty, IsString, Min } from "class-validator";

export class CreateRolDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del rol es requerido' })
    readonly name: string;

    @Min(0.25,{ message: 'El monto de pago debe ser mayor a 0.25' })
    readonly monto_de_pago: number;

    @IsString({ message: 'El tiempo debe ser un texto' })
    @IsNotEmpty({ message: 'El tiempo es requerido' })
    readonly tiempo: string;

    @Min(1,{ message: 'El cupo debe ser mayor a 1' })
    readonly cupo: number;
}

