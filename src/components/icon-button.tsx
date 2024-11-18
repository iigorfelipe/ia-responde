import React from 'react';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
