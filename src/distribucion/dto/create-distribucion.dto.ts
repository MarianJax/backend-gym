import { IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateDistribucionDto {
    @IsString({ message: 'El rol debe ser un texto' })
    @IsNotEmpty({ message: 'El rol del rol es requerido' })
    rol_id: string;

    @Min(0.25, { message: 'El pago diario debe ser mayor a 0.25' })
    @IsNotEmpty({ message: 'El pago diario es requerido' })
    pago_diario: number;

    @Min(0.25, { message: 'El pago mensual debe ser mayor a 0.25' })
    @IsNotEmpty({ message: 'El pago mensual es requerido' })
    pago_mensual: number;

    @Min(1, { message: 'El tiempo debe ser mayor a 1' })
    @IsNotEmpty({ message: 'El tiempo es requerido' })
    tiempo: number;

    @Min(1, { message: 'El cupo debe ser mayor a 1' })
    @IsNotEmpty({ message: 'El cupo es requerido' })
    cupo: number;
}

