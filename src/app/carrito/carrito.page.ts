import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../models/item-carrito.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: Producto[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, 
              private alertController: AlertController,
              private router: Router
  ) {}

  ngOnInit() {
    this.carrito = this.carritoService.getProductos();
    this.carritoService.carritoTotal$.subscribe(total => {
      this.total = total;
    });
  }

  removerProducto(id: string): void {
    this.carritoService.removerProducto(id); // Asegúrate de que estás pasando el id
    this.carrito = this.carritoService.getProductos(); // Actualiza el carrito después de eliminar
  }


  async procederAlPago() {
    if (this.carrito.length === 0) {
      const alert = await this.alertController.create({
        header: 'Carrito vacío',
        message: 'No tienes productos en el carrito.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Gracias por tu compra',
      message: 'Gracias por comprar en Eleganza Profonda.',
      buttons: ['OK']
    });
    await alert.present();

    this.router.navigate(['/home']);
  }

  incrementarCantidad(producto: Producto): void {
    producto.quantity++;
    this.carritoService.actualizarProducto(producto);
  }

  decrementarCantidad(producto: Producto): void {
    if (producto.quantity > 1) {
      producto.quantity--;
      this.carritoService.actualizarProducto(producto);
    }
  }
}
