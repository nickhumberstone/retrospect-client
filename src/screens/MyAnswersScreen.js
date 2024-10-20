import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable
} from "react-native";
import { useState, useCallback } from "react";
import ResponseCardUser from "../components/ResponseCardUser";
import DailyQuestionCard from "../components/DailyQuestionCard";
import { useFocusEffect } from "@react-navigation/native";

export default function MyAnswersScreen(props) {
  const [data, setData] = useState([
    {
      "response_id" : 0,
      "text_content" : "",
      "dayInCycle" : 0,
      "date_as_text" : "",
      "date_created" : "",
      "question" : ""
    }
  ]);
  const [responseData, setResponseData] = useState(data.filter((item) => item.dayInCycle == data[0].dayInCycle));
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("today")

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

  const filterPressed = (filter) => { 
    // Output is always ordered with latest response on top, so data[0] must be current day
    let todayInCycle = data[0].dayInCycle;
    if (filter === "all") {
    setActiveFilter("all")
    setResponseData(data)
    // console.log("filtered to All")
  } else if (filter === "weekday") {
    setActiveFilter("weekday")
    setResponseData(data.filter((item) => item.dayInCycle % 7 == todayInCycle % 7))
    // console.log("filtered to Weekday")
  } else if (filter === "today") {
    setActiveFilter("today")
    setResponseData(data.filter((item) => item.dayInCycle == todayInCycle))
    // console.log("filtered to Today") 
  }
  } 


  const DayOfWeek = "Monday"

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
        {/* 
        add select toggle for todays question and similar questions - two pressables like a folder icon
        data.filter to apply it to just ones that match that day
        make sure the Card displays what the question each day is, in addition to the date and the response
            */}
        <View className="bg-blue-400 w-full rounded-lg shadow-lg shadow-black">
          <Text className="text-center text-lg p-2 text-white">View responses from which question(s)?</Text>
        <View className="nav-section flex items-center flex-row mx-2 mb-2">
          <Pressable onPress={() => filterPressed("weekday")} className={`${activeFilter == 'weekday' ? 'bg-blue-700' : 'bg-blue-200'} h-12 flex-1 items-center rounded-lg mx-1 justify-center `}><Text className={`${activeFilter == 'weekday' ? 'text-white font-bold' : ''}`}>{DayOfWeek + "'s"}</Text></Pressable>
          <Pressable onPress={() => filterPressed("today")} className={`${activeFilter == 'today' ? 'bg-blue-700 text-white' : 'bg-blue-200'} h-12 flex-1 items-center rounded-lg mx-1 justify-center `}><Text className={`${activeFilter == 'today' ? 'text-white font-bold' : ''}`}>Today's</Text></Pressable>
          <Pressable onPress={() => filterPressed("all")} className={`${activeFilter == 'all' ? 'bg-blue-700 text-white' : 'bg-blue-200'} h-12 flex-1 items-center rounded-lg mx-1 justify-center `}><Text className={`${activeFilter == 'all' ? 'text-white font-bold' : ''}`}>All</Text></Pressable>
        </View>
        </View>
        <View className="card-section w-full mt-5 mb-2">
        
        {loading && <Text className="text-center">Responses are loading!</Text>}
        {responseData !== "undefined" &&
          responseData.map((e) => (
            <ResponseCardUser
            response={e.text_content}
            date={e.date_as_text}
            key={e.response_id}
            question={activeFilter == "today" ? question="" : e.question}
            />
          ))}
          {/* activeFilter == 'today' ? '' : question = dailyQuestion */}
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
        </View>
    </ScrollView>
  );
}
