import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private FAVORITES_KEY = 'favorites';
  private currentUser: any = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento
  private async init() {
    this._storage = await this.storage.create();
    this.loadCurrentUser();
  }

  // Carga el usuario actual desde el almacenamiento
  private loadCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUser = user;
  }

  // Establece el usuario actual
  async setCurrentUser(user: { email: string; uid: string; }): Promise<void> {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Agrega un elemento a favoritos
  async addFavorite(item: any): Promise<void> {
    if (!this.currentUser) {
      return;
    }

    // Obtener los favoritos actuales
    const favorites = await this.getFavorites();
    favorites.push(item);

    // Actualizar los favoritos en almacenamiento
    const allFavorites = await this._storage?.get(this.FAVORITES_KEY) || {};
    allFavorites[this.currentUser.email] = favorites;

    await this._storage?.set(this.FAVORITES_KEY, allFavorites);
  }

  // Elimina un elemento de favoritos
  async removeFavorite(item: any): Promise<void> {
    if (!this.currentUser) {
      return;
    }

    // Filtrar favoritos y eliminar el elemento seleccionado
    let favorites = await this.getFavorites();
    favorites = favorites.filter(fav => fav.name !== item.name);

    // Actualizar los favoritos en almacenamiento
    const allFavorites = await this._storage?.get(this.FAVORITES_KEY) || {};
    allFavorites[this.currentUser.email] = favorites;

    await this._storage?.set(this.FAVORITES_KEY, allFavorites);
  }

  // Obtiene los favoritos del usuario actual
  async getFavorites(): Promise<any[]> {
    if (!this.currentUser) {
      return [];
    }

    const allFavorites = await this._storage?.get(this.FAVORITES_KEY) || {};
    return allFavorites[this.currentUser.email] || [];
  }

  // Verifica si un elemento está en favoritos
  async isFavorite(item: any): Promise<boolean> {
    if (!this.currentUser) {
      return false;
    }

    const favorites = await this.getFavorites();
    return favorites.some(fav => fav.name === item.name);
  }
}
