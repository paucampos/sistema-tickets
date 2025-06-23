import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  usuarios: any[] = [];
  nombreSeleccionado = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.cargarUsuarios().subscribe(users => {
      this.usuarios = users;
    });
  }

  login(): void {
    const ok = this.auth.loginPorNombre(this.nombreSeleccionado);
    if (ok) {
      this.router.navigate(['/inicio']);
    } else {
      this.error = 'Usuario no válido';
    }
  }
}
