import { Routes } from '@angular/router';
import { VerSolicitudesComponent } from './pages/ver-solicitudes/ver-solicitudes.component';
import { DetalleSolicitudComponent } from './pages/detalle-solicitud/detalle-solicitud.component';
import { LoginComponent } from './pages/login/login.component';
import { AsignarTicketComponent } from './pages/asignar-ticket/asignar-ticket.component';
import { CerrarTicketComponent } from './pages/cerrar-ticket/cerrar-ticket.component';
import { authGuard, gerenteGuard, soporteGuard } from './guards/auth.guard';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canMatch: [authGuard] },
  { path: 'solicitudes', component: VerSolicitudesComponent, canMatch: [authGuard] },
  { path: 'detalle/:id', component: DetalleSolicitudComponent, canMatch: [authGuard] },
  { path: 'asignar/:id', component: AsignarTicketComponent, canMatch: [authGuard, gerenteGuard] },
  { path: 'cerrar/:id', component: CerrarTicketComponent, canMatch: [authGuard, soporteGuard] },
  { path: '**', redirectTo: '/login' }
];
