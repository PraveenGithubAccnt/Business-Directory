import { View, Text, Image, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#E6E6FA" }}>
      <StatusBar backgroundColor="#E6E6FA" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
          {/* Header Text */}
          <View>
            <Text style={{ fontSize: 20, fontFamily: "roboto_bold", textAlign: "center", color: "#7851A9" }}>
              Connect Discover and Grow
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "roboto_bold", textAlign: "center", color: "#DA70D6" }}>
              Your Local Businesses
            </Text>
          </View>

          {/* Image */}
          <View>
            <Image source={require("../assets/images/map1.png")} style={{ width: 380, height: 350, resizeMode: "contain" }} />
          </View>

          {/* Description Text */}
          <View style={{ marginTop: 10, paddingHorizontal: 10, paddingBottom: 20 }}>
            <Text style={{ fontSize: 15, fontFamily: "roboto_medium", textAlign: "center", color: "gray" }}>
              Find Your Favorite Business Near You {"\n"}
              And Post Your Businesses To Your Community
            </Text>
          </View>

          {/* Updated Button with Navigation */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#7851A9",
                paddingVertical: 12,
                paddingHorizontal: 50,
                borderRadius: 60,
                elevation: 5,
              }}
              onPress={() => router.push("/(auth)/sign-in")
              }  
            >
              <Text style={{ fontSize: 15, fontFamily: "roboto_medium", color: "#ffffff" }}>Let's Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
