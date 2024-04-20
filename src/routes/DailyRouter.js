import AnswerStack from '../stacks/AnswerStack';
import QuestionStack from '../stacks/QuestionStack'
import { useAuth0 } from 'react-native-auth0';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function DailyRouter() {
const {user} = useAuth0();
const [latestResponse, setLatestResponse] = useState("9999999999");
const [answeredToday, setAnsweredToday] = useState(false);

const currentDate = new Date().toISOString().slice(0,10)
console.log("latest response: ",latestResponse)
console.log("currentDate = ",currentDate)
console.log("latestResponse = ", latestResponse)

function setResponse(response) {
  setLatestResponse(response)
  setAnsweredToday(true)
  console.log(latestResponse)
 // console.log("answeredtoday? ", answeredToday)
}

// Whenever app becomes in focus, fetch the latest response for that user. Compare the timestamp to the current day to evaluate if they have answered today. Show QuestionStack if false, show Answerstack if true.
useFocusEffect(
  useCallback(() => {
    console.log("App became focussed");
    console.log("Server URL is pointing to: ",process.env.EXPO_PUBLIC_SERVER_URL)

if(currentDate === latestResponse){
  console.log("LastResponse was TODAY!")
  setAnsweredToday(true)
} else {
  console.log("ALERT! NEEDS TO ANSWER Q!")
  checkLatestResponse();
}


 }, [user.sub])
);

  const checkLatestResponse = async() => {
    console.log("latest response is being fetched")
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/mylatestresponse?`+ new URLSearchParams({user_id : user.sub}))
        const answers = await response.json()
        console.log("answers: ",answers)
        setLatestResponse(answers[0].created_datetime.slice(0,10))
        if (currentDate === latestResponse){
          console.log("dates match")
          setAnsweredToday(true)
        } else {
          console.log("dates dont match")
          setAnsweredToday(false)
        }

  };

   return (
        <>
          {!answeredToday ? 
          <QuestionStack 
         // latestResponse = {latestResponse}
          setResponse={setResponse}
          /> 
          : 
          <AnswerStack/>}
        </>
      );
}