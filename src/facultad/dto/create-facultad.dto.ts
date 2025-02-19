import { IsNotEmpty, IsString } from "class-validator";

export class CreateFacultadDto {
    @IsString({ message: 'El nombre de la carrera debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre de la carrera no puede estar vacío' })
    nombre: string;
}
