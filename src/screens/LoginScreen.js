import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function LoginScreen() {
  const { authorize } = useAuth0();

  const login = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ minHeight: "100%" }}
      className="bg-white"
    >
      <View>
        <View className="flex-1 flex items-center justify-center mx-6 mt-20">
          <Text className="text-3xl text-center text-[#627bb1] font-bold">
            Welcome to Retrospect
          </Text>
          <Image
            className="aspect-square h-60"
            source={require("../assets/images/holdingform.png")}
          />
          <View className="p-2 bg-[#627bb1] shadow-lg shadow-black flex rounded-xl">
            <Text className="mb-2 text-3xl text-center text-white font-bold">
              What is Retrospect?
            </Text>
            <Text className="text-lg mb-4 text-white text-center">
              Every day you will be asked a question.
            </Text>
            <Text className="text-lg mb-4 text-white text-center">
              What will your answer be?
            </Text>

            <Text className="text-lg text-white text-center">
              You can then see how other members of the community have answered,
              and compare your responses to the same question from previous
              months.
            </Text>
          </View>
          <View className="p-2">
            <TouchableOpacity
              onPress={login}
              className="px-10 h-12 py-2 m-2 bg-blue-200 rounded-lg"
            >
              <Text className="text-center text-lg">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
