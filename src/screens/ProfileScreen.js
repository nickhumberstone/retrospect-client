import {View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useAuth0 } from 'react-native-auth0'
import { useState, useEffect } from 'react';
import ResponseCard from '../components/ResponseCardOther';



export default function ProfileScreen() {
  const {user, error} = useAuth0();
  const user_id = user.sub;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const profiledata = {
    name: "Untitled User",
  }
  
  const editProfile = () => {
    console.log("edit profile pressed")
  }

  const {clearSession} = useAuth0();

  const logout = async () => {
      try {
          await clearSession();
      } catch (e) {
          console.log(e);
      }
  };

  const fetchData = async(user) => {
    console.log("fetchMyAnswers triggered")
        const response = await fetch(`https://questionanswer-a72d97c4c83c.herokuapp.com/myanswers?`+ new URLSearchParams({user_id : user_id}))
        const answers = await response.json();
    setData(answers)
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [])

    return (
<ScrollView contentContainerStyle={{ minHeight: '100%' }} className="bg-white">
        <View className="flex-1 flex items-center justify-center mx-6 mt-20">
        <Text className="text-3xl text-center text-[#627bb1] font-bold">Your Responses</Text>
        <Image className="aspect-square h-80" source={require('../assets/images/womanSearchingBook.jpg')}/>
        <View className="bg-[#667bb1] m-2 items-center p-2 rounded-md shadow-lg shadow-black ">
        <Text className="text-3xl p-2 text-white">{profiledata.name}</Text>
        {user && <Text className="text-xl p-1 text-white">Logged in as {user.name}</Text>}
        </View>

        {data && (
          data.map((e) =>
          <ResponseCard
          response={e.text_content}
          user={e.user_id}
          key={e.response_id}
          />
          ))}

<View className="buttonContainer flex-1 flex-row mx-10 w-sreen">
          <TouchableOpacity className="mt-6 shadow-lg rounded-lg bg-blue-200 m-1 h-10 justify-center items-center" onPress={editProfile}><Text>Edit Profile</Text></TouchableOpacity>
        <TouchableOpacity className="mt-6 shadow-lg rounded-lg bg-blue-200 m-1 h-10 justify-center items-center" onPress={logout}><Text>Log Out</Text></TouchableOpacity>
        <TouchableOpacity
      onPress={fetchData}
      className="mt-6 shadow-lg rounded-lg bg-blue-200 basis-32 m-1 h-10 justify-center items-center">
        <Text>Click to refresh responses</Text>
        </TouchableOpacity>
        </View>
        </View>
            
      </ScrollView>
    );
  }