import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useState, useCallback } from "react";
import ResponseCardUser from "../components/ResponseCardUser";
import DailyQuestionCard from "../components/DailyQuestionCard";
import { useFocusEffect } from "@react-navigation/native";

export default function MyAnswersScreen(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { clearSession, user } = useAuth0();

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/myanswers?` +
        new URLSearchParams({ user_id: props.sub })
    );
    const answers = await response.json();
    console.log("fetchData: ", answers);
    setData(answers);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [props.sub])
  );

  return (
    <ScrollView
      contentContainerStyle={{ minHeight: "100%" }}
      className="bg-white"
    >
      <View className="flex-1 flex items-center justify-center mx-6 mt-20">
        <Text className="text-3xl text-center text-[#627bb1] font-bold">
          My Answers
        </Text>
        <Image
          className="aspect-square h-60"
          source={require("../assets/images/readingbook.png")}
        />

        <DailyQuestionCard />
        {loading && <Text className="text-center">Responses are loading!</Text>}
        {data !== "undefined" &&
          data.map((e) => (
            <ResponseCardUser
              response={e.text_content}
              date={e.date_created}
              key={e.response_id}
            />
          ))}
        {data.length > 1 ? (
          <></>
        ) : (
          <ResponseCardUser
            response="When you answer this question again in 28 days time, you will be
            able to start comparing your current and previous responses"
            date="Retrospect"
          />
        )}
      </View>
    </ScrollView>
  );
}
