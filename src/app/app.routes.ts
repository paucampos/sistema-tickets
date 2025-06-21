import { Routes } from '@angular/router';
import { VerSolicitudesComponent } from './pages/ver-solicitudes/ver-solicitudes.component';
import { DetalleSolicitudComponent } from './pages/detalle-solicitud/detalle-solicitud.component';
import { LoginComponent } from './pages/login/login.component';
import { AsignarTicketComponent } from './pages/asignar-ticket/asignar-ticket.component';
import { CerrarTicketComponent } from './pages/cerrar-ticket/cerrar-ticket.component';
import { authGuard, gerenteGuard, soporteGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'solicitudes', component: VerSolicitudesComponent, canMatch: [authGuard] },
  { path: 'detalle/:id', component: DetalleSolicitudComponent, canMatch: [authGuard] },
  { path: 'asignar/:id', component: AsignarTicketComponent, canMatch: [authGuard, gerenteGuard] },
  { path: 'cerrar/:id', component: CerrarTicketComponent, canMatch: [authGuard, soporteGuard] },
  { path: '**', redirectTo: '/login' }
];
