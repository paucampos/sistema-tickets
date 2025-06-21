import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { TicketDetalleComponent } from '../../shared/ticket-detalle/ticket-detalle.component';
import { Ticket } from '../../models/ticket.model';
import { Usuario } from '../../models/usuario-model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cerrar-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketDetalleComponent],
  templateUrl: './cerrar-ticket.component.html'
})
export class CerrarTicketComponent implements OnInit {
  ticket: Ticket | null = null;
  usuarioCreador: Usuario | null = null;
  resolucionTexto: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
      this.ticket = tickets.find(t => t.id === id) || null;

      if (this.ticket) {
        this.ticketService.getUsuarios().subscribe((usuarios: Usuario[]) => {
          this.usuarioCreador = usuarios.find(u => u.id === this.ticket?.usuarioId) || null;
        });
      }
    });
  }

  cerrarTicket(): void {
    if (this.resolucionTexto.trim().length === 0) {
      this.error = 'Debes ingresar una resolución.';
      return;
    }

    if (this.resolucionTexto.length > 500) {
      this.error = 'La resolución no puede exceder los 500 caracteres.';
      return;
    }

    if (this.ticket) {
      this.ticket.estado = 'cerrado';
      this.ticket.fechaResolucion = new Date().toISOString().split('T')[0];
      this.ticket.resolucion = this.resolucionTexto;
      this.error = '';
      alert('Ticket cerrado correctamente');
      this.router.navigate(['/solicitudes']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/solicitudes']);
  }
}
