import {ScrollView, View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';
import DailyQuestionCard from '../components/DailyQuestionCard';
import { useFocusEffect } from '@react-navigation/native';

export default function QuestionScreen({ latestResponse, setResponse }) {

  const [answer, setAnswer] = useState("");
  const [responseSubmitted, setResponseSubmitted] = useState(false)
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
const {user} = useAuth0();

useEffect(() => {
  fetchDailyQuestion();
}, [])

  const fetchDailyQuestion = async() => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/dailyquestion`)
    const output = await response.json()
  setQuestion(output[0].dailyQuestion)
  setLoading(false)
};

      const postAnswer = async() => {
      const data = {"user_id": user.sub, "text_content" : answer}
      console.log("Post request initiated, to /add, with body of: " + data)
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/add`, {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      setResponseSubmitted(true);
     console.log("Response sent");
     setResponse();
    };

    return (
<ScrollView contentContainerStyle={{ minHeight: '100%' }} className="bg-white">
        <View className="flex-1 flex items-center justify-center mx-6 mt-10">
        <Text className="text-4xl text-center text-[#627bb1] font-bold">Daily Question</Text>
        <Image className="aspect-square h-80" source={require('../assets/images/womanWriting.jpg')} />
              
    <DailyQuestionCard/>
        <KeyboardAvoidingView className="p-4 bg-[#627bb1] shadow-lg shadow-black flex rounded-xl w-4/5">
    <TextInput
    className="bg-blue-200 my-2 py-6 rounded-lg text-xl text-center"
    placeholder='Answer here'
    value={answer}
    onChangeText={setAnswer}
    maxLength={140}
    multiline={true}
    />
    
<TouchableOpacity
    onPress={postAnswer}
    className="p-2 bg-white rounded-lg">
<Text className="text-center text-xl text-[#667bb1]">{responseSubmitted ? "Response sent" : "Send it!"}</Text>
      </TouchableOpacity>

  </KeyboardAvoidingView>

        <Text className="pt-1 px-1 text-gray-500 text-sm text-center">Answer the question above to enter the pool. Your answer must be 140 characters of less.</Text>
        <Text>Latest response was {latestResponse}</Text>
        </View>
      </ScrollView>
    );
  }