
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
}

export enum Estado {
    DISPONIBLE = 'Disponible',
    MANTENIMIENTO = 'Mantenimiento',
    FUERASERVICIO = 'Fuera de servicio',
}

export enum Metodo {
  DIARIO = 'Diario', // tarjeta?
  MENSUAL = 'Mensual', // tranfrencia?
}

export enum EstadoPago {
    PENDIENTE = 'Pendiente',
    APROBADO = 'Aprobado',
    RECHAZADO = 'Rechazado',
}