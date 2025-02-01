import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';
import { IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class UpdateRolDto extends PartialType(CreateRolDto) {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del rol es requerido' })
    @IsOptional()
    readonly name?: string;

    @Min(0.25, { message: 'El monto de pago debe ser mayor a 0.25' })
    @IsOptional()
    readonly monto_de_pago?: number;

    @IsString({ message: 'El tiempo debe ser un texto' })
    @IsNotEmpty({ message: 'El tiempo es requerido' })
    @IsOptional()
    readonly tiempo?: string;

    @Min(1, { message: 'El cupo debe ser mayor a 1' })
    @IsOptional()
    readonly cupo?: number;
}
