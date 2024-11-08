import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database} from 'src/environments/environment';
import { ref, get} from 'firebase/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  
  goToRegister() {
    this.router.navigate(['/registro']);
  }


  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: error.message || 'Hubo un problema al iniciar sesión.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async showFormErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, complete todos los campos correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }


  async onLogin() {
    if (this.loginForm.valid) {
      const{ identifier, password } = this.loginForm.value;

      const loading = await this.loadingController.create({
          message: 'Iniciando sesión...',
        });
        await loading.present();

        try{

          const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
          const user = userCredential.user;

          const userRef = ref(database, `users/${user.uid}`);
          const dbSnapshot = await get(userRef);
          if (!dbSnapshot.exists()) {
            throw new Error('Usuario no encontrado');
          }
          const userData = dbSnapshot.val();

          localStorage.setItem('userData', JSON.stringify({
            uid: user.uid,
            email: user.email,
          }));

          await loading.dismiss();
          this.router.navigate(['/home']);
        } catch (error:any) {
          await loading.dismiss();
          this.showErrorAlert(error);
        }
    }else{
      this.showFormErrorAlert();
    }
  }
}