import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importa AngularFireDatabase
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private db: AngularFireDatabase) {}

  // Método para obtener los datos del perfil del usuario
  getUserProfile(userId: string): Observable<any> {
    return this.db.object(`/users/${userId}`).valueChanges(); // Ruta 'users/{userId}' en tu base de datos
  }
}
