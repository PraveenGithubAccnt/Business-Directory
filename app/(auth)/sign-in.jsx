import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import {Text, TextInput,TouchableOpacity,View,StatusBar, Alert} from 'react-native';
import { useState } from 'react';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        'Sign In Failed',
        'Incorrect email or password. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E6E6FA',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <StatusBar backgroundColor="#E6E6FA" barStyle="dark-content" />

      <Text
        style={{
          fontSize: 28,
          fontFamily: 'roboto_bold',
          color: '#7851A9',
          marginBottom: 10,
        }}
      >
        Sign In
      </Text>

      {/* Email Input */}
      <TextInput
        style={[inputStyle, { height: 70 }]}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="gray"
        onChangeText={(text) => setEmailAddress(text)}
      />

      {/* Password Input */}
      <View style={{ width: '100%', position: 'relative' }}>
        <TextInput
          style={[inputStyle, { height: 70 }]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 15,
            top: 18,
          }}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Text style={{ color: '#7851A9', fontWeight: 'bold', fontSize: 20 }}>
            {showPassword ? '🙈' : '🙉'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#7851A9',
          paddingVertical: 12,
          paddingHorizontal: 50,
          borderRadius: 60,
          elevation: 5,
          marginTop: 15,
        }}
        onPress={onSignInPress}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'roboto_medium',
            color: '#ffffff',
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>

      {/* Sign-up Link */}
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text
          style={{ fontSize: 15, fontFamily: 'roboto_medium', color: 'gray' }}
        >
          Don't have an account?{' '}
        </Text>
        <Link href="/(auth)/sign-up">
          <Text
            style={{ fontSize: 15, fontFamily: 'roboto_bold', color: '#DA70D6' }}
          >
            Register Now
          </Text>
        </Link>
      </View>
    </View>
  );
}

const inputStyle = {
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
};
