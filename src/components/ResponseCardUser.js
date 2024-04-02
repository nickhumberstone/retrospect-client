import { View, Text } from 'react-native'
import React from 'react'

const ResponseCardUser = ({response,date,id}) => {
  return (
    <View className="p-5 bg-gray-100 mb-2 shadow-lg shadow-black w-4/5 flex rounded-md" key={id}>
      <Text className="font-bold">{response}</Text>
      <Text className="text-xs text-gray-700 text-right">{date}</Text>
    </View>
  )
}

export default ResponseCardUser