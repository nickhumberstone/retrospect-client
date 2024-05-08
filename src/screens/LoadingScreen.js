import {View, Text, Image} from 'react-native'

export default function LoadingScreen() {
    return (
<View className="h-full bg-white">
  <View className="flex-1 items-center justify-center">
    <Image className="aspect-square h-80" source={require('../assets/images/womanclock.png')}/>
    <View className="p-4 bg-[#627bb1] shadow-md shadow-black rounded-2xl w-9/10">
      <Text className="text-white text-2xl">Loading...</Text>
    </View>
  </View>
</View>
    );
  }