import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function MyAnswersScreen(props) {
  const [feedback, setFeedback] = useState([]);

  const { clearSession, user } = useAuth0();

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  const sendFeedback = () => {
    console.log("fed back init");
  };

  return (
    <ScrollView
      contentContainerStyle={{ minHeight: "100%" }}
      className="bg-white h-screen w-screen"
      keyboardShouldPersistTaps={"handled"}
    >
      <View className="flex-1 flex items-center justify-between mx-6 mt-20 mb-10">
        <View>
          <Text className="text-3xl text-center text-[#627bb1] font-bold">
            Settings
          </Text>
          <Image
            className="aspect-square h-60 m-auto"
            source={require("../assets/images/holdingform.png")}
          />
          <View className="bg-[#667bb1] my-4 items-center p-2 w-full rounded-md shadow-lg shadow-black ">
            <Text className="text-md p-1 text-white text-center">
              Logged in as {user.name}
            </Text>
          </View>
        </View>
        <View className="feedbackform">
          <Text className="text-2xl text-center text-[#627bb1] font-bold p-4">
            Feedback
          </Text>
          {/* <TouchableOpacity
            onPress={sendFeedback}
            className="p-2 bg-white rounded-lg flex-1 justify-center items-center"
          >
            <Text className="text-xl">🖊</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            className="mt-6 shadow-lg rounded-lg bg-blue-200 m-1 w-full p-4 justify-center items-center"
            onPress={() => Linking.openURL(`mailto:nickhumberstone@gmail.com`)}
          >
            <Text className="text-black text-xl">Draft email message</Text>
          </TouchableOpacity>
          {/* <View className="form p-4 bg-[#627bb1] shadow-lg shadow-black flex flex-row rounded-xl gap-1">
            <TextInput
              className="bg-blue-100 h-20 rounded-lg text-xl text-center w-4/5"
              placeholder="Have you got some feedback?"
              value={feedback}
              onChangeText={setFeedback}
              multiline={true}
            />
            <TouchableOpacity
              onPress={sendFeedback}
              className="p-2 bg-white rounded-lg flex-1 justify-center items-center"
            >
              <Text className="text-xl">🖊</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View className="footer w-full">
          <TouchableOpacity
            className="shadow-lg rounded-lg bg-blue-200 w-1/2 m-auto h-12 justify-center items-center"
            onPress={logout}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
