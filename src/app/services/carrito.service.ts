import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/item-carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];
  private carritoTotal = new BehaviorSubject<number>(0);

  carritoTotal$= this.carritoTotal.asObservable();

  constructor() {}

  getProductos(): Producto[] {
    return this.carrito;
  }

  addtoCart(producto: Producto): void {
    const ProductoExistente = this.carrito.find((item) => item.id === producto.id);

    if (ProductoExistente) {
      ProductoExistente.quantity += producto.quantity;
    } else {
      this.carrito.push(producto);
    }

    this.updateTotal();
  }

  private updateTotal(): void {
    const total = this.carrito.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.carritoTotal.next(total);
  }

  removerProducto(id: string): void {
    this.carrito = this.carrito.filter((item) => item.id !== id); // Filtramos por id
    this.updateTotal(); // Actualizamos el total
  }

  actualizarProducto(producto: Producto): void {
    const index = this.carrito.findIndex((item) => item.id === producto.id);
    if (index !== -1) {
      this.carrito[index] = producto;
      this.actualizarTotal();
    }
  }

  actualizarTotal(): void {
    let total = 0;
    this.carrito.forEach(producto => {
      total += producto.price * producto.quantity;
    });
    this.carritoTotal.next(total);
  }
  
}
