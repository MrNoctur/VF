import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfumefav',
  templateUrl: './perfumefav.page.html',
  styleUrls: ['./perfumefav.page.scss'],
})
export class PerfumefavPage implements OnInit {
  favorites: any[] = [];
  currentUser: any;

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    // Recuperar los datos del usuario autenticado
    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (this.currentUser?.uid) {
      // Establecer el usuario actual en el servicio de almacenamiento
      await this.storageService.setCurrentUser({
        email: this.currentUser.email,
        uid: this.currentUser.uid,
      });

      // Obtener los favoritos asociados al usuario
      this.favorites = await this.storageService.getFavorites();
        } else {
      console.log('No hay usuario autenticado');
        }
      }

      // Eliminar un favorito
      async removeFavorite(item: any) {
        await this.storageService.removeFavorite(item);
        this.favorites = await this.storageService.getFavorites();
      }

      // Agregar un favorito
      async addFavorite(item: any) {
        await this.storageService.addFavorite(item);
        this.favorites = await this.storageService.getFavorites();
      }

  // Navegar a la página de inicio
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
