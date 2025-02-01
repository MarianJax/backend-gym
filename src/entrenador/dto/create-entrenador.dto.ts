import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateEntrenadorDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @Length(3, 150, { message: 'El nombre debe tener al menos 3 caracteres' })
    name: string;

    @IsEmail({}, { message: 'El correo debe ser un email' })
    @Length(3, 255, { message: 'El correo debe tener al menos 3 caracteres' })
    email: string;

    @IsString({ message: 'La contraseña debe ser un texto' })
    @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres' })
    contrasena: string;

    @IsString({ message: 'La especialidad debe ser un texto' })
    @Length(3, 150, { message: 'La especialidad debe tener al menos 3 caracteres' })
    especialidad: string;

    @IsString({ message: 'El telefono debe ser un texto' })
    @Length(10, 15, { message: 'El telefono debe tener al menos 10 y 15 maximo caracteres' })
    telefono: string;

    @IsNotEmpty({ message: 'El horario es requerido' })
    id_horario: string;
}
