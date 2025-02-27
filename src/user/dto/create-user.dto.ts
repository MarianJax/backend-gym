import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(3, 150, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'El correo debe ser un email' })
  @Length(3, 255, { message: 'El correo debe tener al menos 3 caracteres' })
  @Matches(/^[\w.%+-]+@utm\.edu\.ec$/, {
    message: 'El correo debe pertenecer al dominio @utm.edu.ec',
  })
  correo: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @Length(8, 20, {
    message: 'La contraseña debe tener entre 8 y 20 caracteres',
  })
  @IsOptional()
  contrasena?: string;

  @IsString({ message: 'La especialidad debe ser un texto' })
  @Length(3, 150, {
    message: 'La especialidad debe tener al menos 3 caracteres',
  })
  @IsOptional()
  especialidad?: string;

  @IsString({ message: 'El telefono debe ser un texto' })
  @Length(10, 15, {
    message: 'El telefono debe tener al menos 10 y 15 maximo caracteres',
  })
  @IsOptional()
  telefono?: string;

  @IsArray()
  @IsNotEmpty({ message: 'El rol debe ser uno valido', each: true })
  @ArrayMinSize(1, { message: 'Ingrese al menos un rol' })
  rol_id: string[];
}
