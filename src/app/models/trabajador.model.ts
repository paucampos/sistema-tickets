import { Usuario } from "./usuario-model";

export interface Trabajador extends Usuario {
  ticketsAsignados: number;
}
