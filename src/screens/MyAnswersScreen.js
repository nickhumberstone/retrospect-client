import {View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native'
import { useAuth0 } from 'react-native-auth0'
import { useState, useCallback } from 'react';
import ResponseCardUser from '../components/ResponseCardUser';
import DailyQuestionCard from '../components/DailyQuestionCard';
import { useFocusEffect } from '@react-navigation/native';


export default function MyAnswersScreen(props) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {clearSession} = useAuth0();

  const logout = async () => {
      try {
          await clearSession();
      } catch (e) {
          console.log(e);
      }
  };

  const fetchData = async() => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/myanswers?`+ new URLSearchParams({user_id: props.user.sub}))
        const answers = await response.json();
        console.log("fetchData: ", answers)
    setData(answers)
    setLoading(false)
  };

  useFocusEffect(
    useCallback(() => {
    fetchData();
    }, [props.user.sub])
  );

    return (
<ScrollView contentContainerStyle={{ minHeight: '100%' }} className="bg-white">
        <View className="flex-1 flex items-center justify-center mx-6 mt-20">
        <Text className="text-3xl text-center text-[#627bb1] font-bold">My Answers</Text>
        <Image className="aspect-square h-80" source={require('../assets/images/readingbook.png')}/>
        
        <DailyQuestionCard/>
        {loading && (<Text className="text-center">Responses are loading!</Text>)}
        {data && (
          data.map((e) =>
          <ResponseCardUser response={e.text_content} date={e.date_created} key={e.response_id}/>
          ))}
          <View className="bg-black h-0.5 rounded-md mt-5 mb-2 w-full"></View>
          <View className="bg-[#667bb1] m-2 items-center p-2 rounded-md shadow-lg shadow-black ">
        <Text className="text-md p-1 text-white text-center">Logged in as {props.user.name}</Text>
        </View>
<View className="buttonContainer flex-1 flex-row mx-10">
        <TouchableOpacity className="mt-6 shadow-lg rounded-lg bg-blue-200 m-1 w-1/3 h-10 justify-center items-center" onPress={logout}><Text>Log Out</Text></TouchableOpacity>
        <TouchableOpacity className="mt-6 shadow-lg rounded-lg bg-blue-200 m-1 w-1/3 h-10 justify-center items-center" onPress={() => Linking.openURL(`https://humberstone.uk/contact`)}><Text>Feedback</Text></TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    );
  }