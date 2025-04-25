import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PersonaModule } from 'src/persona/persona.module';
import { RolModule } from 'src/rol/rol.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
    timeout: 10000,
    maxRedirects: 5,
  }), PersonaModule, RolModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
