import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { Usuario } from '../models/usuario-model';
import { Trabajador } from '../models/trabajador.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('data/tickets.json');
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('data/usuarios.json');
  }

  getTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>('data/trabajadores.json');
  }
}
