import { IsBoolean, IsDate, IsString, IsTimeZone } from "class-validator";

export class CreateAgendamientoDto {
    @IsDate()
    fecha: Date;

    @IsString()
    usuario_id: string;

    @IsDate()
    hora_inicio: Date;

    @IsDate()
    hora_fin: Date;

    @IsBoolean()
    asisitio: boolean;
}
