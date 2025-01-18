import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { PagoModule } from './pago/pago.module';
import { HorarioModule } from './horario/horario.module';
import { DataSource, EntitySchema } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Rol } from './user/entities/roles.entity';
import { Horario } from './horario/entities/horario.entity';
import { HorarioEmpleado } from './horario/entities/horario_empleado.entity';
import { Maquina } from './maquina/entities/maquina.entity';
import { Mantenimiento } from './maquina/entities/mantenimiento.entity';

@Module({
  imports: [UserModule,AgendamientoModule, TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root12",
  database: "gymutm",
   autoLoadEntities: true,
   synchronize: true,
   logging: true,
   schema: 'esq_gimnasio'
   }), PagoModule, HorarioModule,],
   controllers: [AppController,],
  providers: [AppService, UserModule, AgendamientoModule, PagoModule, HorarioModule,],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
