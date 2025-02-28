import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateEjercicioDto {
    @IsString({ message: 'El nombre del ejercicio debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del ejercicio no puede estar vacío' })
    nombre: string;

    @IsString({ message: 'El nivel del ejercicio debe ser un texto' })
    @IsNotEmpty({ message: 'El nivel del ejercicio no puede estar vacío' })
    nivel: string;

    @IsString({ message: 'El número de repeticiones debe ser un texto' })
    @IsNotEmpty({ message: 'El número de repeticiones no puede estar vacío' })
    repeticiones: string;

    @IsString({ message: 'El número de series debe ser un texto' })
    @IsNotEmpty({ message: 'El número de series no puede estar vacío' })
    series: string;

    @IsString({ message: 'El tiempo de descanso debe ser un texto' })
    @IsNotEmpty({ message: 'El tiempo de descanso no puede estar vacío' })
    descanso: string;

    @IsString({ message: 'La descripción debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    descripcion: string; 

    @IsArray()
    @IsNotEmpty({ message: 'La maquina debe ser una valida', each: true })
    @ArrayMinSize(1, { message: 'Seleccione al menos una máquina' })
    maquinas: string[];

    @IsArray()
    @IsNotEmpty({ message: 'La rutina debe ser una válida', each: true })
    @ArrayMinSize(1, { message: 'Seleccione al menos una rutina' })
    rutinas: string[];
}
