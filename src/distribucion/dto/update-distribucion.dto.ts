import { PartialType } from '@nestjs/mapped-types';
import { CreateDistribucionDto } from './create-distribucion.dto';
import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateDistribucionDto extends PartialType(CreateDistribucionDto) {}
