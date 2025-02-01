import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Membresia } from './entities/membresia.entity';
import { MembresiaController } from './membresia.controller';
import { MembresiaService } from './membresia.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Membresia]), UserModule],
  controllers: [MembresiaController],
  providers: [MembresiaService, UserService],
  exports: [TypeOrmModule],

})
export class MembresiaModule { }
