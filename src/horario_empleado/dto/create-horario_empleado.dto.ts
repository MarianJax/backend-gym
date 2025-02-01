import { IsEnum, IsMilitaryTime, IsNotEmpty } from "class-validator";
import { DiaSemana, Jornada, RolHorario } from "src/enum/entities.enum";

export class CreateHorarioEmpleadoDto {
    @IsEnum(Jornada, { message: 'Jornada inválida.' })
    jornada: Jornada;

    @IsEnum(DiaSemana, { message: 'Dia de semana inválido.' })
    dia_semana: DiaSemana;

    @IsMilitaryTime({ message: 'La hora de fin debe ser una hora válida' })
    hora_inicio: string;

    @IsMilitaryTime({ message: 'La hora de fin debe ser una hora válida' })
    hora_fin: string;

    @IsEnum(RolHorario, { message: 'El rol no es válido.' })
    rol: RolHorario;

    @IsNotEmpty({ message: 'El entrenador es requerido' })
    id_entrenador: string;
}
