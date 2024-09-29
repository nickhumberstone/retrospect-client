import { View, Text } from "react-native";
import React from "react";

const ResponseCardUser = ({ response, date, id }) => {
  return (
    <View
      className="p-4 bg-gray-100 mb-2 w-full shadow-lg shadow-black flex rounded-lg"
      key={id}
    >
      <Text className="font-bold">{response}</Text>
      <Text className="text-xs text-gray-700 text-right">{date}</Text>
    </View>
  );
};

export default ResponseCardUser;
