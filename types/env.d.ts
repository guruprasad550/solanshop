declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_AUTH0_DOMAIN: string;
      EXPO_PUBLIC_AUTH0_CLIENT_ID: string;
      EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: string;
    }
  }
}

export {};