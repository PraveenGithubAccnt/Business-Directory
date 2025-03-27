import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    console.log(emailAddress, password)

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
  
    try {
      // Check if the verification is already completed
      if (signUp.verifications.emailAddress.status === "verified") {
        console.log("Email is already verified.");
        await setActive({ session: signUp.createdSessionId });
        router.replace('/');
        return;
      }
  
      // Attempt email verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
  
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  

  if (pendingVerification) {
    return (
        <View style={{ flex: 1, backgroundColor: '#E6E6FA', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <StatusBar backgroundColor="#E6E6FA" barStyle="dark-content" />
    
          {/* Title */}
          <Text style={{ fontSize: 28, fontFamily: 'roboto_bold', color: '#7851A9', marginBottom: 10 }}>
            Verify Your Email
          </Text>
    
          {/* Verification Code Input */}
          <TextInput
            style={{
              width: '100%',
              backgroundColor: '#fff',
              paddingVertical: 12,
              paddingHorizontal: 15,
              borderRadius: 30,
              fontSize: 16,
              fontFamily: 'roboto_medium',
              color: '#333',
              marginBottom: 20,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
              textAlign: 'center',
            }}
            value={code}
            placeholder="Enter verification code"
            placeholderTextColor="gray"
            keyboardType="numeric"
            onChangeText={(text) => setCode(text)}
          />
    
          {/* Verify Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#7851A9',
              paddingVertical: 12,
              paddingHorizontal: 50,
              borderRadius: 60,
              elevation: 5,
              marginBottom: 15,
            }}
            onPress={onVerifyPress}
          >
            <Text style={{ fontSize: 16, fontFamily: 'roboto_medium', color: '#ffffff' }}>Verify</Text>
          </TouchableOpacity>
        </View>
      );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#E6E6FA', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <StatusBar backgroundColor="#E6E6FA" barStyle="dark-content" />

    {/* Sign-up Header */}
    <Text style={{ fontSize: 28, fontFamily: 'roboto_bold', color: '#7851A9', marginBottom: 10 }}>
      Register
    </Text>

    {/* Email Input */}
    <TextInput
      style={{
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 30,
        fontSize: 16,
        fontFamily: 'roboto_medium',
        color: '#333',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
      autoCapitalize="none"
      value={emailAddress}
      placeholder="Enter email"
      placeholderTextColor="gray"
      onChangeText={(text) => setEmailAddress(text)}
    />

    {/* Password Input */}
    <TextInput
      style={{
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 30,
        fontSize: 16,
        fontFamily: 'roboto_medium',
        color: '#333',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
      value={password}
      placeholder="Enter password"
      placeholderTextColor="gray"
      secureTextEntry={true}
      onChangeText={(text) => setPassword(text)}
    />

    {/* Continue Button */}
    <TouchableOpacity
      style={{
        backgroundColor: '#7851A9',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 60,
        elevation: 5,
        marginBottom: 15,
      }}
      onPress={onSignUpPress}
    >
      <Text style={{ fontSize: 16, fontFamily: 'roboto_medium', color: '#ffffff' }}>Continue</Text>
    </TouchableOpacity>

    {/* Sign-in Link */}
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <Text style={{ fontSize: 15, fontFamily: 'roboto_medium', color: 'gray' }}>Already have an account? </Text>
      <Link href="/(auth)/sign-in">
        <Text style={{ fontSize: 15, fontFamily: 'roboto_bold', color: '#DA70D6' }}>Sign in</Text>
      </Link>
    </View>
  </View>
  );
};