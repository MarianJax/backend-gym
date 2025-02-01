import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString, Length, Min } from "class-validator";
import { Estado } from "../entities/maquina.entity";

export class CreateMaquinaDto {
  @IsString({ message: 'El nombre de la maquina debe ser un texto' })
  @Length(3, 150, { message: 'El nombre de la maquina debe tener al menos 3 caracteres' })
  name: string;

  @IsDate({ message: 'Debe ser una fecha válida' })
  @Type(() => Date)
  date_compra: Date;

  @Min(1, { message: 'La cantidad no puede ser menor a 1' })
  @IsNotEmpty({ message: 'La cantidad no puede estar vacío' })
  cantidad: number;

  @IsEnum(Estado, { message: 'Estado inválido. Debe ser uno de los valores: Disponible, en mantenimiento o Fuera de servicio.' })
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  estado: Estado;

  @IsNotEmpty({ message: 'La descripción no puede estar vacío' })
  descripcion: string;

}
