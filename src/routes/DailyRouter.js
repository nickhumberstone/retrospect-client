import AnswerStack from '../stacks/AnswerStack';
import QuestionStack from '../stacks/QuestionStack'
import { useAuth0 } from 'react-native-auth0';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function DailyRouter() {
const {user} = useAuth0();
const [latestResponse, setLatestResponse] = useState("noValueHere");
const [answeredToday, setAnsweredToday] = useState(false);

const currentDate = new Date().toISOString().slice(0,10)
console.log("latest response: ", latestResponse)
console.log("currentDate = ", currentDate)


function setResponse(response) {
  setLatestResponse(response)
  setAnsweredToday(true)
}

// Whenever app becomes in focus, fetch the latest response for that user. Compare the timestamp to the current day to evaluate if they have answered today. Show QuestionStack if false, show Answerstack if true.
useFocusEffect(
  useCallback(() => {
    console.log("Server URL is pointing to: ",process.env.EXPO_PUBLIC_SERVER_URL)

if(currentDate === latestResponse){
  console.log("User has answered today")
  setAnsweredToday(true)
} else {
  console.log("User has not answered today")
  checkLatestResponse();
}


 }, [user.sub])
);

  const checkLatestResponse = async() => {
    console.log("latest response is being fetched")
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/mylatestresponse?`+ new URLSearchParams({user_id : user.sub}))
        const answers = await response.json()
        const time = new Date(answers[0].date_created).toISOString()
        console.log("answers: ",answers[0].date_created)
        console.log("TIME: ",time)
        
        //.slice(0,10))
        setLatestResponse(answers[0].date_created.slice(0,10))
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
          {!answeredToday ? <QuestionStack setResponse={setResponse}/> : <AnswerStack/>}
        </>
      );
}