import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuestionScreen from '../screens/QuestionScreen';
import AnswerScreen from '../screens/AnswerScreen';
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator initialRouteName='Question' screenOptions={{headerShown:false}}>
      <Tab.Screen name="Question" component={QuestionScreen} />
      <Tab.Screen name="Answer" component={AnswerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>    
  );
}
