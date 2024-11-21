import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text>Esta página não existe.</Text>
        <Link href="/" className="mt-4 py-4">
          <Text>Voltar para o Inicio.</Text>
        </Link>
      </View>
    </>
  );
}
