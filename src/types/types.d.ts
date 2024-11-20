declare module 'expo-constants' {
  export interface Extra {
    OPEN_IA_API_KEY: string;
  }

  export interface Constants {
    expoConfig: {
      extra: Extra;
    };
  }

  const Constants: Constants;
  export default Constants;
}
