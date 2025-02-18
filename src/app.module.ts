import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { PagoModule } from './pago/pago.module';
import { HorarioModule } from './horario/horario.module';
import { DataSource } from 'typeorm';
import { MaquinaModule } from './maquina/maquina.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { MembresiaModule } from './membresia/membresia.module';
import { RolModule } from './rol/rol.module';
import { EntrenadorModule } from './entrenador/entrenador.module';
import { AuthModule } from './auth/auth.module';
import { HorarioEmpleadoModule } from './horario_empleado/horario_empleado.module';
import { ValidacionesPagoModule } from './validaciones_pago/validaciones_pago.module';
import { ConfigModule } from '@nestjs/config';
import configServ from '../config/config-reg';

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
      schema: 'esq_gimnasio',
    }),
    UserModule,
    AgendamientoModule,
    MaquinaModule,
    PagoModule,
    HorarioModule,
    MantenimientoModule,
    MembresiaModule,
    RolModule,
    HorarioEmpleadoModule,
    EntrenadorModule,
    AuthModule,
    ValidacionesPagoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
