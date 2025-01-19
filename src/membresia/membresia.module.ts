import { Module } from '@nestjs/common';
import { MembresiaService } from './membresia.service';
import { MembresiaController } from './membresia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membresia } from './entities/membresia.entity';
import { Pago } from 'src/pago/entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Membresia]), Membresia, Pago,],

  controllers: [MembresiaController],
  providers: [MembresiaService],
  exports: [TypeOrmModule],

})
export class MembresiaModule {}
