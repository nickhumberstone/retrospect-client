import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CommunityAnswersScreen from '../screens/CommunityAnswersScreen';
import MyAnswersScreen from '../screens/MyAnswersScreen';


const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Community Answers" component={CommunityAnswersScreen} />
      <Tab.Screen name="My Answers" component={MyAnswersScreen} />
    </Tab.Navigator>    
  );
}
