import { IsString, IsNotEmpty } from "class-validator";

export class CreateRutinaDto {
    @IsString({ message: 'El nombre de la rutina debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre de la rutina debe tener al menos 3 caracteres' })
    nombre: string;

    @IsString({ message: 'La intensidad de la rutina debe ser un texto' })
    @IsNotEmpty({ message: 'La intensidad de la rutina debe tener al menos 3 caracteres' })
    intensidad: string;

    @IsString({ message: 'La descripción de la rutina debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción de la rutina debe tener al menos 3 caracteres' })
    descripcion: string;
}
