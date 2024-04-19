import AnswerStack from '../stacks/AnswerStack';
import QuestionStack from '../stacks/QuestionStack'
import { useAuth0 } from 'react-native-auth0';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function DailyRouter() {
const {user} = useAuth0();
const [latestResponse, setLatestResponse] = useState("");
const [answeredToday, setAnsweredToday] = useState(false);

const currentDate = new Date().toISOString().slice(0,10)
const latestResponseDate = latestResponse.slice(0,10)
console.log("currentDate = ",currentDate)
console.log("latestResponseDate = ",latestResponseDate)

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

if(currentDate === latestResponseDate){
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
        const answers = await response.json();
        console.log("answers done")
        setLatestResponse(answers[0].created_datetime)
        
        if (currentDate === answers[0].created_datetime.slice(0,10)){
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
          latestResponse = {latestResponse}
          setResponse={setResponse}
          /> 
          : 
          <AnswerStack/>}
        </>
      );
}