import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios: any[] = [];
  private usuarioActualSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  cargarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>('/data/usuarios.json').pipe(
      map(users => {
        this.usuarios = users;
        return users;
      })
    );
  }

  loginPorNombre(nombre: string): boolean {
    const user = this.usuarios.find(u => u.nombre === nombre);
    if (user) {
      this.usuarioActualSubject.next(user);
      return true;
    }
    return false;
  }

  get usuarioActual$(): Observable<any> {
    return this.usuarioActualSubject.asObservable();
  }

  get usuarioActual(): any {
    return this.usuarioActualSubject.value;
  }

  logout(): void {
    this.usuarioActualSubject.next(null);
  }
}
