import QuestionScreen from '../screens/QuestionScreen';

export default function AppStack({latestResponse}) {
  return (
    <QuestionScreen latestResponse={latestResponse}/>    
  );
}
