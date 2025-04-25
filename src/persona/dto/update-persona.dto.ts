import { PartialType } from "@nestjs/mapped-types";
import { CreatePersonaDto } from "./create-persona.dto";
import { IsString, IsOptional } from "class-validator";

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {

    @IsString({ message: 'La carrera debe ser un texto' })
    @IsOptional()
    carrera?: string;


    @IsString({ message: 'La facultad debe ser un texto' })
    @IsOptional()
    facultad?: string;
}
