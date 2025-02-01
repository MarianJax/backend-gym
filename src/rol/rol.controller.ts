import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService){}
  /*async someAction(rolId: number) { 
    function verificarPermiso(roleId: number) { 
      var rolData = rolId[rolId]; if (!rolData) { console.log("Rol no encontrado."); 
        return false;
      }
    const hasPermission =  this.rolService.hasPermission(rolId);
     if (!hasPermission) { 
      throw new Error('No tienes permiso para realizar esta acción en este horario.'); }
     }
    }
    private verificarPermiso(rolId: number): boolean { 
      const roles = { 
      1: { rolId: 'estudiante', horarios: ['08:00-09:00', '13:00-14:00', '17:00-18:00'] }, 
      2: { rolId: 'administrativo', horarios: ['09:00-10:00', '14:00-15:00', '18:00-19:00'] },
      3: { rolId: 'docente', horarios: ['10:00-11:00', '15:00-16:00', '19:00-20:00'] }, };
      }*/

  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolService.remove(id);
  }
}
