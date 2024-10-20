import { View, Text } from "react-native";
import React from "react";

const ResponseCardUser = ({ response, date, id, question }) => {
  return (
    <View
    className="px-4 py-2 bg-gray-100 mb-2 w-full shadow-lg shadow-black flex rounded-lg"
    key={id}
    >
      {!question == '' && <Text className="text-xs text-gray-700">{question}</Text>}
      <Text className="font-bold text-center py-2 text-md">{response}</Text>
      
      <Text className="text-xs text-gray-700 text-right">{date}</Text>
    
    </View>
  );
};

export default ResponseCardUser;
