import { IsOptional } from "class-validator";


export class CreateUserDto {
    name: string; 

    email: string; 

    password?: string; 

    id_rol: string; 

}
