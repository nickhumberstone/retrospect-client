import { View, Text, Image, ScrollView } from "react-native";
import { useState, useCallback } from "react";
import ResponseCardCommunity from "../components/ResponseCardCommunity";
import DailyQuestionCard from "../components/DailyQuestionCard";
import { useFocusEffect } from "@react-navigation/native";

export default function CommunityAnswersScreen(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDailyAnswers = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/dailyanswers?` +
        new URLSearchParams({ user_id: props.sub })
    );
    const answers = await response.json();
    setData(answers);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchDailyAnswers();
    }, [props.sub])
  );

  return (
    <ScrollView
      contentContainerStyle={{ minHeight: "100%" }}
      className="bg-white"
    >
      <View className="flex-1 flex items-center justify-center mx-6 mt-10">
        <Text className="text-3xl text-center text-[#627bb1] font-bold">
          Community Answers
        </Text>
        <Image
          className="aspect-square h-60"
          source={require("../assets/images/readingmanybooks.png")}
        />
        <DailyQuestionCard />
        {loading && (
          <Text className="text-center">Responses are loading...</Text>
        )}
        {data !== "undefined" &&
          data.map((e) => (
            <ResponseCardCommunity
              response={e.text_content}
              given_name={e.given_name}
              key={e.response_id}
            />
          ))}
        {data.length == 0 && (
          <ResponseCardCommunity
            response={
              "Congratulations! You're the first to respond! Please check back later to see what other people said."
            }
          />
        )}
      </View>
    </ScrollView>
  );
}
