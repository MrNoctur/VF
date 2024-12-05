import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, child, update, remove } from 'firebase/database';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { CameraService } from '../services/camera.service';
import { CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any = null;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private cameraService: CameraService,
    private actionSheetController: ActionSheetController) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const dbRef = ref(getDatabase());
      try {
        const snapshot = await get(child(dbRef, `users/${user.uid}`));
        if (snapshot.exists()) {
          this.userData = snapshot.val();
          // Asegúrate de que 'profilePicture' esté definido
        if (!this.userData.profilePicture) {
          this.userData.profilePicture = 'asset/default-profile.png'; // Si no existe, lo inicializamos
        }
        } else {
          console.log('No hay datos disponibles');
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }


  async editUserData() {
    const alert = await this.alertCtrl.create({
      header: 'Editar datos',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.userData.name,
          placeholder: 'Nombre'
        },
        {
          name: 'email',
          type: 'email',
          value: this.userData.email,
          placeholder: 'Correo electrónico'
        },
        {
          name: 'phone',
          type: 'tel',
          value: this.userData.phone || '',
          placeholder: 'Teléfono (opcional)'
        },
        {
          name: 'nationality',
          type: 'text',
          value: this.userData.nationality || '',
          placeholder: 'Nacionalidad (opcional)'
        },
        {
          name: 'gender',
          type: 'text',
          value: this.userData.gender || '',
          placeholder: 'Género (opcional)'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
              const dbRef = ref(getDatabase());
              try {
                const updatedData: any = {
                  name: data.name || this.userData.name,
                  email: data.email || this.userData.email,
                };

                if (data.phone) updatedData.phone = data.phone;
                if (data.nationality) updatedData.nationality = data.nationality;
                if (data.gender) updatedData.gender = data.gender;

                await update(child(dbRef, `users/${user.uid}`), updatedData);
                this.loadUserData();
                console.log('Datos actualizados correctamente');
              } catch (error) {
                console.error('Error al actualizar datos:', error);
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }
  
  
  async deleteUser() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar cuenta',
      message: '¿Estás seguro de que deseas eliminar tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
              const dbRef = ref(getDatabase());
              try {
                await remove(child(dbRef, `users/${user.uid}`));
                await user.delete();
                this.router.navigate(['/login']);
              } catch (error) {
                console.error('Error al eliminar cuenta:', error);
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async AgregarFoto() {
   const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar fuente',
      buttons:[
        {
          text: 'Cámara',
          icon: 'camera',
          handler: ()=> this.updateProfilePicture(CameraSource.Camera),
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: ()=> this.updateProfilePicture(CameraSource.Photos),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
   });
    await actionSheet.present();
 }

  async updateProfilePicture(source: CameraSource){
    const image = await this.cameraService.takePicture(source);

    if(image){
      const auth = getAuth();
      const user = auth.currentUser;

      if(user){
        const dbRef= ref(getDatabase());
        try{
          await update(child(dbRef, `users/${user.uid}`), {profilePicture: image});
          this.userData.profilePicture = image;
          console.log('Foto de perfil actualizada correctamente');
        }catch(error){
          console.error('Error al actualizar foto de perfil:', error);
        }
      }
    }
  }
}
