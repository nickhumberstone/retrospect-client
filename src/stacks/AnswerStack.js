import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CommunityAnswersScreen from '../screens/CommunityAnswersScreen';
import MyAnswersScreen from '../screens/MyAnswersScreen';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Community Answers" component={CommunityAnswersScreen} options={{tabBarIcon: () => <Ionicons name="people-outline" size={30}/>,}}/>
      <Tab.Screen name="My Answers" component={MyAnswersScreen} options={{tabBarIcon: () => <Ionicons name="book-outline" size={30}/>,}} />
    </Tab.Navigator>    
  );
}
