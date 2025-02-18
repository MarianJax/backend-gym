import { IsDateString, IsEnum, IsNotEmpty, IsString, Length, Min } from "class-validator";
import { Estado } from "../entities/maquina.entity";

export class CreateMaquinaDto {
  @IsString({ message: 'El nombre de la máquina debe ser un texto' })
  @Length(3, 150, { message: 'El nombre de la máquina debe tener al menos 3 caracteres' })
  nombre: string;

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de compra no puede estar vacío' })
  fecha_compra: Date;

  @Min(1, { message: 'La cantidad no puede ser menor a 1' })
  @IsNotEmpty({ message: 'La cantidad no puede estar vacío' })
  cantidad: number;

  @IsEnum(Estado, { message: 'Estado inválido. Debe ser uno de los valores: Disponible, en mantenimiento o Fuera de servicio' })
  @IsNotEmpty({ message: 'El estado de la máquina no puede estar vacío' })
  estado: Estado;

  @IsNotEmpty({ message: 'La descripción no puede estar vacío' })
  descripcion: string;

}
