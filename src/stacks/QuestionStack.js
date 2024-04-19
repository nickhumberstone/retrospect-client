import QuestionScreen from '../screens/QuestionScreen';

export default function AppStack({latestResponse, setResponse}) {
  return (
    <QuestionScreen latestResponse={latestResponse} setResponse={setResponse}/>    
  );
}
