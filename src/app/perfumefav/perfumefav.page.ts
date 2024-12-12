import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CameraService } from '../services/camera.service';  // Importamos el servicio de cámara
import { CarritoService } from '../services/carrito.service';  // Importamos el servicio de carrito

@Component({
  selector: 'app-perfumefav',
  templateUrl: './perfumefav.page.html',
  styleUrls: ['./perfumefav.page.scss'],
})
export class PerfumefavPage implements OnInit {
  favorites: any[] = []; // Lista de perfumes favoritos
  currentUser: any; // Usuario autenticado

  constructor(
    private storageService: StorageService,
    private router: Router,
    private alertController: AlertController,
    private cameraService: CameraService,  // Inyectamos el servicio de cámara
    private carritoService: CarritoService  // Inyectamos el servicio de carrito
  ) {}

  async ngOnInit() {
    // Obtener usuario autenticado desde localStorage
    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.currentUser?.uid) {
      // Establecer usuario actual en el servicio
      await this.storageService.setCurrentUser({
        email: this.currentUser.email,
        uid: this.currentUser.uid,
      });

      // Cargar lista de favoritos del usuario
      this.favorites = await this.storageService.getFavorites();
    } else {
      console.log('No hay usuario autenticado');
    }
  }

  // Editar un perfume favorito
  async editFavorite(item: any) {
    const alert = await this.alertController.create({
      header: 'Editar Perfume',
      inputs: [
        {
          name: 'ml',
          type: 'number',
          placeholder: 'Mililitros',
          value: item.ml,
        },
        {
          name: 'tipo',
          type: 'text',
          placeholder: 'Tipo de esencia',
          value: item.tipo,
        },
        {
          name: 'descripcion',
          type: 'textarea',
          placeholder: 'Descripción',
          value: item.descripcion,
        },
        {
          name: 'valor',
          type: 'number',
          placeholder: 'Valor',
          value: item.valor,
        },
        {
          name: 'foto',
          type: 'text',
          placeholder: 'URL de la foto (opcional)',
          value: item.foto,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.foto) {
              item.foto = data.foto;
            }
            await this.storageService.updateFavorite(item, data);

            // Recargar lista de favoritos
            this.favorites = await this.storageService.getFavorites();
          },
        },
      ],
    });

    await alert.present();
  }

  // Eliminar un perfume favorito
  async removeFavorite(item: any) {
    await this.storageService.removeFavorite(item);
    this.favorites = await this.storageService.getFavorites();
  }

  // Navegar a la página principal
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  // Función para agregar foto al perfume
  async addPhoto(item: any) {
    const photo = await this.cameraService.takePicture();  // Usamos el servicio de cámara para tomar la foto
    if (photo) {
      item.foto = photo;  // Asignamos la foto al perfume

      // Actualizamos el perfume en el almacenamiento
      await this.storageService.updateFavorite(item, { foto: photo });

      // Recargamos la lista de favoritos
      this.favorites = await this.storageService.getFavorites();
    }
  }

  // Función para agregar un perfume al carrito
  addToCart(item: any) {
    const producto = {
      id: item.id,
      nombre: item.nombre,
      price: item.valor,  // Asumiendo que el valor es el precio del perfume
      quantity: 1,  // Se puede agregar un solo perfume por vez
      name: item.nombre, 
      image: item.foto,  
      descripcion: item.descripcion,  
      stock: item.stock || 1,  
    };

    this.carritoService.addtoCart(producto);  // Llamamos al servicio para agregar el producto al carrito
    alert('Perfume agregado al carrito');
  }
}
