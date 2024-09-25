import AnswerStack from "../stacks/AnswerStack";
import QuestionStack from "../stacks/QuestionStack";
import LoadingScreen from "../screens/LoadingScreen";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { usePushNotifications } from "../../usePushNotifications";

export default function DailyRouter(props) {
  const [answeredToday, setAnsweredToday] = useState(false);
  const [loading, setLoading] = useState(true);

  const { expoPushToken, notification } = usePushNotifications(props.user);

  function setAnswered() {
    setAnsweredToday(true);
  }
  useFocusEffect(
    useCallback(() => {
      console.log(
        "Server URL is pointing to: ",
        process.env.EXPO_PUBLIC_SERVER_URL
      );
      checkLatestResponse();
    }, [props.sub])
  );

  const checkLatestResponse = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/didtheyanswertoday?` +
        new URLSearchParams({ user_id: props.sub })
    );
    const answers = await response.json();
    console.log("DidTheyAnswerToday? ", answers);
    setAnsweredToday(answers);
    setLoading(false);
  };

  // console.log("props.user is: ", props.user)

  return (
    <>
      {/* <LoadingScreen/> */}
      {!loading ? (
        !answeredToday ? (
          <QuestionStack setAnswered={setAnswered} sub={props.sub} />
        ) : (
          <AnswerStack sub={props.sub} />
        )
      ) : (
        <LoadingScreen />
      )}
      {/* <Text>Token: {expoPushToken?.data ?? ""}</Text> */}
    </>
  );
}
