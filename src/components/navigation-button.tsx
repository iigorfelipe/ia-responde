import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../types/question';

type NavigationButtonProps = {
  text: string;
  onPress: () => void;
};
export function NavigationButton({ text, onPress }: NavigationButtonProps) {
  return (
    <TouchableOpacity
      className="flex items-center justify-center rounded-3xl p-4 bg-secondary"
      onPress={onPress}
    >
      <Text className="text-primary">{text}</Text>
    </TouchableOpacity>
  );
}
export function NewQuestionButton() {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  return (
    <View className="mt-auto bg-white p-3 rounded-3xl mb-4">
      <NavigationButton text="Fazer uma nova pergunta" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
