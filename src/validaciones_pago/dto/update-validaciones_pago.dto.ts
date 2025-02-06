import { PartialType } from '@nestjs/mapped-types';
import { CreateValidacionesPagoDto } from './create-validaciones_pago.dto';

export class UpdateValidacionesPagoDto extends PartialType(CreateValidacionesPagoDto) {}
