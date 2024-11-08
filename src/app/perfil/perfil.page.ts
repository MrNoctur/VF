import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, child } from 'firebase/database';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any = null;

  constructor(private router: Router) {}

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
}
