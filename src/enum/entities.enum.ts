
export enum Jornada {
    VESPERTINA = 'Vespertina',
    MATUTINA = 'Matutina',
    NOCTURNA = 'Nocturna',
}

export enum DiaSemana {
    LUNES = 'Lunes',
    MARTES = 'Martes',
    MIERCOLES = 'Miercoles',
    JUEVES = 'Jueves',
    VIERNES = 'Viernes',
    SABADO = 'Sabado',
    DOMINGO = 'Domingo',
}

export enum Estado {
    DISPONIBLE = 'Disponible',
    MANTENIMIENTO = 'Mantenimiento',
    FUERASERVICIO = 'Fuera de servicio',
}

export enum Metodo {
    DIARIO = 'Diario', // tarjeta?
    SEMANAL = 'Semanal', // tarjeta?
    MENSUAL = 'Mensual', // tranfrencia?
}

export enum EstadoPago {
    PENDIENTE = 'Pendiente',
    APROBADO = 'Aprobado',
    RECHAZADO = 'Rechazado',
}

export const diasEn = {
    Monday: 'Lunes',
    Tuesday: 'Martes',
    Wednesday: 'Miércoles',
    Thursday: 'Jueves',
    Friday: 'Viernes',
    Saturday: 'Sábado',
    Sunday: 'Domingo',
};