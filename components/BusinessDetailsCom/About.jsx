import { View, Text } from 'react-native';
import React from 'react';

export default function About({ business }) {
  return (
    <View style={{ padding: 10, backgroundColor: '#E6E6FA' }}>
      <Text style={{ fontFamily: 'roboto_bold', fontSize: 20, color: "#7851A9" }}>About</Text>
      <Text style={{ fontFamily: 'roboto_regular', fontSize: 16, marginTop:5, lineHeight: 22 }}>
        {business?.about ? business.about : 'No information available.'}
      </Text>
    </View>
  );
}
