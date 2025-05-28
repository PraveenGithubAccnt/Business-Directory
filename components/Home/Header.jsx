import { View, Text, Image, StatusBar } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar backgroundColor="#7851A9" barStyle="light-content" />

      <View
        style={{
          backgroundColor: "#7851A9",
          paddingTop: insets.top + 10,
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

        {/* Tagline */}
        <Text
          style={{
            marginTop: 15,
            fontSize: 14,
            fontFamily: "roboto_medium",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Supporting Local, Building Together.
        </Text>
      </View>
    </>
  );
}
