import {View, Text, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { useAuth0 } from 'react-native-auth0';

export default function LoginScreen() {

const {authorize} = useAuth0();
  
const login = async () => {
  try {
      await authorize();
  } catch (e) {
      console.log(e);
  }}

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }} className="bg-white">
        <View>
          <View className="flex-1 flex items-center justify-center mx-6 mt-20">
          <Text className="text-3xl text-center text-[#627bb1] font-bold">Welcome to Retrospect</Text>
        <Image className="aspect-square h-80" source={require('../assets/images/womanSearchingBook.jpg')}/>
        <View className="p-4 bg-[#627bb1] shadow-lg shadow-black flex rounded-xl">
        <Text className="py-2 mb-2 text-3xl text-center text-white font-bold">What is Retrospect?</Text>
        <Text className="text-lg mb-4 text-white">Every day you will be asked a question.</Text>
        <Text className="text-lg mb-4 text-white">What will your answer be?</Text>
       
        
        <Text className="text-lg text-white">You can then see responses from the community, and your previous responses from the last month.</Text>
        </View>

  <View className="p-2 flex-row">

  <TouchableOpacity
      onPress={login}
      className="px-10 py-2 m-2 bg-blue-200 rounded-lg">
        <Text className="text-center text-lg">Sign in</Text>
  </TouchableOpacity>

  <TouchableOpacity
      onPress={login}
      className="px-10 py-2 m-2 bg-blue-200 rounded-lg">
        <Text className="text-center text-lg">Sign up</Text>
  </TouchableOpacity>

    </View>
        </View>
          </View>
        </ScrollView>
       
      
    );
  }