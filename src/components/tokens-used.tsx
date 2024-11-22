import { Linking, Text, View } from 'react-native';
import BottomSheetDemo from './bottom-sheet';
import { useAreaPremiumStore } from '../store/bottom-sheet';
import { TokensType } from '../types/question';
import { AreaPremiumContent } from './area-premium';

type TokensUsedProps = { tokensUsed: TokensType };
export default function TokensUsed({ tokensUsed }: TokensUsedProps) {
  const { isOpen } = useAreaPremiumStore();
  const snapPoints = ['3%', '10%', '40%', '100%'];
  return (
    <BottomSheetDemo
      snapPoints={snapPoints}
      isOpen={isOpen}
      onClose={() => {}}
      children={
        <View className="flex flex-col h-full">
          <View className="flex flex-col bg-white rounded-3xl p-4 gap-2 h-[40%]">
            <View className="flex flex-row w-full p-2 items-center justify-between">
              <Text className="font-semibold text-lg">Tokens da pergunta:</Text>
              <Text className="font-bold text-xl">{tokensUsed.prompt_tokens}</Text>
            </View>
            <View className="flex flex-row w-full p-2 items-center justify-between">
              <Text className="font-semibold text-lg">Tokens da resposta:</Text>
              <Text className="font-bold text-xl">{tokensUsed.completion_tokens}</Text>
            </View>
            <View className="flex flex-row w-full p-2 items-center justify-between">
              <Text className="font-semibold text-lg">Tokens totais:</Text>
              <Text className="font-bold text-xl">{tokensUsed.total_tokens}</Text>
            </View>
            <View className="flex flex-col gap-2 border-t pt-2">
              <Text className="font-bold text-lg text-center">O que são tokens?</Text>
              <Text className="text-center">
                Um token pode ser uma palavra, parte de uma palavra ou até mesmo um caractere presente na
                pergunta ou na resposta. {' '}
                <Text
                  className="text-blue-600 underline font-medium"
                  onPress={() => Linking.openURL('https://platform.openai.com/tokenizer')}
                >
                  Saiba mais aqui.
                </Text>
              </Text>
            </View>
          </View>
          <AreaPremiumContent height="60%" />
        </View>
      }
    />
  );
}
