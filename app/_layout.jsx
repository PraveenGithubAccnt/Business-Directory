import { Stack } from "expo-router";
import { Text } from "react-native"; 
import { useFonts } from "expo-font";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from './../components/LoginScreen';
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
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>  
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" /> 
        </Stack>
      </SignedIn>
      
      <SignedOut>
       <LoginScreen/>
      </SignedOut>
    </ClerkProvider>
  );
}
