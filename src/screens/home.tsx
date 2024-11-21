import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, View } from 'react-native';
import { fetchOpenAIResponse } from '../api';
import IconButton from '../components/icon-button';
import { useQuestionStore } from '../store/use-question-store';
import { colors } from '../styles/colors';
import { DrawerParamList, TokensType } from '../types/question';
import { useKeyboardSafeAreaIOS } from '../hooks/use-keyboard-safearea-ios';
import AreaPremium from '../components/area-premium';
import { useAreaPremiumStore } from '../store/bottom-sheet';
export default function HomeScreen() {
  const [question, setQuestion] = useState('');
  const { questions, addQuestion } = useQuestionStore();
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const paddingBottom = useKeyboardSafeAreaIOS();
  const { openBottomSheet } = useAreaPremiumStore();
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
      openBottomSheet();
      return;
    }

    const newQuestion = {
      id: response.id,
      question: question,
      answer: response.answer,
      created: response.created,
      tokensUsed: response.tokensUsed as TokensType,
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

      <View className="flex flex-row gap-2" style={{ paddingBottom }}>
        <TextInput
          placeholder="Digite sua pergunta aqui..."
          placeholderTextColor={colors.border}
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
      <View className="mb-[3%]" />
      <AreaPremium />
    </View>
  );
}
