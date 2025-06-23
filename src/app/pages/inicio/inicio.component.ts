import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
  nombre: string = '';
  diasParaCumple: number = 0;

  noticias = [
    { titulo: 'nuevo equipo directivo', autor: 'mario quintana', link: '#' },
    { titulo: 'premio a valentina sanhueza', autor: 'RRHH', link: '#' },
    { titulo: 'trabajadores en programación', autor: 'TI', link: '#' }
  ];

  eventos = [
    '27 reunión de contabilidad',
    '24 cumpleaños amanda RRHH',
    '30 reunión próxima capacitación'
  ];

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    const usuario = this.auth.usuarioActual;
    this.nombre = usuario?.nombre || '';

    // Simulación de cálculo de días para cumpleaños
    const hoy = new Date();
    const cumple = new Date(hoy.getFullYear(), 11, 15); // 15 de diciembre
    if (cumple < hoy) cumple.setFullYear(cumple.getFullYear() + 1);
    this.diasParaCumple = Math.floor((cumple.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  }
}
