import { View, Text } from 'react-native';
import React from 'react';
import UserIntro from '../../components/Profile/UserIntro';
import MenuList from '../../components/Profile/MenuList';

export default function Profile() {
  return (
    <View style={{ flex: 1, backgroundColor: "#E6E6FA", padding: 20 }}>
      {/* User Intro */}
      <UserIntro />

      {/* Menu Buttons */}
      <MenuList />

      {/* Footer */}
      <View style={{ alignItems: 'center', marginTop: 'auto' }}>
        <Text style={{ fontSize: 12, color: '#666' }}>
          © 2025 Praveen Kushwaha. All rights reserved.
        </Text>
      </View>
    </View>
  );
}
