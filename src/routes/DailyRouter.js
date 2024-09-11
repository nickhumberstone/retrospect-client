import AnswerStack from "../stacks/AnswerStack";
import QuestionStack from "../stacks/QuestionStack";
import LoadingScreen from "../screens/LoadingScreen";
import { useAuth0 } from "react-native-auth0";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { usePushNotifications } from "../../usePushNotifications";
import { Text } from "react-native";

export default function DailyRouter(props) {
  console.log("DailyRouter - props: ", props);
  const [answeredToday, setAnsweredToday] = useState(false);
  const [loading, setLoading] = useState(true);

  // const { expoPushToken, notification } = usePushNotifications(props.user);

  // const data = JSON.stringify(notification, undefined, 2);

  // Whenever app becomes in focus, fetch the latest response for that user. Compare the timestamp to the current day to evaluate if they have answered today. Show QuestionStack if false, show Answerstack if true.
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
    console.log("Fetching to see if user has answered today");
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/didtheyanswertoday?` +
        // new URLSearchParams({ user_id: "auth|7C663e6d028c9808c33cbfb0d2" })
        new URLSearchParams({ user_id: props.sub })
    );
    const answers = await response;
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
      <Text>{answeredToday ? "true" : "false"}</Text>
      {/* <Text>Token: {expoPushToken?.data ?? ""}</Text>
      <Text>{data}</Text> */}
    </>
  );
}
