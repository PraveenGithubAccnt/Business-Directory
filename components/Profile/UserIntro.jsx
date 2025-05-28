import { View, Text, Image } from 'react-native'
import { useUser } from "@clerk/clerk-expo";

export default function UserIntro() {
    const { user } = useUser();
  return (
    <View style={{display: "flex", alignItems: "center", marginBottom: 20, marginTop: 20}}>
      <Image source={{uri:user?.imageUrl}}
       style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />
      <Text style={{ fontSize: 20, fontFamily: "roboto_bold", color: "#7851A9" }}>
        {user?.fullName || "User Name"} 
      </Text>
      <Text style={{ fontSize: 16, fontFamily: "roboto_regular", color: "#7851A9" }}>
        {user?.emailAddresses[0]?.emailAddress || "Email Address"}
      </Text>
    </View>
  )
}