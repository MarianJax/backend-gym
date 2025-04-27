import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membresia } from './entities/membresia.entity';
import { MembresiaController } from './membresia.controller';
import { MembresiaService } from './membresia.service';
import { PagoModule } from 'src/pago/pago.module';

@Module({
  imports: [TypeOrmModule.forFeature([Membresia]), PagoModule],
  controllers: [MembresiaController],
  providers: [MembresiaService],
  exports: [MembresiaService],

})
export class MembresiaModule { }
