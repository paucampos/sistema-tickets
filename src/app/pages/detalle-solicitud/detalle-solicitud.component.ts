import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { Usuario } from '../../models/usuario-model';
import { Trabajador } from '../../models/trabajador.model';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-solicitud.component.html'
})
export class DetalleSolicitudComponent implements OnInit {
  ticket: Ticket | null = null;
  usuarioCreador: Usuario | null = null;
  trabajadorAsignado: Trabajador | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
      this.ticket = tickets.find(t => t.id === id) || null;

      if (this.ticket) {
        const ticketActual = this.ticket;

        this.ticketService.getUsuarios().subscribe(usuarios => {
          this.usuarioCreador = usuarios.find(u => u.id === ticketActual.usuarioId) || null;
        });
      }

      if (this.ticket?.trabajadorId) {
        this.ticketService.getTrabajadores().subscribe((trabjadores: Trabajador[]) => {
          this.trabajadorAsignado = trabjadores.find(u => u.id === this.ticket?.trabajadorId) || null;
        });
      }
    });
  }

  volver(): void {
    this.router.navigate(['/solicitudes']);
  }
}
