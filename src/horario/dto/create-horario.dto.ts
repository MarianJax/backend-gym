import { IsEnum, IsMilitaryTime, IsNotEmpty } from "class-validator";
import { DiaSemana, Jornada } from "src/enum/entities.enum";

export class CreateHorarioDto {

    @IsEnum(Jornada, { message: 'Jornada inválida.' })
    jornada: Jornada;

    @IsEnum(DiaSemana, { message: 'Día de semana inválido.', each: true })
    dia_semana: DiaSemana[];

    @IsMilitaryTime({ message: 'La hora de inicio debe ser una hora válida' })
    hora_inicio: string;

    @IsMilitaryTime({ message: 'La hora de fin debe ser una hora válida' })
    hora_fin: string;

    @IsNotEmpty({ message: 'La rol es requerido' })
    rol_id: string;

}
