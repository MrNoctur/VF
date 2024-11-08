import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private FAVORITES_KEY = 'favorites';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Agrega un elemento a favoritos
  async addFavorite(item: any): Promise<void> {
    const favorites = (await this.getFavorites()) || [];
    favorites.push(item);
    await this._storage?.set(this.FAVORITES_KEY, favorites);
  }

  // Elimina un elemento de favoritos
  async removeFavorite(item: any): Promise<void> {
    const favorites = (await this.getFavorites()) || [];
    const updatedFavorites = favorites.filter(fav => fav.name !== item.name);
    await this._storage?.set(this.FAVORITES_KEY, updatedFavorites);
  }

  // Obtiene todos los favoritos
  async getFavorites(): Promise<any[]> {
    return await this._storage?.get(this.FAVORITES_KEY) || [];
  }

  // Verifica si un elemento está en favoritos
  async isFavorite(item: any): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some(fav => fav.name === item.name);
  }
}
