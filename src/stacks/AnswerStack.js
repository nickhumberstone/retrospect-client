import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CommunityAnswersScreen from "../screens/CommunityAnswersScreen";
import MyAnswersScreen from "../screens/MyAnswersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function AnswerStack(props) {
  console.log("AnswerStack - props: ", props);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Community Answers"
        children={() => <CommunityAnswersScreen sub={props.sub} />}
        options={{
          tabBarIcon: () => <Ionicons name="people-outline" size={30} />,
        }}
      />
      <Tab.Screen
        name="My Answers"
        children={() => <MyAnswersScreen sub={props.sub} />}
        options={{
          tabBarIcon: () => <Ionicons name="book-outline" size={30} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        children={() => <SettingsScreen sub={props.sub} />}
        options={{
          tabBarIcon: () => <Ionicons name="book-outline" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}
