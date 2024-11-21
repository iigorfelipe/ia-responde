import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import IconButton from '../components/icon-button';
import { NavigationButton } from '../components/navigation-button';
import { useDebounce } from '../hooks/use-debounce';
import FavoriteQuestions from '../screens/favorites';
import HomeScreen from '../screens/home';
import QuestionDetails from '../screens/question-details';
import { useQuestionStore } from '../store/use-question-store';
import { colors } from '../styles/colors';
import { DrawerParamList, GroupedQuestions, QuestionType } from '../types/question';
import { formatTimestampToRelativeDate } from '../utils/format-timestamp';
import { SafeAreaView } from 'react-native';
import { useAreaPremiumStore } from '../store/bottom-sheet';
import Toast from 'react-native-toast-message';

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawer(props: DrawerContentComponentProps) {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const debouncedSearchText = useDebounce({ value: searchText, delay: 300 });
  const { questions } = useQuestionStore();

  const groupedQuestions: GroupedQuestions = {};

  for (const question of questions) {
    const formattedDate = formatTimestampToRelativeDate(question.created);
    if (!groupedQuestions[formattedDate]) {
      groupedQuestions[formattedDate] = [];
    }
    groupedQuestions[formattedDate].push(question);
  }

  const renderItem = ({ item }: { item: QuestionType }) => (
    <View>
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
  );

  const getFilteredQuestions = (): GroupedQuestions => {
    if (!debouncedSearchText.trim()) {
      return groupedQuestions;
    }

    const filtered: GroupedQuestions = {};

    for (const [date, questions] of Object.entries(groupedQuestions)) {
      const matchingQuestions = questions.filter((q) =>
        q.question.toLowerCase().includes(debouncedSearchText.toLowerCase()),
      );

      if (matchingQuestions.length > 0) {
        filtered[date] = matchingQuestions;
      }
    }

    return filtered;
  };

  const filteredQuestions = getFilteredQuestions();

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
            <SafeAreaView style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }}>
              <NavigationButton text="Início" onPress={() => navigation.navigate('Home')} />
            </SafeAreaView>
            <NavigationButton
              text="Perguntas favoritas"
              onPress={() => navigation.navigate('FavoriteQuestions')}
            />
          </View>

          <View className="flex-row items-center px-3 border rounded-3xl mb-4">
            <MaterialIcons name="search" size={16} />
            <TextInput
              className="flex-1 text-base ml-2 py-3"
              placeholderTextColor={colors.border}
              placeholder="Buscar..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <View className="flex-1">
            <Text className="text-base font-semibold mb-4">Últimas perguntas</Text>
            <FlatList
              data={Object.keys(filteredQuestions).reverse()}
              keyExtractor={(date) => date}
              renderItem={({ item: date }) => (
                <View className="border-t border-gray-200 py-4 gap-3">
                  <Text className="font-light text-lg">{date}</Text>
                  <FlatList
                    data={filteredQuestions[date].reverse()}
                    keyExtractor={(question) => question.id}
                    renderItem={renderItem}
                    className="gap-4"
                  />
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

function DrawerNavigator() {
  const { toggleBottomSheet: toggleOpenPremium } = useAreaPremiumStore();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: '#fff',
        },
        header: ({ navigation }) => (
          <SafeAreaView style={{ flex: 0 }}>
            <View className="flex-row justify-between items-center p-4 bg-white">
              <MaterialIcons name="menu" size={24} onPress={() => navigation.openDrawer()} />
              <Text className="text-xl font-semibold">IA Responde</Text>
              <IconButton
                onPress={toggleOpenPremium}
                iconName="workspace-premium"
                size={24}
                iconColor={colors.primary}
              />
            </View>
          </SafeAreaView>
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

export default function App() {
  return (
    <>
      <DrawerNavigator />
      <Toast />
    </>
  );
}
