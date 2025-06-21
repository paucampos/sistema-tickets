import { Routes } from '@angular/router';
import { VerSolicitudesComponent } from './pages/ver-solicitudes/ver-solicitudes.component';
import { DetalleSolicitudComponent } from './pages/detalle-solicitud/detalle-solicitud.component';
import { LoginComponent } from './pages/login/login.component';
import { AsignarTicketComponent } from './pages/asignar-ticket/asignar-ticket.component';
import { CerrarTicketComponent } from './pages/cerrar-ticket/cerrar-ticket.component';
import { gerenteGuard, soporteGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'solicitudes', component: VerSolicitudesComponent },
  { path: 'detalle/:id', component: DetalleSolicitudComponent },
  { path: 'asignar/:id', component: AsignarTicketComponent, canMatch: [gerenteGuard] },
  { path: 'cerrar/:id', component: CerrarTicketComponent, canMatch: [soporteGuard] },
  { path: '**', redirectTo: '/login' }
];
