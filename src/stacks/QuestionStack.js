import QuestionScreen from "../screens/QuestionScreen";

export default function QuestionStack(props) {
  // console.log("QStack props - ",props)
  return <QuestionScreen setAnswered={props.setAnswered} sub={props.sub} />;
}
