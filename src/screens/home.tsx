import { Image, TextInput, View } from 'react-native';
import IconButton from '../components/icon-button';
import { colors } from '../styles/colors';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-between bg-background p-4">
      <View className="items-center w-full justify-center my-auto">
        <Image
          source={require('../assets/images/home-illustration.webp')}
          style={{ width: 300, height: 300 }}
        />
      </View>

      <View className="flex flex-row gap-2">
        <TextInput placeholder="Digite sua pergunta aqui..." className="border px-5 rounded-3xl flex-1" />
        <IconButton
          iconName="send"
          onPress={() => {}}
          iconColor="#fff"
          circle={true}
          circleColor={colors.primary}
        />
      </View>
    </View>
  );
}
