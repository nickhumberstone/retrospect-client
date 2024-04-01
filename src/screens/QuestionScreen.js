import {ScrollView, View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';

export default function QuestionScreen() {

  const [answer, setAnswer] = useState("");
  const [responseSubmitted, setResponseSubmitted] = useState(false)
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
const {user} = useAuth0();
const user_id = user.sub;
// ServerURL to be kept private using variables in future
const serverURL = "https://questionanswer-a72d97c4c83c.herokuapp.com"

useEffect(() => {
  fetchDailyQuestion();
}, [])

  const fetchDailyQuestion = async() => {
    const response = await fetch(`${serverURL}/dailyQuestion`)
    const output = await response.json()
  setQuestion(output[0].dailyQuestion)
  setLoading(false)
};

      const postAnswer = async() => {
      const data = {"user_id": user.sub, "text_content" : answer}
      console.log("Post request initiated, to /add, with body of: " + data)
      const response = await fetch(`${serverURL}/add`, {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      setResponseSubmitted(true);
     console.log("Response sent");
    };

    return (
<ScrollView contentContainerStyle={{ minHeight: '100%' }} className="bg-white">
        <View className="flex-1 flex items-center justify-center mx-6 mt-10">
        <Text className="text-4xl text-center text-[#627bb1] font-bold">Daily Question</Text>

        <Image className="aspect-square h-80" source={require('../assets/images/womanWriting.jpg')} />
        
        
        <KeyboardAvoidingView className="p-4 bg-[#627bb1] shadow-lg shadow-black flex rounded-xl">
    {loading && (<Text>~ Fetching today's question... ~</Text>)}
    {question && (<Text className="text-center text-white p-2 text-3xl font-bold">{question}</Text>)}
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
        </View>
      </ScrollView>
    );
  }