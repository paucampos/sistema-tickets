import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ver-solicitudes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-solicitudes.component.html',
  styleUrls: ['./ver-solicitudes.component.scss']
})
export class VerSolicitudesComponent implements OnInit {
  tickets: any[] = [];
  ticketsFiltrados: any[] = [];

  constructor(
    private ticketService: TicketService,
    public authService: AuthService,
    ) {}


  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
      const usuario = this.authService.usuarioActual;
      if (usuario.rol === 'cliente') {
        this.ticketsFiltrados = tickets.filter(t => t.usuarioId === usuario.id);
      }

      if (usuario.rol === 'gerente') {
        this.ticketsFiltrados = tickets.filter(t => t.estado === 'ingresado');
      }

      if (usuario.rol === 'soporte') {
        this.ticketsFiltrados = tickets.filter(t => t.trabajadorId === usuario.id);
      }
    });
  }

}
