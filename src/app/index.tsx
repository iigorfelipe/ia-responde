import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import IconButton from '../components/icon-button';
import HomeScreen from '../screens/home';
import { colors } from '../styles/colors';

export type DrawerParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: '#fff',
        },
        header: ({ navigation }) => (
          <View className="flex-row justify-between items-center p-4 bg-white">
            <MaterialIcons name="menu" size={24} onPress={() => navigation.openDrawer()} />
            <Text className="text-xl font-semibold">IA Responde</Text>
            <IconButton onPress={() => {}} iconName="workspace-premium" size={24} iconColor={colors.border} />
          </View>
        ),
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
