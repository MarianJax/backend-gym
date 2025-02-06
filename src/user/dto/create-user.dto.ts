import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class CreateUserDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @Length(3, 150, { message: 'El nombre debe tener al menos 3 caracteres' })
    nombre: string;

    @IsEmail({}, { message: 'El correo debe ser un email' })
    @Length(3, 255, { message: 'El correo debe tener al menos 3 caracteres' })
    correo: string;

    @IsString({ message: 'La contraseña debe ser un texto' })
    @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres' })
    @IsOptional()
    contrasena?: string;

    @IsNotEmpty({ message: 'El nivel es requerido' })
    @IsEnum([1, 2, 3,4,5,6,7,8,9], { message: 'El nivel debe ser 1, 2, ..., 3' })
    nivel: number;

    @IsString({ message: 'El rol debe ser un texto' })
    @Length(3, undefined, { message: 'El rol debe tener al menos 3 caracteres' })
    rol_id: string;

}
