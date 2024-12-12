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
  envio: number = 10; // Costo de envío fijo (puedes ajustarlo según la lógica que desees)
  isLoading: boolean = false; // Variable para controlar el estado de carga

  constructor(
    private carritoService: CarritoService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.carrito = this.carritoService.getProductos();
    this.carritoService.carritoTotal$.subscribe(total => {
      this.total = total; // Actualiza el total del carrito
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

    // Simulación de carga mientras se procesa la compra
    this.isLoading = true;

    // Simulamos un pequeño retraso para la compra
    setTimeout(async () => {
      this.isLoading = false; // Ocultamos el spinner después de la "compra"

      // Simulación de pago exitoso
      const alert = await this.alertController.create({
        header: 'Compra Exitosa',
        message: 'Gracias por tu compra. Te hemos enviado un recibo a tu correo.',
        buttons: ['OK']
      });
      await alert.present();

      // Redirigir al usuario a la página de inicio
      this.router.navigate(['/home']);
    }, 2000); // Simulamos un retraso de 2 segundos para la compra
  }

  incrementarCantidad(producto: Producto): void {
    if (producto.quantity < producto.stock) {
      producto.quantity++;
      this.carritoService.actualizarProducto(producto);
    } else {
      alert("No hay suficiente stock para este producto.");
    }
  }

  decrementarCantidad(producto: Producto): void {
    if (producto.quantity > 1) {
      producto.quantity--;
      this.carritoService.actualizarProducto(producto);
    }
  }
}
