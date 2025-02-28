import { Module } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaController } from './rutina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutina } from './entities/rutina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rutina])],
  controllers: [RutinaController],
  providers: [RutinaService],
  exports: [RutinaService]
})
export class RutinaModule {}
