import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InstitucionController } from './institucion.controller';
import { InstitucionService } from './institucion.service';

@Module({
  imports: [
    HttpModule.register({
          maxRedirects: 10,
        }),
  ],
  controllers: [InstitucionController],
  providers: [InstitucionService],
  exports: [InstitucionService],
})
export class InstitucionModule {}
