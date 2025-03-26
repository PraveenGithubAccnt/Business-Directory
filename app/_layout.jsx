import { Stack } from "expo-router"; 
import { Text } from "react-native"; 
import { useFonts } from "expo-font";
import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

const PUBLISHABLE_KEY = Constants.expoConfig?.extra?.clerkPublishableKey;

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    roboto_bold: require("../assets/fonts/Roboto-Bold.ttf"),
    roboto_medium: require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
