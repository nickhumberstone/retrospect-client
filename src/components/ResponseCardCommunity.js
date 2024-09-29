import { View, Text } from "react-native";
import React from "react";

const ResponseCardCommunity = ({ response, given_name, id }) => {
  return (
    <View
      className="p-4 bg-gray-100 mb-2 w-full shadow-lg shadow-black flex rounded-lg"
      key={id}
    >
      <Text className="font-bold">{response}</Text>
      {given_name ? (
        <></>
      ) : (
        <Text className="text-xs text-gray-700 text-right">{given_name}</Text>
      )}
    </View>
  );
};

export default ResponseCardCommunity;
