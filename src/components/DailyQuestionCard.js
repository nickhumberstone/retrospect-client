import { KeyboardAvoidingView, Text } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'

export default function DailyQuestionCard() {

    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDailyQuestion();
  }, [])
  
    const fetchDailyQuestion = async() => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/dailyquestion`)
      const output = await response.json()
    setQuestion(output[0].dailyQuestion)
    setLoading(false)
  };

  return (
    <KeyboardAvoidingView className="w-full py-2 mb-6 bg-[#627bb1] shadow-lg shadow-black flex rounded-xl">
      <Text className="p-1 text-center text-white text-lg">Today's question is:</Text>
      {loading && (<Text className="text-center text-white px-2 pb-2 text-lg">~ Loading... ~</Text>)}
    {question && (<Text className="text-center text-white px-2 pb-2 text-3xl font-bold">{question}</Text>)}
    </KeyboardAvoidingView>
  )
}