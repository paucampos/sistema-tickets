export interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  sector: string;
  fechaSolicitud: string;
  fechaResolucion?: string;
  estado: 'ingresado' | 'pendiente' | 'cerrado';
  prioridad: 'alta' | 'media' | 'baja';
  usuarioId: number;
  trabajadorId?: number;
  resolucion?: string;
}
