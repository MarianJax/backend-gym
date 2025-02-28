import { Ejercicio } from '../ejercicios/entities/ejercicio.entity';
import { Agendamiento } from '../agendamiento/entities/agendamiento.entity';
import { Carrera } from '../carrera/entities/carrera.entity';
import { Facultad } from '../facultad/entities/facultad.entity';
import { Horario } from '../horario/entities/horario.entity';
import { HorarioEmpleado } from '../horario_empleado/entities/horario_empleado.entity';
import { Mantenimiento } from '../mantenimiento/entities/mantenimiento.entity';
import { Maquina } from '../maquina/entities/maquina.entity';
import { Membresia } from '../membresia/entities/membresia.entity';
import { Pago } from '../pago/entities/pago.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Rutina } from '../rutina/entities/rutina.entity';
import { User } from '../user/entities/user.entity';
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
  entities: [Agendamiento, Carrera,User, Facultad, Horario, HorarioEmpleado, Mantenimiento, Maquina, Membresia, Pago, Rol, Rutina, ValidacionesPago, Ejercicio ],
  migrations: ['./src/database/*-migrations.ts'],
  migrationsRun: true,
  logging: true,
});

export default AppDataSource;
