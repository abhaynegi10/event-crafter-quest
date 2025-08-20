import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3e7012fad685410d962c838aa54a2cc1',
  appName: 'event-crafter-quest',
  webDir: 'dist',
  server: {
    url: 'https://3e7012fa-d685-410d-962c-838aa54a2cc1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;