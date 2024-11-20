import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../types/question';
import { NavigationButton } from '../components/navigation-button';
import IconButton from '../components/icon-button';
import { colors } from '../styles/colors';
import HomeScreen from '../screens/home';
import FavoriteQuestions from '../screens/favorites';
import QuestionDetails from '../screens/question-details';
import { useQuestionStore } from '../store/use-question-store';

const Drawer = createDrawerNavigator<DrawerParamList>();

function SearchInput() {
  const [searchText, setSearchText] = useState('');

  return (
    <View className="flex-row items-center px-3 border rounded-3xl mb-4">
      <MaterialIcons name="search" size={16} />
      <TextInput
        className="flex-1 text-base ml-2"
        placeholder="Buscar..."
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
}

function CustomDrawer(props: DrawerContentComponentProps) {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  const { questions } = useQuestionStore();

  return (
    <View {...props} className="flex-1 p-4 gap-4">
      {questions.length === 0 ? (
        <Text className="text-center font-medium text-base mt-auto">
          Ainda não há perguntas feitas. Que tal começar agora? Realize sua primeira pergunta e ela aparecerá
          aqui!
        </Text>
      ) : (
        <>
          <View className="gap-5">
            <NavigationButton text="Início" onPress={() => navigation.navigate('Home')} />
            <NavigationButton
              text="Perguntas favoritas"
              onPress={() => navigation.navigate('FavoriteQuestions')}
            />
          </View>

          <SearchInput />

          <View className="flex-1">
            <Text className="text-base font-semibold mb-4">Últimas perguntas</Text>
            <FlatList
              data={questions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="border-t border-gray-200 py-4 gap-3">
                  <Text className="font-light text-base">Hoje</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuestionDetail', { ...item });
                    }}
                    className="gap-5"
                  >
                    <Text className="text-lg font-semibold" numberOfLines={1} ellipsizeMode="tail">
                      {item.question}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </>
      )}

      <View className="mt-auto">
        <NavigationButton
          text={`${questions.length === 0 ? 'Fazer minha primeira pergunta' : 'Fazer uma nova pergunta'}`}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

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
            <IconButton
              onPress={() => {}}
              iconName="workspace-premium"
              size={24}
              iconColor={colors.primary}
            />
          </View>
        ),
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="FavoriteQuestions" component={FavoriteQuestions} />
      <Drawer.Screen name="QuestionDetail" component={QuestionDetails} />
    </Drawer.Navigator>
  );
}
