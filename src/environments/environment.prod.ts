
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';



export const environment = {
  production: true,
  firebase:{
    apiKey: "AIzaSyB3y9WlsFlp-ZblkdGgTtsJoMCVK0YLbHU",
    authDomain: "vfpm-59084.firebaseapp.com",
    projectId: "vfpm-59084",
    storageBucket: "vfpm-59084.appspot.com",
    messagingSenderId: "679221039226",
    appId: "1:679221039226:web:33518edee5e3d739e82bc3",
    databaseURL: "https://vfpm-59084-default-rtdb.firebaseio.com"
  }
};

const app = initializeApp(environment.firebase);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
