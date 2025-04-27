import { Module } from '@nestjs/common';
import { DistribucionService } from './distribucion.service';
import { DistribucionController } from './distribucion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distribucion } from './entities/distribucion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Distribucion])],

  controllers: [DistribucionController],
  providers: [DistribucionService],
  exports: [DistribucionService],
})
export class DistribucionModule {}
