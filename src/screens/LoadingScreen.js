import {ScrollView, View, Text, Image} from 'react-native'

export default function LoadingScreen() {
    return (
<ScrollView keyboardShouldPersistTaps={'handled'} className="bg-blue-600">
        <View className="flex-1 flex items-center justify-center mx-6 mt-10">
<Text>Loading the app...</Text>
<Image className="aspect-square h-80" source={require('../assets/images/womanSearchingBook.jpg')}/>
        <View className="p-4 bg-[#627bb1] shadow-lg shadow-black flex flex-row rounded-xl w-9/10 gap-2">
  </View>
        </View>
      </ScrollView>
    );
  }