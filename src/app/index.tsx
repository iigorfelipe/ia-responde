import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import IconButton from '../components/icon-button';
import { colors } from '../styles/colors';
import { NavigationButton } from '../components/navigation-button';
import HomeScreen from '../screens/home';
import { DrawerParamList } from '../types/question';

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

export const QUESTIONS: DrawerParamList['QuestionDetail'][] = [
  {
    id: '8',
    question: 'Qual o valor de pi?',
    answer:
      'O valor de pi (π) é aproximadamente 3,14159. É uma constante matemática que representa a razão entre a circunferência de um círculo e seu diâmetro. Pi é um número irracional, o que significa que suas casas decimais são infinitas e não se repetem de forma periódica.',
    date: '17/11/2024',
    fav: true,
  },
  {
    id: '7',
    question: 'Qual o tamanho do sistema solar?',
    answer:
      'O Sistema Solar tem um tamanho de cerca de 15 trilhões de quilômetros até a Nuvem de Oort, a sua borda teórica.',
    date: '17/11/2024',
    fav: true,
  },
  { id: '6', question: 'Pergunta 04', answer: 'Resposta 04', date: '16/11/2024', fav: false },
  { id: '5', question: 'Pergunta 03', answer: 'Resposta 03', date: '16/11/2024', fav: false },
  { id: '4', question: 'Pergunta 02', answer: 'Resposta 02', date: '16/11/2024', fav: false },
  { id: '3', question: 'Pergunta 01', answer: 'Resposta 01', date: '16/11/2024', fav: false },
  { id: '2', question: 'Pergunta 01', answer: 'Resposta 01', date: '16/11/2024', fav: false },
  { id: '1', question: 'Pergunta 01', answer: 'Resposta 01', date: '16/11/2024', fav: false },
];

function CustomDrawer(props: DrawerContentComponentProps) {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  

  return (
    <View {...props} className="flex-1 p-4 gap-4">
      <View className="gap-5">
        <NavigationButton text="Início" onPress={() => navigation.navigate('Home')} />       
      </View>

      {QUESTIONS.length === 0 ? (
        <Text className="text-center font-medium text-base mt-auto">
          Ainda não há perguntas feitas. Que tal começar agora? Realize sua primeira pergunta e ela aparecerá
          aqui!
        </Text>
      ) : (
        <>
          <SearchInput />

          <View className="flex-1">
            <Text className="text-base font-semibold mb-4">Últimas perguntas</Text>
            <FlatList
              data={QUESTIONS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="border-t border-gray-200 py-4 gap-3">
                  <Text className="font-light text-base">Hoje</Text>
                  <TouchableOpacity
                    onPress={() => {}}
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
          text={`${QUESTIONS.length === 0 ? 'Fazer minha primeira pergunta' : 'Fazer uma nova pergunta'}`}
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
    </Drawer.Navigator>
  );
}
