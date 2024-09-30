import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import DailyQuestionCard from "../components/DailyQuestionCard";
import { useAuth0 } from "react-native-auth0";

export default function QuestionScreen(props) {
  const [answer, setAnswer] = useState("");

  console.log("QScreen - Sub: ", props.sub);

  const postAnswer = async () => {
    const data = { user_id: props.sub, text_content: answer };
    await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    props.setAnswered();
    console.log("/addAnswer: " + JSON.stringify(data));
  };

  const { clearSession } = useAuth0();
  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View
        keyboardShouldPersistTaps={"handled"}
        className="bg-white h-screen w-screen"
      >
        <View className="flex-1 flex items-center justify-around mx-6 mt-10">
          <View></View>
          <View>
            <Image
              className="aspect-square h-48 mx-auto"
              source={require("../assets/images/writingnotes.png")}
            />
            <DailyQuestionCard />
          </View>
          <View>
            <View className="form p-4 bg-[#627bb1] shadow-lg shadow-black flex flex-row rounded-xl gap-1">
              <TextInput
                className="bg-blue-100 h-20 rounded-lg text-xl text-center w-4/5"
                placeholder="Answer here"
                value={answer}
                onChangeText={setAnswer}
                maxLength={140}
                multiline={true}
              />
              <TouchableOpacity
                onPress={postAnswer}
                className="p-2 bg-white rounded-lg flex-1 justify-center items-center"
              >
                <Text className="text-xl">🖊</Text>
              </TouchableOpacity>
            </View>
            <Text className="pt-1 px-1 text-gray-500 text-sm text-center">
              Answer the question above to see your previous answers, and
              answers from the community. Your answer must be 140 characters or
              fewer.
            </Text>
            <TouchableOpacity
              className="shadow-lg rounded-lg bg-blue-100 w-20 mx-auto my-2 h-10 justify-center items-center"
              onPress={logout}
            >
              <Text>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
