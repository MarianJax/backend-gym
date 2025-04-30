import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly PagoRepository: Repository<Pago>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    return await this.PagoRepository.create(createPagoDto);
  }

  async save(data: Pago): Promise<Pago> {
    return this.PagoRepository.save(data);
  }

  async findAll(): Promise<any[]> {
    return await this.PagoRepository.find({
      order: { fecha_pago: 'ASC' },
      select: {
      id: true,
      metodo_pago: true,
      monto: true,
      fecha_pago: true,
      validacion_pago: {
        id: true,
        usuario_id: true,
      },
      agendamiento: {
        id: true,
        distribucion: {
        rol_id: true,
        }
      },
      membresia: {
        id: true,
        agendamientos: {
        id: true,
          distribucion: {
          rol_id: true,
        },
        },
      },
      },
      relations: [
      'validacion_pago',
      'agendamiento',
      'agendamiento.distribucion',
      'membresia',
      'membresia.agendamientos',
      'membresia.agendamientos.distribucion',
      ],
    });    

    // //#region CONSULTAR API DE USUARIOS
    // const formatterPagos = [];

    // pagos.map(async (pago) => {
    //   // EndPoint de la API para obtener el usuario por ID
    //   const user = await fetch('http://localhost:3000/api/user/' + pago.validacion_pago[0].usuario_id) // GET
    //   // const userPOST = await fetch('http://localhost:3000/api/user/', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify({ cedula: pago.validacion_pago[0].usuario_id }),
    //   // });

    //   const userData = await user.json(); // { id_personal: 1546546, nombres: "NOMBRE DEL USUARIO", roles: "ESTUDIANTE", FACULTAD: "CIENCIAS .." }

    //   return {
    //     ...pago,
    //     user: {
    //       nombres: userData.nombres,
    //       roles: userData.roles,
    //     }
    //   }
    //  });

    // return formatterPagos;
  }

  async findOne(id: string): Promise<Pago> {
    return await this.PagoRepository.findOneBy({ id });
  }

  async update(id: string, updatePagoDto: UpdatePagoDto): Promise<void> {
    await this.PagoRepository.update(id, updatePagoDto);
  }

  async remove(id: string): Promise<void> {
    await this.PagoRepository.delete(id);
  }

  async findAllPagosRolAndUser(): Promise<Pago[]> {
    return await this.PagoRepository.find();
  }

  async totalCosto(): Promise<number> {
    const mantenimientos = await this.PagoRepository.find();
    return mantenimientos.reduce((total, m) => total + Number(m.monto), 0);
  }
}
