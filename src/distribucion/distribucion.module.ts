import { Module } from '@nestjs/common';
import { DistribucionService } from './distribucion.service';
import { DistribucionController } from './distribucion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distribucion } from './entities/distribucion.entity';
import { HorarioModule } from 'src/horario/horario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Distribucion]), HorarioModule],

  controllers: [DistribucionController],
  providers: [DistribucionService],
  exports: [DistribucionService],
})
export class DistribucionModule {}
