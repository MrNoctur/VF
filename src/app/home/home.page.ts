import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { GeolocationService } from '../services/geolocation.service';
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../models/item-carrito.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  items = [
    { id: '1', name: 'Tom Ford', price: 120000, image: 'assets/tf ol.png' },
    { id: '2', name: 'You', price: 90000, image: 'assets/y.jfif' },
    { id: '3', name: 'Hugo Boss', price: 110000, image: 'assets/h.b.jfif' },
    { id: '4', name: 'Rayo McQueen', price: 8000, image: 'assets/rm.webp' },
    { id: '5', name: 'Chanel No. 5', price: 150000, image: 'assets/chanel_no5.jpg' },
    { id: '6', name: 'Dior Sauvage', price: 130000, image: 'assets/dior_sauvage.jpg' },
    { id: '7', name: 'Armani Code', price: 120000, image: 'assets/armani_code.jpg' },
    { id: '8', name: 'Versace Eros', price: 95000, image: 'assets/versace_eros.jpg' },
    { id: '9', name: 'Gucci Guilty', price: 115000, image: 'assets/gucci_guilty.jpg' },
    { id: '10', name: 'Calvin Klein Euphoria', price: 90000, image: 'assets/ck_euphoria.jpg' },
      { id: '11', name: 'Paco Rabanne 1 Million', price: 125000, image: 'assets/paco_rabanne_1million.jpg' },
      { id: '12', name: 'Yves Saint Laurent Black Opium', price: 140000, image: 'assets/ysl_black_opium.jpg' },
      { id: '13', name: 'Jean Paul Gaultier Le Male', price: 110000, image: 'assets/jpg_le_male.jpg' },
      { id: '14', name: 'Chloe Nomade', price: 135000, image: 'assets/chloe_nomade.jpg' },
      { id: '15', name: 'Hermès Terre d’Hermès', price: 145000, image: 'assets/hermes_terre.jpg' },
      { id: '16', name: 'Tom Ford Black Orchid', price: 155000, image: 'assets/tf_black_orchid.jpg' },
      { id: '17', name: 'Dolce & Gabbana Light Blue', price: 110000, image: 'assets/dg_light_blue.jpg' },
      { id: '18', name: 'Viktor & Rolf Flowerbomb', price: 160000, image: 'assets/vr_flowerbomb.jpg' },
      { id: '19', name: 'Bvlgari Man in Black', price: 125000, image: 'assets/bvlgari_man_in_black.jpg' },
      { id: '20', name: 'Aventus by Creed', price: 200000, image: 'assets/creed_aventus.jpg' },
      { id: '21', name: 'Jean Paul Gaultier Scandal', price: 130000, image: 'assets/jpg_scandal.jpg' },
      { id: '22', name: 'Lacoste Blanc', price: 95000, image: 'assets/lacoste_blanc.jpg' },
      { id: '23', name: 'Abercrombie & Fitch Fierce', price: 105000, image: 'assets/abercrombie_fierce.jpg' },
      { id: '24', name: 'Dior Homme', price: 145000, image: 'assets/dior_homme.jpg' },
      { id: '25', name: 'Issey Miyake L’Eau d’Issey', price: 115000, image: 'assets/issey_miyake.jpg' },
      { id: '26', name: 'Givenchy Gentlemen Only', price: 120000, image: 'assets/givenchy_gentlemen.jpg' },
      { id: '27', name: 'Paco Rabanne Invictus', price: 100000, image: 'assets/paco_rabanne_invictus.jpg' },
      { id: '28', name: 'Chanel Bleu de Chanel', price: 160000, image: 'assets/bleu_de_chanel.jpg' },
      { id: '29', name: 'Prada Luna Rossa', price: 125000, image: 'assets/prada_luna_rossa.jpg' },
      { id: '30', name: 'Azzaro Wanted', price: 115000, image: 'assets/azzaro_wanted.jpg' },
      { id: '31', name: 'Tom Ford Oud Wood', price: 170000, image: 'assets/tf_oud_wood.jpg' },
      { id: '32', name: 'Gucci Bloom', price: 135000, image: 'assets/gucci_bloom.jpg' },
      { id: '33', name: 'Ralph Lauren Polo Black', price: 120000, image: 'assets/ralph_lauren_black.jpg' },
      { id: '34', name: 'La Vie Est Belle by Lancôme', price: 150000, image: 'assets/lancôme_la_vie_est_belle.jpg' },
      { id: '35', name: 'Tommy Hilfiger Tommy', price: 85000, image: 'assets/tommy_hilfiger_tommy.jpg' },
      { id: '36', name: 'Mugler Alien', price: 140000, image: 'assets/mugler_alien.jpg' },
      { id: '37', name: 'Carolina Herrera Good Girl', price: 125000, image: 'assets/ch_good_girl.jpg' },
      { id: '38', name: 'Paco Rabanne Lady Million', price: 130000, image: 'assets/paco_rabanne_lady_million.jpg' },
      { id: '39', name: 'Emporio Armani Stronger With You', price: 130000, image: 'assets/emporio_armani_stronger.jpg' },
      { id: '40', name: 'Bvlgari Omnia Crystalline', price: 95000, image: 'assets/bvlgari_omnia_crystalline.jpg' },
      { id: '41', name: 'Aerin Lauder Amber Musk', price: 170000, image: 'assets/aerin_lauder_amber_musk.jpg' },
      { id: '42', name: 'Yves Saint Laurent Opium', price: 145000, image: 'assets/ysl_opium.jpg' },
      { id: '43', name: 'Loewe 7', price: 140000, image: 'assets/loewe_7.jpg' },
      { id: '44', name: 'Creed Silver Mountain Water', price: 180000, image: 'assets/creed_silver_mountain.jpg' },
      { id: '45', name: 'Tom Ford Tobacco Vanille', price: 190000, image: 'assets/tf_tobacco_vanille.jpg' },
      { id: '46', name: 'Byredo Black Saffron', price: 165000, image: 'assets/byredo_black_saffron.jpg' },
      { id: '47', name: 'Le Labo Santal 33', price: 200000, image: 'assets/le_labo_santal_33.jpg' },
      { id: '48', name: 'Maison Francis Kurkdjian Baccarat Rouge 540', price: 250000, image: 'assets/mfk_baccarat_rouge.jpg' },
      { id: '49', name: 'Diptyque Philosykos', price: 140000, image: 'assets/diptyque_philosykos.jpg' },
      { id: '50', name: 'Tom Ford Neroli Portofino', price: 180000, image: 'assets/tf_neroli_portofino.jpg' }
  ];
  favorites: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storageService: StorageService,
    private geolocationService: GeolocationService,
    private carritoService: CarritoService,
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

  async navigateToCart() {
    this.router.navigate(['/carrito']);
  }

  navigateToPerfumes() {
    this.router.navigate(['/perfumefav']);
  }

  async ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    if (currentUser) {
      await this.storageService.setCurrentUser({
        email: currentUser.email,
        uid: currentUser.uid
      });
      this.favorites = await this.storageService.getFavorites();
    } else {
      console.log('No hay usuario autenticado');
    }
    await this.getUserLocation();
  }

  async getUserLocation() {
    try {
      const { latitude, longitude } = await this.geolocationService.getCurrentLocation();
      console.log('Ubicación actual:', latitude, longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
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

  addToCart(item: any) {
    const producto: Producto = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    };
    this.carritoService.addtoCart(producto);
    this.presentAddedToCartAlert(item.name);
  }

  async presentAddedToCartAlert(productName: string) {
    const alert = await this.alertController.create({
      header: 'Producto Añadido',
      message: `${productName} ha sido añadido al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  async addToFavorites(perfume: any) {
    await this.storageService.addFavorite(perfume);
    console.log(`${perfume.name} añadido a favoritos`);

  }
}
