import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, TextInput, View } from 'react-native';
import { fetchOpenAIResponse } from '../api';
import IconButton from '../components/icon-button';
import { useQuestionStore } from '../store/use-question-store';
import { colors } from '../styles/colors';
import { DrawerParamList } from '../types/question';

export default function HomeScreen() {
  const [question, setQuestion] = useState('');
  const { questions, addQuestion } = useQuestionStore();
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  const handleSendQuestion = async () => {
    if (question.trim().length === 0) {
      console.error('Por favor, insira uma pergunta');
      return;
    }

    const existingQuestion = questions.find((q) => q.question === question);

    if (existingQuestion) {
      console.log(' --- Pergunta ja realizada --- ');
      navigation.navigate('QuestionDetail', { ...existingQuestion });
      return;
    }

    const response = await fetchOpenAIResponse(question, true);

    if (response.error?.status === 429) {
      Alert.alert('Tenha perguntas ilimitadas com o Premium');
      return;
    }

    const newQuestion = {
      id: response.id,
      question: question,
      answer: response.answer,
      created: response.created,
      fav: false,
    };

    addQuestion(newQuestion);
    setQuestion('');
    navigation.navigate('QuestionDetail', { ...newQuestion });
  };

  return (
    <View className="flex-1 justify-between bg-background p-4">
      <View className="items-center w-full justify-center my-auto">
        <Image
          source={require('../assets/images/home-illustration.webp')}
          style={{ width: 300, height: 300 }}
        />
      </View>

      <View className="flex flex-row gap-2">
        <TextInput
          placeholder="Digite sua pergunta aqui..."
          className="border px-5 rounded-3xl flex-1"
          value={question}
          onChangeText={setQuestion}
        />
        <IconButton
          iconName="send"
          onPress={handleSendQuestion}
          iconColor="#fff"
          circle={true}
          circleColor={colors.primary}
        />
      </View>
    </View>
  );
}
