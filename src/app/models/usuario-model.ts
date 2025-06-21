export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  rol: 'cliente' | 'soporte' | 'gerente';
}
