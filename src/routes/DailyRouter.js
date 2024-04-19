import AnswerStack from '../stacks/AnswerStack';
import QuestionStack from '../stacks/QuestionStack'
import { useAuth0 } from 'react-native-auth0';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function DailyRouter() {
const {user} = useAuth0();
const [latestResponse, setLatestResponse] = useState("EXAMPLELATESTRESPONSE");
const [answeredToday, setAnsweredToday] = useState(false);

console.log("Latest response = ", latestResponse)
console.log("Have they answered today? ",answeredToday)

  // useFocusEffect(
  //   useCallback(() => {
  //     setAnsweredDaily(false)
  //   checkAnswered();
  //   }, [user.sub])
  // );

  // const checkAnswered = async() => {
  //   console.log("checkAnswered triggered:")
  //       const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/hasAnswered?`+ new URLSearchParams({user_id : user.sub}))
  //       console.log(response)
  //       const answers = await response.json()
  //       if(!dailyQ){setAnsweredDaily(answers)}
  // };

  // const answeredDaily = true;
    return (
        <>
          {!answeredToday ? 
          <QuestionStack 
          latestResponse = {latestResponse}
          setLatestResponse={response => setLatestResponse(response)}
          /> 
          : 
          <AnswerStack/>}
        </>
      );
}