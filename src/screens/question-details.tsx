import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NewQuestionButton } from '../components/navigation-button';
import { colors } from '../styles/colors';
import { formatTimestampToDate } from '../utils/format-timestamp';
import { useQuestionStore } from '../store/use-question-store';
import { useNavigation } from 'expo-router';
import { DrawerParamList } from '../types/question';

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

type QuestionDetailsRouteProp = RouteProp<
  {
    QuestionDetail: { id: string; question: string; answer: string; created: number };
  },
  'QuestionDetail'
>;

export default function QuestionDetails({ route }: { route: QuestionDetailsRouteProp }) {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const { id, question, answer, created } = route.params;
  const { toggleFavorite, questions } = useQuestionStore();
  const formatedDate = formatTimestampToDate(created);

  const isFavQuestion = questions.find((item) => item.id === id)?.fav;

  const handleDelete = () => {
    Alert.alert(
      'Excluir pergunta',
      'Tem certeza que deseja excluir esta pergunta? Ela será removida dos favoritos também.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const questionStore = useQuestionStore.getState();
            questionStore.removeQuestion(id);
            navigation.navigate('Home');
          },
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingLeft: 16, paddingRight: 16, gap: 8 }}>
      <View className="p-3 w-24 bg-white rounded-3xl mt-2 mx-auto">
        <Text className="font-semibold text-base">{formatedDate}</Text>
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
              onPress={() => {}}
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
              onPress={() => {}}
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
    </ScrollView>
  );
}
