import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking'; 

export default function ActionButton({ business }) 
{
  const actionButtonMenu = [
    { id: 1, name: 'Call', icon: 'call', url: 'tel:' + business?.contact },
    { id: 2, name: 'Share', icon: 'share', url: 'https://example.com/share' },
    { id: 3, name: 'Directions', icon: 'directions', url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address },
    { id: 4, name: 'Website', icon: 'public', url: business?.website },
  ];

  const handlePress = (url) => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  return (
    <View style={{ padding: 16, backgroundColor: '#E6E6FA', borderRadius: 10, marginTop: 5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {actionButtonMenu.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item.url)} style={{ alignItems: 'center', marginHorizontal: 10, marginVertical: 8 }}>
            <MaterialIcons name={item.icon} size={28} color="#7851A9" />
            <Text style={{ marginTop: 4 }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
