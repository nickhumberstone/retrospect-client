import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import { useEffect, useState } from 'react';
import ResponseCard from '../components/ResponseCardOther';
import { useAuth0 } from 'react-native-auth0';

export default function AnswerScreen() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {user} = useAuth0();
  const user_id = user.sub;
  
  const fetchData = async(user) => {
    console.log("fetchData triggered")
        const response = await fetch(`https://questionanswer-a72d97c4c83c.herokuapp.com/dailyanswers?`+ new URLSearchParams({user_id : user_id}))
        const answers = await response.json();
    setData(answers)
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [])

    return (
      <ScrollView contentContainerStyle={{ minHeight: '100%' }} className="bg-white">
        <View className="flex-1 flex items-center justify-center mx-6 mt-10">
        <Text className="text-3xl text-center text-[#627bb1] font-bold">Community responses</Text>
          <Image className="aspect-square h-80" source={require('../assets/images/womanReadingBook.jpg')} />
        {loading && (
        <Text className="text-center">Responses are loading!</Text>
      )}
      {data && (
        data.map((e) =>
        <ResponseCard
        response={e.text_content}
        user={e.user_id}
        key={e.response_id}
        />
      ))}

      <TouchableOpacity
      onPress={fetchData}
      className="p-2 m-2 bg-blue-200 rounded-lg">
        <Text className="text-center text-lg p-2">Click to refresh responses</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
        
    );
  }