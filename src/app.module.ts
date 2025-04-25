import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from './persona/persona.module';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { PagoModule } from './pago/pago.module';
import { HorarioModule } from './horario/horario.module';
import { DataSource } from 'typeorm';
import { MaquinaModule } from './maquina/maquina.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { MembresiaModule } from './membresia/membresia.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { HorarioEmpleadoModule } from './horario_empleado/horario_empleado.module';
import { ValidacionesPagoModule } from './validaciones_pago/validaciones_pago.module';
import { ConfigModule } from '@nestjs/config';
import { FacultadModule } from './facultad/facultad.module';
import { CarreraModule } from './carrera/carrera.module';
import { RutinaModule } from './rutina/rutina.module';
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import configServ from '../config/config-reg';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configServ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root12',
      database: 'gymutm',
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
      schema: 'esq_gimnasio',
    }),
    PersonaModule,
    AgendamientoModule,
    MaquinaModule,
    PagoModule,
    HorarioModule,
    MantenimientoModule,
    MembresiaModule,
    RolModule,
    HorarioEmpleadoModule,
    AuthModule,
    ValidacionesPagoModule,
    FacultadModule,
    CarreraModule,
    RutinaModule,
    EjerciciosModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
