import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'EP',
  webDir: 'www',
  plugins: {
    Geolocation: {
      android: {
        permissions: [
          'ACCESS_FINE_LOCATION',
          'ACCESS_COARSE_LOCATION'
        ]
      }
    }
  }
};

export default config;
