import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';

export class UpdateRolDto extends PartialType(CreateRolDto) {
    readonly name?: string;
    readonly monto_de_pago?: number;
    readonly tiempo?: string;
    readonly cupo?: number;
}
