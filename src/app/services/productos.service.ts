import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private dbPath = '/productos';  // Ruta de la base de datos donde se guardarán los productos

  constructor(private db: AngularFireDatabase) {}

  // Obtener todos los productos
  getProductos() {
    return this.db.list(this.dbPath).valueChanges();  // Obtiene todos los productos
  }

  // Agregar un nuevo producto
  agregarProducto(producto: any) {
    const key = this.db.createPushId();  // Crea un ID único para el producto
    return this.db.object(`${this.dbPath}/${key}`).set(producto);  // Agrega el producto
  }

  // Actualizar un producto
  actualizarProducto(id: string, producto: any) {
    return this.db.object(`${this.dbPath}/${id}`).update(producto);  // Actualiza el producto
  }

  // Eliminar un producto
  eliminarProducto(id: string) {
    return this.db.object(`${this.dbPath}/${id}`).remove();  // Elimina el producto
  }
}
