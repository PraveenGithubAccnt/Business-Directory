import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState(""); 
  const [lastName, setLastName] = React.useState("");   
  const [code, setCode] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      Alert.alert(
        "Invalid Username",
        "Username can only contain letters, numbers, underscores (_) and dashes (-)."
      );
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
        firstName,  
        lastName,   
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Sign Up Error",
        err.errors?.[0]?.longMessage || "An error occurred."
      );
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      if (signUp.verifications.emailAddress.status === "verified") {
        await setActive({ session: signUp.createdSessionId });
        router.replace("/");
        return;
      }

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert("Verification Failed", "Code may be incorrect or expired.");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Verification Error",
        err.errors?.[0]?.longMessage || "An error occurred."
      );
    }
  };

  if (pendingVerification) {
    return (
      <View style={containerStyle}>
        <StatusBar backgroundColor="#E6E6FA" barStyle="dark-content" />
        <Text style={titleStyle}>Verify Your Email</Text>
        <View style={inputContainer}>
          <TextInput
            style={inputStyle}
            value={code}
            placeholder="Enter verification code"
            placeholderTextColor="gray"
            keyboardType="numeric"
            onChangeText={setCode}
          />
        </View>
        <TouchableOpacity style={buttonStyle} onPress={onVerifyPress}>
          <Text style={buttonTextStyle}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <StatusBar backgroundColor="#E6E6FA" barStyle="dark-content" />
      <Text style={titleStyle}>Register</Text>

      <View style={inputContainer}>
        <TextInput
          style={[inputStyle, { height: 70 }]}
          value={firstName}
          placeholder="First Name"
          placeholderTextColor="gray"
          onChangeText={setFirstName}
        />
        <TextInput
          style={[inputStyle, { height: 70 }]}
          value={lastName}
          placeholder="Last Name"
          placeholderTextColor="gray"
          onChangeText={setLastName}
        />
        <TextInput
          style={[inputStyle, { height: 70 }]}
          value={username}
          placeholder="Enter Username"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={setUsername}
        />
        <TextInput
          style={[inputStyle, { height: 70 }]}
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={setEmailAddress}
        />
        <View
          style={[
            inputStyle,
            { flexDirection: "row", alignItems: "center", paddingRight: 20 },
          ]}
        >
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              fontFamily: "roboto_medium",
              color: "#333",
            }}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="gray"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text
              style={{
                color: "#7851A9",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {showPassword ? "🙈" : "🙉"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={buttonStyle} onPress={onSignUpPress}>
        <Text style={buttonTextStyle}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{ fontSize: 15, fontFamily: "roboto_medium", color: "gray" }}
        >
          Already have an account?{" "}
        </Text>
        <Link href="/(auth)/sign-in">
          <Text
            style={{
              fontSize: 15,
              fontFamily: "roboto_bold",
              color: "#DA70D6",
            }}
          >
            Sign in
          </Text>
        </Link>
      </View>
    </View>
  );
}

// Styles remain unchanged
const containerStyle = {
  flex: 1,
  backgroundColor: "#E6E6FA",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const titleStyle = {
  fontSize: 28,
  fontFamily: "roboto_bold",
  color: "#7851A9",
  marginBottom: 10,
};

const inputContainer = {
  width: "100%",
};

const inputStyle = {
  backgroundColor: "#fff",
  paddingVertical: 12,
  paddingHorizontal: 15,
  borderRadius: 30,
  fontSize: 16,
  fontFamily: "roboto_medium",
  color: "#333",
  marginBottom: 15,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
};

const buttonStyle = {
  backgroundColor: "#7851A9",
  paddingVertical: 12,
  paddingHorizontal: 50,
  borderRadius: 60,
  elevation: 5,
  marginBottom: 15,
};

const buttonTextStyle = {
  fontSize: 16,
  fontFamily: "roboto_medium",
  color: "#ffffff",
};
