import AnswerStack from '../stacks/AnswerStack';
import QuestionStack from '../stacks/QuestionStack'
import { useAuth0 } from 'react-native-auth0';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function DailyRouter() {
  console.log("dailyrouter popped off!")
  const {user} = useAuth0();
  const [answeredDaily, setAnsweredDaily] = useState([])

  useFocusEffect(
    useCallback(() => {
      setAnsweredDaily(false)
    checkAnswered();
    }, [user.sub])
  );

  const checkAnswered = async() => {
    console.log("checkAnswered triggered")
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/hasAnswered?`+ new URLSearchParams({user_id : user.sub}))
        //const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/checkAnswered?auth0|65f1c4e0eb8eff5956b5ed25`)
        const answers = await response.json();
        if(answers != []){setAnsweredDaily(answers); console.log(answers)}
  };

  // const answeredDaily = true;
    return (
        <>
          {!answeredDaily ? <QuestionStack/> : <AnswerStack/>}
        </>
      );
}