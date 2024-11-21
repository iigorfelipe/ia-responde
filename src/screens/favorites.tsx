import { NewQuestionButton } from '@/src/components/navigation-button';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../types/question';
import IconButton from '../components/icon-button';
import { colors } from '../styles/colors';
import { useQuestionStore } from '../store/use-question-store';
import { useCustomAlert } from '../hooks/use-custom-alert';
import AreaPremium from '../components/area-premium';

export default function FavoriteQuestions() {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const { questions, toggleFavorite } = useQuestionStore();
  const [selectedValue, setSelectedValue] = useState('Data');
  const [modalVisible, setModalVisible] = useState(false);

  const { showAlert, CustomAlert, navigate } = useCustomAlert();

  const handleRemoveFavorite = (id: string) => {
    showAlert({
      title: 'Excluir dos Favoritos?',
      message: 'Você tem certeza que quer excluir esta pergunta dos favoritos?',
      onConfirm: () => {
        toggleFavorite(id);
        navigate('Home');
      },
    });
  };

  const favQuestions = questions.filter((question) => question.fav);
  const options = ['Data', 'Nome'];

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setModalVisible(false);
  };

  const sortedFavQuestions = favQuestions.sort((a, b) => {
    if (selectedValue === 'Data') {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    }
    if (selectedValue === 'Nome') {
      return a.question.localeCompare(b.question);
    }
    return 0;
  });

  if (favQuestions.length === 0) {
    return (
      <View className="flex-1 bg-background px-4">
        <View className="bg-white rounded-3xl p-6 mt-auto">
          <Text className="text-center  font-medium text-base">
            Você ainda não possui perguntas favoritas. Para adicionar, acesse o menu lateral, selecione uma
            pergunta, e toque em 'Favoritar' nos detalhes.
          </Text>
        </View>
        <View className="items-center w-full justify-center mt-auto">
          <Image
            source={require('../assets/images/favorite-illustration.webp')}
            style={{ width: 300, height: 300 }}
          />
        </View>

        <NewQuestionButton />
      </View>
    );
  }

  return (
    <View className="flex-1 px-2 gap-3 bg-background">
      <View className="flex flex-row items-center gap-4 mt-3 px-3">
        <Text className="font-medium text-base">Ordenar por:</Text>

        <TouchableOpacity
          className="flex-1 flex-row items-center rounded-3xl py-4 px-6 w-full bg-white"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-base font-medium">{selectedValue}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingLeft: 8,
          paddingRight: 8,
          gap: 8,
          backgroundColor: colors.background,
        }}
      >
        <View className="flex flex-col bg-white rounded-3xl px-0">
          <FlatList
            scrollEnabled={false}
            data={sortedFavQuestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                className={`flex flex-row items-center justify-between p-4 ${
                  index === sortedFavQuestions.length - 1 ? '' : 'border-b border-background'
                }`}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('QuestionDetail', { ...item });
                  }}
                  className="p-2 max-w-[90%]"
                >
                  <Text className="text-lg font-medium">{item.question}</Text>
                </TouchableOpacity>
                <IconButton
                  iconName="star"
                  iconColor={colors.primary}
                  onPress={() => handleRemoveFavorite(item.id)}
                />
              </View>
            )}
          />
        </View>
        <View className="items-center w-full justify-center mt-auto">
          <Image
            source={require('../assets/images/favorite-illustration.webp')}
            style={{ width: 300, height: 300 }}
          />
        </View>

        <NewQuestionButton />
        <CustomAlert />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-3xl w-80">
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                  <View className={`py-6 ${index === options.length - 1 ? '' : 'border-b border-background'}`}>
                    <TouchableOpacity onPress={() => handleSelect(item)}>
                      <Text className="text-center text-lg font-medium">{item}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View className="mb-[3%]" />
      <AreaPremium />
    </View>
  );
}
