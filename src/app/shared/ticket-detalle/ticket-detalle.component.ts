import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket.model';
import { Usuario } from '../../models/usuario-model';

@Component({
  selector: 'app-ticket-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-detalle.component.html'
})
export class TicketDetalleComponent {
  @Input() ticket!: Ticket;
  @Input() usuarioCreador!: Usuario;
}
