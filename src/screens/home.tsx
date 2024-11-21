import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, View } from 'react-native';
import { fetchOpenAIResponse } from '../api';
import IconButton, { LoadingButton } from '../components/icon-button';
import { useQuestionStore } from '../store/use-question-store';
import { colors } from '../styles/colors';
import { DrawerParamList, TokensType } from '../types/question';
import { useKeyboardSafeAreaIOS } from '../hooks/use-keyboard-safearea-ios';
import AreaPremium from '../components/area-premium';
import { useAreaPremiumStore } from '../store/bottom-sheet';
import { Notification } from '../components/notifications';
export default function HomeScreen() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { questions, addQuestion } = useQuestionStore();
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const paddingBottom = useKeyboardSafeAreaIOS();

  const { openBottomSheet } = useAreaPremiumStore();

  const handleSendQuestion = async () => {
    setIsLoading(true);
    if (question.trim().length === 0) {
      Notification.error('Campo vazio', 'Por favor, insira uma pergunta');
      setIsLoading(false);
      return;
    }

    const existingQuestion = questions.find((q) => q.question === question);

    if (existingQuestion) {
      console.log(' --- Pergunta ja realizada --- ');
      navigation.navigate('QuestionDetail', { ...existingQuestion });
      setIsLoading(false);
      return;
    }

    const response = await fetchOpenAIResponse(question);

    console.log(' --- RESPONSE --- ', response);

    if (response.error?.status === 429) {
      openBottomSheet();
      setIsLoading(false);
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
    setIsLoading(false);
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

        {isLoading ? (
          <LoadingButton />
        ) : (
          <IconButton
            iconName="send"
            onPress={handleSendQuestion}
            iconColor="#fff"
            circle={true}
            circleColor={colors.primary}
          />
        )}
      </View>
      <View className="mb-[3%]" />
      <AreaPremium />
    </View>
  );
}
