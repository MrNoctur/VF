import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from 'src/environments/environment';
import { ref, set } from 'firebase/database';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async onRegistro() {
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      await this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try{
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;


      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, {
        email: this.email,
        username: this.username,
        password: this.password,
      });

      await this.presentAlert('Éxito', 'Registro exitoso');
      this.router.navigate(['/login']);
    } catch (error:any) {
      console.error('Error al registrar usuario', error.message);
      await this.presentAlert('Error', 'Error al registrar usuario.');

    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}