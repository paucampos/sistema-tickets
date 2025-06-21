import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const soporteGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.usuarioActual?.rol !== 'soporte') {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const gerenteGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.usuarioActual?.rol !== 'gerente') {
    router.navigate(['/login']);
    return false;
  }
  return true;};
