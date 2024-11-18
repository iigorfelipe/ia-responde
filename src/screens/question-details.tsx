import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NewQuestionButton } from '../components/navigation-button';
import { colors } from '../styles/colors';

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
    QuestionDetail: { id: string; question: string; answer: string; date: string; fav: boolean };
  },
  'QuestionDetail'
>;

export default function QuestionDetails({ route }: { route: QuestionDetailsRouteProp }) {
  const { question, answer, date, fav } = route.params;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingLeft: 16, paddingRight: 16, gap: 8 }}>
      <View className="p-3 w-24 bg-white rounded-3xl mt-2 mx-auto">
        <Text className="font-semibold text-base">{date}</Text>
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
          iconName={`${fav ? 'star' : 'star-outline'}`}
          text={`${fav ? 'Desfavoritar' : 'Favoritar'}`}
          onPress={() => {}}
          iconColor={`${fav ? colors.primary : ''}`}
        />
        <TouchableOpacityCustom2 iconName="delete-outline" text="Excluir" onPress={() => {}} />
      </View>

      <NewQuestionButton />
    </ScrollView>
  );
}
