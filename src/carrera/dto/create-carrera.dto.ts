import { IsNotEmpty, IsString } from "class-validator";

export class CreateCarreraDto {
    @IsString({ message: 'El nombre de la carrera debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre de la carrera no puede estar vacío' })
    nombre: string;

    @IsString({ message: 'La facultad debe ser un texto' })
    @IsNotEmpty({ message: 'La facultad no puede estar vacío' })
    facultad_id: string;
}
