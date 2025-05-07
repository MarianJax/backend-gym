import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { PagoModule } from './pago/pago.module';
import { HorarioModule } from './horario/horario.module';
import { DataSource } from 'typeorm';
import { MaquinaModule } from './maquina/maquina.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { MembresiaModule } from './membresia/membresia.module';
import { DistribucionModule } from './distribucion/distribucion.module';
import { AuthModule } from './auth/auth.module';
import { HorarioEmpleadoModule } from './horario_empleado/horario_empleado.module';
import { ValidacionesPagoModule } from './validaciones_pago/validaciones_pago.module';
import { ConfigModule } from '@nestjs/config';
import configServ from '../config/config-reg';
import { ReportsModule } from './reports/reports.module';
import { InstitucionModule } from './institucion/institucion.module';

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
      synchronize: true,
      logging: true,
      dropSchema: true,
      schema: 'esq_gimnasio',
    }),
    AgendamientoModule,
    MaquinaModule,
    PagoModule,
    HorarioModule,
    MantenimientoModule,
    MembresiaModule,
    DistribucionModule,
    HorarioEmpleadoModule,
    AuthModule,
    ValidacionesPagoModule,
    ReportsModule,
    InstitucionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
