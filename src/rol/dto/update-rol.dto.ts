import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';
import { IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class UpdateRolDto extends PartialType(CreateRolDto) {
    
}
