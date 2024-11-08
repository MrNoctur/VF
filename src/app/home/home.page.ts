import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  items = [{ name: 'Tom Ford', price: '$120.000', image: 'assets/tf ol.png' },
    { name: 'You', price: '$90.000', image: 'assets/y.jfif' },
    { name: 'Hugo Boss', price: '$110.000', image: 'assets/h.b.jfif' },
    { name: 'Rayo McQueen', price: '$8.000', image: 'assets/rm.webp' }];
  favorites: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storageService: StorageService
  ) {}

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();






  }

  logout() {
    console.log('Usuario cerrado sesión');
    this.router.navigate(['/login']);
  }


  navigateToProfile() {
    
    this.router.navigateByUrl('/perfil');
  }

  navigateToCart() {
    this.router.navigate(['/carrito']);
  }

  navigateToPerfumes() {
    this.router.navigate(['/perfumesfav']);
  }

  async ngOnInit() {
    this.favorites = await this.storageService.getFavorites();
  }

  async toggleFavorite(item: any) {
    const isFav = this.isFavorite(item.name);
    if (isFav) {
      await this.storageService.removeFavorite(item.name);
    } else {
      await this.storageService.addFavorite(item);
    }
    // Actualiza la lista de favoritos
    this.favorites = await this.storageService.getFavorites();
  }

  // Verifica si un elemento está marcado como favorito
  isFavorite(name: string): boolean {
    return this.favorites.some(fav => fav.name === name);
  }

}

