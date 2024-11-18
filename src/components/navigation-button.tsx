import { Text, TouchableOpacity } from 'react-native';

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