import React from 'react';
import { Pressable, View } from 'react-native';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

type IconButtonProps = {
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  iconColor?: string;
  size?: number;
  circle?: boolean;
  circleColor?: string;
};

export default function IconButton({
  iconName,
  onPress,
  iconColor = '#000',
  size = 24,
  circle = false,
  circleColor = '#fff',
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={circle ? 'p-2 rounded-full' : 'justify-center items-center'}
      style={circle ? { backgroundColor: circleColor } : undefined}
    >
      <MaterialIcons name={iconName} size={size} color={iconColor} />
    </Pressable>
  );
}

export function LoadingButton() {
  return (
    <View
      style={{ backgroundColor: colors.primary }}
      className="p-2 rounded-full flex items-center justify-center"
    >
      <EvilIcons name="spinner-3" size={24} color="#fff" className="animate-spin" />
    </View>
  );
}
