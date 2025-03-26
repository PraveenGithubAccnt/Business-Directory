import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native'
import React from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#E6E6FA', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <StatusBar backgroundColor="#E6E6FA" barStyle="dark-content" />

    {/* Sign-in Header */}
    <Text style={{ fontSize: 28, fontFamily: 'roboto_bold', color: '#7851A9', marginBottom: 10 }}>
      Sign In
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
      onPress={onSignInPress}
    >
      <Text style={{ fontSize: 16, fontFamily: 'roboto_medium', color: '#ffffff' }}>Continue</Text>
    </TouchableOpacity>

    {/* Sign-up Link */}
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <Text style={{ fontSize: 15, fontFamily: 'roboto_medium', color: 'gray' }}>Don't have an account? </Text>
      <Link href="/(auth)/sign-up">
        <Text style={{ fontSize: 15, fontFamily: 'roboto_bold', color: '#DA70D6' }}>Register Now</Text>
      </Link>
    </View>
  </View>

  );
};