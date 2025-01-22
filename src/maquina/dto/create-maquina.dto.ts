import { Estado } from "../entities/maquina.entity";

export class CreateMaquinaDto {
  name: string;
  date_compra: Date;
  cantidad: number;
  estado: Estado;
  descripcion: string;
}
