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
    <KeyboardAvoidingView className="p-4 m-2 bg-[#627bb1] shadow-lg shadow-black flex rounded-xl">
      {loading && (<Text className="text-center text-white p-2 text-lg">~ Fetching today's question... ~</Text>)}
    {question && (<Text className="text-center text-white p-2 text-3xl font-bold">{question}</Text>)}
    </KeyboardAvoidingView>
  )
}