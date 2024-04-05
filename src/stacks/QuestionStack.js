import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuestionScreen from '../screens/QuestionScreen';


const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <QuestionScreen/>    
  );
}
