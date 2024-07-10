import {ScrollView, View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import { useState} from 'react';
import { useAuth0 } from 'react-native-auth0';
import DailyQuestionCard from '../components/DailyQuestionCard';

export default function QuestionScreen({setAnswered}, props) {
  const [answer, setAnswer] = useState("");
  
  const postAnswer = async() => {
      const data = {"user_id": props.user.sub, "text_content" : answer}
      await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/add`, {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      setAnswered();
     console.log("/addAnswer: " + JSON.stringify(data))
    };

    return (
<ScrollView keyboardShouldPersistTaps={'handled'} className="bg-white">
  <View className="flex-1 flex items-center justify-center mx-6 mt-10">
    <Image className="aspect-square h-80" source={require('../assets/images/writingnotes.png')}/>
    <DailyQuestionCard/>
      <View className="p-4 bg-[#627bb1] shadow-lg shadow-black flex flex-row rounded-xl gap-1">
      <TextInput
      className="bg-blue-200 py-6 rounded-lg text-xl text-center w-4/5"
      placeholder='Answer here'
      value={answer}
      onChangeText={setAnswer}
      maxLength={140}
      multiline={true}
      />
      <TouchableOpacity
      onPress={postAnswer}
      className="p-2 bg-white rounded-lg flex-1 justify-center items-center">
        <Text className="text-xl">🖊</Text>
      </TouchableOpacity>
    </View>
    <Text className="pt-1 px-1 text-gray-500 text-sm text-center">Answer the question above see your previous answers, and answers from the community. Your answer must be 140 characters of less.</Text>
  </View>
</ScrollView>
    );
  }