import { DimensionValue, Text, TouchableOpacity, View } from 'react-native';
import BottomSheetDemo from './bottom-sheet';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useAreaPremiumStore } from '../store/bottom-sheet';

type AreaPremiumContentProps = {
  height?: DimensionValue;
};
export function AreaPremiumContent({ height = '100%' }: AreaPremiumContentProps) {
  return (
    <LinearGradient
      colors={['#36007D', '#5C00B6', '#36007D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height }}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 }}
      >
        <Text className="text-center text-white font-medium text-xl">
          Tenha perguntas ilimitadas com o Premium
        </Text>

        <View className="flex flex-row gap-6">
          <View className="flex items-center">
            <View className="flex flex-row gap-[2px] bg-[#36007D] border border-[#5C00B6] p-1 rounded-md w-20 -mb-2 z-10">
              <Text className="text-white text-xs font-medium">+1 ANO</Text>
              <Text className="text-yellow-200 text-xs font-medium">GRÁTIS</Text>
            </View>
            <TouchableOpacity className="flex flex-col border-2 border-primary bg-primary rounded-lg items-center justify-center py-3 w-28">
              <Text className="text-center text-white font-medium text-xl">Anual</Text>
            </TouchableOpacity>
          </View>

          <View className="flex items-center mt-[13.5px]">
            <TouchableOpacity className="flex flex-col border-2 border-primary rounded-lg items-center justify-center py-3 w-28">
              <Text className="text-center text-white font-medium text-xl">Trimestral</Text>
            </TouchableOpacity>
          </View>

          <View className="flex items-center mt-[13.5px]">
            <TouchableOpacity className="flex flex-col border-2 border-primary rounded-lg items-center justify-center py-3 w-28">
              <Text className="text-center text-white font-medium text-xl">Mensal</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-col items-center justify-center gap-2">
          <View className="p-1 px-2 rounded-lg flex flex-row items-center gap-1 bg-[#36007D]">
            <Text className="text-white text-sm">Assine 1 ano e</Text>
            <Text className="text-yellow-200 text-sm font-bold">leve 2</Text>
          </View>

          <View className="flex flex-row">
            <Text className="mr-1 text-gray-400 font-medium text-2xl">12x</Text>
            <Text className="text-3xl text-white font-medium ">RS17.90</Text>
            <Text className="text-gray-400 text-2xl font-medium">/mês</Text>
          </View>

          <Text className="text-gray-300 font-medium">= R$0.59/dia</Text>
        </View>
      </ScrollView>

      <View className="p-3 gap-2 bg-[#36007D]/20">
        <View className="flex flex-row items-center gap-1 justify-center">
          <MaterialIcons name="alarm" color="#fff" />
          <Text className="text-yellow-200 font-bold">+ 1 ano grátis</Text>
          <Text className="text-white">no plano Anual por tempo limitado</Text>
        </View>
        <TouchableOpacity
          className="flex items-center justify-center rounded-3xl p-3 bg-primary"
          onPress={() => {}}
        >
          <Text className="text-white text-lg font-medium">Assinar o Premium</Text>
        </TouchableOpacity>
        <Text className="text-center text-gray-200 text-sm">
          Termos | Privacidade | Renovação automática até ser cancelado
        </Text>
      </View>
    </LinearGradient>
  );
}

export default function AreaPremium() {
  const { isOpen } = useAreaPremiumStore();
  return <BottomSheetDemo isOpen={isOpen} onClose={() => {}} children={<AreaPremiumContent />} />;
}
