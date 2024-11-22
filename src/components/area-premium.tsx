import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { DimensionValue, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useAreaPremiumStore } from '../store/bottom-sheet';
import BottomSheetDemo from './bottom-sheet';

type AreaPremiumContentProps = {
  height?: DimensionValue;
};

export function AreaPremiumContent({ height = '100%' }: AreaPremiumContentProps) {
  const [modalVisible, setModalVisible] = useState(false);
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
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-lg font-medium">Assinar o Premium</Text>
        </TouchableOpacity>
        <Text className="text-center text-gray-200 text-sm">
          Termos | Privacidade | Renovação automática até ser cancelado
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-3xl m-8 relative">
              <View className="p-6 gap-4 mt-2">
                <Text className="text-xl font-medium text-center mb-4">
                  Adicionando Créditos à Sua Conta OpenAI
                </Text>

                <View className="flex flex-col  gap-2">
                  <Text className="">
                    1. Acesse: {''}
                    <Text className="font-bold text-blue-600">https://platform.openai.com</Text>
                  </Text>
                  <Text className="">
                    2. Faça login na sua conta ou crie uma nova, se ainda não tiver uma.
                  </Text>
                  <Text className="">3. Após o login, clique em "Billing" (Faturamento) no menu.</Text>
                  <Text className="">
                    4. Na página de Faturamento, conclua a transação utilizando seu cartão de crédito.
                  </Text>
                  <Text className="text-sm text-gray-500 mt-4">
                    * No projeto verifique se você está usando a chave da OpenAI da conta onde os créditos foram
                    adicionados, para garantir que tudo funcione corretamente
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
}

export default function AreaPremium() {
  const { isOpen } = useAreaPremiumStore();
  return <BottomSheetDemo isOpen={isOpen} onClose={() => {}} children={<AreaPremiumContent />} />;
}
