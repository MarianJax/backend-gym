import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { PagoModule } from './pago/pago.module';
import { HorarioModule } from './horario/horario.module';

@Module({
  imports: [UserModule,AgendamientoModule, TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root12",
  database: "db",
   autoLoadEntities: true,
   synchronize: true,
   logging: true,
   uuidExtension: "uuid-ossp",
   schema: "esq_gimnasio",
   }),UserModule, AgendamientoModule, PagoModule, HorarioModule,],
   controllers: [AppController,],
  providers: [AppService, UserModule, AgendamientoModule, PagoModule, HorarioModule,],
})
export class AppModule {}
