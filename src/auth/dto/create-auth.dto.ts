import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {

    @IsEmail({}, { message: 'El correo debe ser un email válido' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    contrasena: string;
}
