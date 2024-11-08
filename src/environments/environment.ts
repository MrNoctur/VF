// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyB3y9WlsFlp-ZblkdGgTtsJoMCVK0YLbHU",
    authDomain: "vfpm-59084.firebaseapp.com",
    projectId: "vfpm-59084",
    storageBucket: "vfpm-59084.firebasestorage.app",
    messagingSenderId: "679221039226",
    appId: "1:679221039226:web:33518edee5e3d739e82bc3"
  }
  
};

const app = initializeApp(environment.firebase);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
