import { IsEnum, IsISO8601, IsMilitaryTime, IsNotEmpty } from "class-validator";
import { DiaSemana } from "src/enum/entities.enum";

export class CreateHorarioEmpleadoDto {

    @IsISO8601({ strict: true }, { message: 'La fecha debe tener el formato YYYY-MM-DD' })
    @IsNotEmpty({ message: 'La fecha no puede estar vacío' })
    fecha: Date;

    @IsNotEmpty({ message: 'La franja de hora de inicio es requerida' })
    @IsMilitaryTime({ message: 'La franja de hora de inicio debe ser una hora válida' })
    franja_hora_inicio: string;

    @IsEnum(DiaSemana, { message: 'Dia de semana inválido.' })
    dia_semana: DiaSemana;

    @IsNotEmpty({ message: 'La franja de hora de fin es requerida' })
    @IsMilitaryTime({ message: 'La franja de hora de fin debe ser una hora válida' })
    franja_hora_fin: string;

}
