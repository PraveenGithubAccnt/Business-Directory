import { View, Text, Image, StatusBar, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Header() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar backgroundColor="#7851A9" barStyle="light-content" />

      <View
        style={{
          backgroundColor: "#7851A9",
          paddingTop: insets.top + 10, // Ensures content is below the notch
          paddingHorizontal: 15,
          paddingBottom: 15,
        }}
      >
        {/* User info */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 45, height: 45, borderRadius: 99 }}
          />
          <View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "roboto_medium",
                color: "#fff",
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto_medium",
                color: "#fff",
              }}
            >
              {user?.username || "Guest"}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 3,
            marginVertical: 5,
            borderRadius: 15,
            marginTop: 15,
          }}
        >
          {/* search bar */}
          <MaterialCommunityIcons
            name="map-search-outline"
            size={26}
            color="#7851A9"
          />

          <TextInput
            style={{
              fontSize: 14,
              fontFamily: "roboto_medium",
              color: "#7851A9",
              flex: 1,
              marginLeft: 10,
            }}
            placeholder="Search..."
            placeholderTextColor="#7851A9"
          />
        </View>
      </View>
    </>
  );
}
