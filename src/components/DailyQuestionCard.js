import { KeyboardAvoidingView, Text } from "react-native";
import { useState, useEffect } from "react";
import React from "react";

export default function DailyQuestionCard() {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyQuestion();
  }, []);

  const fetchDailyQuestion = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/dailyquestion`
    );
    const [output] = await response.json();
    console.log("Daily Question = ", output);
    setQuestion(output.dailyQuestion);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView className="w-full p-4 bg-[#627bb1] shadow-lg shadow-black flex rounded-xl mb-4">
      <Text className="pb-1 text-center text-white text-lg">
        Today's question is:
      </Text>
      {loading && (
        <Text className="text-center text-white text-lg">~ Loading... ~</Text>
      )}
      {question && (
        <Text className="text-center text-white text-3xl font-bold">
          {question}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
}
