import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { Trabajador } from '../../models/trabajador.model';
import { Ticket } from '../../models/ticket.model';
import { TicketDetalleComponent } from '../../shared/ticket-detalle/ticket-detalle.component';
import { Usuario } from '../../models/usuario-model';
declare var bootstrap: any;

@Component({
  selector: 'app-asignar-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketDetalleComponent],
  templateUrl: './asignar-ticket.component.html'
})
export class AsignarTicketComponent implements OnInit {
  @ViewChild('modalConfirmacion', { static: false }) modalRef!: ElementRef;

  ticket: Ticket | null = null;
  trabajadorSeleccionado: Trabajador | null = null;
  trabajadoresDisponibles: Trabajador[] = [];
  usuarioCreador: Usuario | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketsService: TicketService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketsService.getTickets().subscribe(tickets => {
      this.ticket = tickets.find(t => t.id === id) || null;

      if (this.ticket) {
        this.ticketsService.getUsuarios().subscribe((usuarios: Usuario[]) => {
          this.usuarioCreador = usuarios.find(u => u.id === this.ticket?.usuarioId) || null;
        });
      }
    });

    this.ticketsService.getTrabajadores().subscribe(trabajadores => {
      this.trabajadoresDisponibles = trabajadores.filter(t => t.ticketsAsignados < 20);
    });
  }

  cancelar(): void {
    this.router.navigate(['/solicitudes']);
  }

  asignar(): void {
    if (this.ticket && this.trabajadorSeleccionado) {
      this.ticket.trabajadorId = this.trabajadorSeleccionado.id;
      this.ticket.estado = 'pendiente';

      // Mostrar modal usando Bootstrap JS
      const modal = new bootstrap.Modal(this.modalRef.nativeElement);
      modal.show();
    }
  }

  confirmarRedireccion(): void {
    this.router.navigate(['/solicitudes']);
  }

}
