import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsString, IsOptional } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString({ message: 'La carrera debe ser un texto' })
    @IsOptional()
    carrera?: string;


    @IsString({ message: 'La facultad debe ser un texto' })
    @IsOptional()
    facultad?: string;
}
