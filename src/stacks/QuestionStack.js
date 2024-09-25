import QuestionScreen from "../screens/QuestionScreen";

export default function QuestionStack(props) {
  return <QuestionScreen setAnswered={props.setAnswered} sub={props.sub} />;
}
