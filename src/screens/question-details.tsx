import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NewQuestionButton } from '../components/navigation-button';
import { colors } from '../styles/colors';
import { formatTimestampToDate } from '../utils/format-timestamp';
import { useQuestionStore } from '../store/use-question-store';
import { useCustomAlert } from '../hooks/use-custom-alert';
import * as Clipboard from 'expo-clipboard';
import { QuestionType } from '../types/question';
import TokensUsed from '../components/tokens-used';
import { Notification } from '../components/notifications';

type TouchableOpacityCustomProps = {
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string;
  onPress: () => void;
  iconColor?: string;
  size?: number;
};

function TouchableOpacityCustom({
  iconName,
  onPress,
  text,
  size = 16,
  iconColor = 'black',
}: TouchableOpacityCustomProps) {
  return (
    <TouchableOpacity className="flex flex-row items-center gap-2" onPress={onPress}>
      <MaterialIcons name={iconName} size={size} color={iconColor} />
      <Text className="text-sm text-border">{text}</Text>
    </TouchableOpacity>
  );
}

function TouchableOpacityCustom2({
  iconName,
  onPress,
  text,
  size = 16,
  iconColor = 'black',
}: TouchableOpacityCustomProps) {
  return (
    <TouchableOpacity
      className="flex flex-row items-center gap-1 border border-border rounded-3xl py-2 px-4"
      onPress={onPress}
    >
      <MaterialIcons name={iconName} size={size} color={iconColor} />
      <Text className="text-sm">{text}</Text>
    </TouchableOpacity>
  );
}

type QuestionDetailsRouteProp = RouteProp<{ QuestionDetail: QuestionType }, 'QuestionDetail'>;

export default function QuestionDetails({ route }: { route: QuestionDetailsRouteProp }) {
  const { id, question, answer, created, tokensUsed } = route.params;
  const { toggleFavorite, questions, removeQuestion } = useQuestionStore();
  const { showAlert, CustomAlert, navigate } = useCustomAlert();

  const formatedDate = formatTimestampToDate(created);
  const isFavQuestion = questions.find((item) => item.id === id)?.fav;

  const handleDelete = () => {
    showAlert({
      title: 'Excluir pergunta',
      message: 'Tem certeza que deseja excluir esta pergunta? Ela será removida dos favoritos também.',
      onConfirm: () => {
        removeQuestion(id);
        navigate('Home');
      },
    });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingLeft: 16, paddingRight: 16, gap: 8, paddingBottom: 8 }}
      >
        <View className="p-3 items-center justify-center bg-white rounded-3xl mt-2 mx-auto">
          <Text className="font-semibold text-base text-center">{formatedDate}</Text>
        </View>
        <View className="flex flex-col bg-white rounded-3xl p-4 gap-8">
          <View className="gap-2">
            <View className="flex flex-row items-center w-full justify-between">
              <View className="flex flex-row gap-2 items-center">
                <View className="rounded-full p-3 bg-primary"></View>
                <Text className="text-sm">Você</Text>
              </View>

              <TouchableOpacityCustom
                iconName="edit-note"
                text="Editar pergunta"
                iconColor={colors.border}
                onPress={() => {}}
              />
            </View>

            <View className="ml-8 gap-2">
              <Text className="font-medium text-base">{question}</Text>
              <TouchableOpacityCustom
                iconName="content-copy"
                text="Copiar pergunta"
                size={12}
                iconColor={colors.border}
                onPress={() => {
                  Clipboard.setStringAsync(question);
                  Notification.success(
                    'Pergunta copiada!',
                    'A pergunta foi copiada para a área de transferência',
                  );
                }}
              />
            </View>
          </View>

          <View className="gap-2">
            <View className="flex flex-row items-center w-full justify-between">
              <View className="flex flex-row gap-2 items-center">
                <View className="rounded-full p-3 bg-primary"></View>
                <Text className="text-sm">IA</Text>
              </View>
            </View>

            <View className="ml-8 gap-2">
              <Text className="font-medium text-base">{answer}</Text>
              <TouchableOpacityCustom
                iconName="content-copy"
                text="Copiar resposta"
                size={12}
                onPress={() => {
                  Clipboard.setStringAsync(answer);
                  Notification.success(
                    'Resposta copiada!',
                    'A resposta foi copiada para a área de transferência',
                  );
                }}
              />
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center justify-evenly bg-white rounded-3xl py-5 gap-2">
          <TouchableOpacityCustom2 iconName="ios-share" text="Compartilhar" onPress={() => {}} />
          <TouchableOpacityCustom2
            iconName={`${isFavQuestion ? 'star' : 'star-outline'}`}
            text={`${isFavQuestion ? 'Desfavoritar' : 'Favoritar'}`}
            onPress={() => toggleFavorite(id)}
            iconColor={`${isFavQuestion ? colors.primary : ''}`}
          />
          <TouchableOpacityCustom2 iconName="delete-outline" text="Excluir" onPress={handleDelete} />
        </View>
        <NewQuestionButton />
        <CustomAlert />
      </ScrollView>

      <View className="mb-[3%]" />
      <TokensUsed tokensUsed={tokensUsed} />
    </>
  );
}
