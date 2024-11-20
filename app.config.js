import 'dotenv/config';

export default {
  expo: {
    name: 'ia-responde',
    slug: 'ia-responde',
    version: '1.0.0',
    orientation: 'portrait',
    icon: '',
    scheme: 'ia-responde',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: '',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      OPEN_IA_API_KEY: process.env.OPEN_IA_API_KEY,
    },
  },
};