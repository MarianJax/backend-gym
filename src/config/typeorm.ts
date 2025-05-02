import { Agendamiento } from '../agendamiento/entities/agendamiento.entity';
import { Horario } from '../horario/entities/horario.entity';
import { HorarioEmpleado } from '../horario_empleado/entities/horario_empleado.entity';
import { Mantenimiento } from '../mantenimiento/entities/mantenimiento.entity';
import { Maquina } from '../maquina/entities/maquina.entity';
import { Membresia } from '../membresia/entities/membresia.entity';
import { Pago } from '../pago/entities/pago.entity';
import { Distribucion } from '../distribucion/entities/distribucion.entity';
import { ValidacionesPago } from '../validaciones_pago/entities/validaciones_pago.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root12',
  database: 'gymutm',
  schema: 'esq_gimnasio',
  synchronize: false,
  entities: [
    Agendamiento,
    Horario,
    HorarioEmpleado,
    Mantenimiento,
    Maquina,
    Membresia,
    Pago,
    Distribucion,
    ValidacionesPago
  ],
  migrations: ['./src/database/*-migrations.ts'],
  migrationsRun: true,
  logging: true,
});

export default AppDataSource;
