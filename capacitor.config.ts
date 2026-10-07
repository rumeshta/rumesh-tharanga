import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rumeshtharanga.repedero',
  appName: 'Repedero',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
